"use strict";

const CHATGPT_URL = "https://chatgpt.com/";
const HANDOFF_PREFIX = "chatgpt-handoff:";
const HANDOFF_MAX_AGE_MS = 2 * 60 * 60 * 1000;

function handoffKey(tabId) {
  return `${HANDOFF_PREFIX}${tabId}`;
}

async function removeExpiredHandoffs() {
  const stored = await browser.storage.local.get(null);
  const now = Date.now();
  const staleKeys = Object.entries(stored)
    .filter(([key, value]) => (
      key.startsWith(HANDOFF_PREFIX)
      && (!value || typeof value.createdAt !== "number" || now - value.createdAt > HANDOFF_MAX_AGE_MS)
    ))
    .map(([key]) => key);

  if (staleKeys.length) {
    await browser.storage.local.remove(staleKeys);
  }
}

async function openStatus(reason) {
  const url = new URL(browser.runtime.getURL("status.html"));
  url.searchParams.set("reason", reason);
  await browser.tabs.create({ url: url.href, active: true });
}

async function createHandoff(page) {
  const targetTab = await browser.tabs.create({ url: "about:blank", active: true });
  const record = {
    createdAt: Date.now(),
    page
  };

  await browser.storage.local.set({ [handoffKey(targetTab.id)]: record });
  await browser.tabs.update(targetTab.id, { url: CHATGPT_URL });
}

browser.browserAction.onClicked.addListener(async (tab) => {
  try {
    await removeExpiredHandoffs();

    if (!tab || typeof tab.id !== "number") {
      await openStatus("no-active-tab");
      return;
    }

    const results = await browser.tabs.executeScript(tab.id, {
      file: "extract-page.js",
      runAt: "document_idle"
    });
    const page = results && results[0];

    if (!page || !page.url || !page.renderedText) {
      await openStatus("no-rendered-text");
      return;
    }

    await createHandoff(page);
  } catch (error) {
    console.error("ChatGPT handoff failed", error);
    await openStatus("unsupported-page");
  }
});

browser.runtime.onMessage.addListener(async (message, sender) => {
  if (!message || !sender.tab || typeof sender.tab.id !== "number") {
    return undefined;
  }

  const senderUrl = sender.url || sender.tab.url || "";
  if (!senderUrl.startsWith(CHATGPT_URL)) {
    return undefined;
  }

  const key = handoffKey(sender.tab.id);

  if (message.type === "get-chatgpt-handoff") {
    const result = await browser.storage.local.get(key);
    return result[key] || null;
  }

  if (message.type === "complete-chatgpt-handoff") {
    await browser.storage.local.remove(key);
    return { ok: true };
  }

  return undefined;
});

browser.tabs.onRemoved.addListener((tabId) => {
  browser.storage.local.remove(handoffKey(tabId)).catch(console.error);
});

removeExpiredHandoffs().catch(console.error);
