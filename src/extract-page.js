(() => {
  "use strict";

  const MAX_RENDERED_CHARS = 200000;
  const TAIL_CHARS = 20000;
  const body = document.body || document.documentElement;
  const rawText = body ? (body.innerText || "") : "";
  const normalizedText = rawText
    .replace(/\r\n?/g, "\n")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{4,}/g, "\n\n\n")
    .trim();

  let renderedText = normalizedText;
  let truncated = false;

  if (renderedText.length > MAX_RENDERED_CHARS) {
    const truncationNotice = `\n\n[Rendered page shortened from ${renderedText.length.toLocaleString("en-US")} characters to fit the capture limit]\n\n`;
    const headChars = MAX_RENDERED_CHARS - TAIL_CHARS - truncationNotice.length;
    renderedText = [
      renderedText.slice(0, headChars),
      truncationNotice,
      renderedText.slice(-TAIL_CHARS)
    ].join("");
    truncated = true;
  }

  const canonicalElement = document.querySelector('link[rel="canonical"][href]');

  return {
    schemaVersion: 1,
    title: (document.title || "Untitled page").trim(),
    url: location.href,
    canonicalUrl: canonicalElement ? canonicalElement.href : "",
    language: document.documentElement.lang || "",
    capturedAt: new Date().toISOString(),
    renderedText,
    originalCharacterCount: normalizedText.length,
    truncated
  };
})();
