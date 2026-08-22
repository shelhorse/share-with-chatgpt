"use strict";

const messages = {
  "no-active-tab": "Firefox did not provide an active webpage tab.",
  "no-rendered-text": "This page has no rendered text to supply to ChatGPT.",
  "unsupported-page": "Firefox extensions cannot read rendered content from this kind of tab. Built-in pages, Reader View, and Firefox's PDF viewer are common examples."
};

const reason = new URL(location.href).searchParams.get("reason");
document.getElementById("message").textContent = messages[reason] || messages["unsupported-page"];

document.getElementById("close").addEventListener("click", async () => {
  const tab = await browser.tabs.getCurrent();
  if (tab) {
    await browser.tabs.remove(tab.id);
  }
});
