# Changelog

All notable changes to **Share with ChatGPT** will be recorded here.

## [Unreleased]

## [0.1.0] - 2026-08-22

### Added

- Initial Firefox extension for desktop and Android.
- Capture of the current page's rendered text, title, URL, canonical URL, and language.
- A tab-scoped handoff that opens ChatGPT and places the captured page context into the message composer without submitting it.
- Long-page handling that preserves the beginning and end of the page within a 200,000-character capture limit and reports when content was shortened.
- Clear status messages when Firefox cannot read the active page or complete the handoff.
- Project requirements, usage guidance, Android setup instructions, and repository maintenance files.

### Changed

- Standardized the extension name, identifier, browser-action label, storage keys, and internal messages as **Share with ChatGPT**.
- Centralized page-length limiting in the capture step to avoid duplicate truncation.
- Removed the unnecessary Firefox 142 minimum-version restriction.

[Unreleased]: https://github.com/shelhorse/share-with-chatgpt/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/shelhorse/share-with-chatgpt/releases/tag/v0.1.0
