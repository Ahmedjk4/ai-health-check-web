# Verification record

Validated on 17 November 2026 using Node.js 24.13.1 and the local Chromium-based preview browser.

- **33 automated tests passed.** Original extension regression checks plus web server, chat integration and PWA asset tests. AI responses were mocked, with no provider credentials or real provider calls used.
- JavaScript syntax checks passed for the server, browser app and service worker.
- Responsive layouts inspected at 320, 390, 768, 1024 and 1440 CSS pixels. Measured page widths stayed within each viewport. Phone layouts expose bottom navigation; desktop layouts expose the sidebar.
- Mobile browser: ran a harmful-claim example; checked displayed warning, explanation, references and next steps. Checked the corrected-myth example separately.
- Browser navigation: assistant, source search (including Egypt), verification guide, and installation help all exercised.
- Browser chat: entered a test access code, sent a message, received a structured review and reference links, then sent a follow-up using a local stub of the provider. This validates the app's full request/rendering path; it does not prove current Hack Club credentials or model availability.
- Offline: stopped the local Node server, reloaded the already-loaded website, and successfully analyzed the corrected-myth example from the cached app shell.
- Normal online browser checks showed no application console errors or warnings.

Desktop and mobile images are saved alongside this record as `desktop.jpg` and `mobile.jpg`. Full-page images capture fixed navigation at its viewport position.

Not verified here: a real Hack Club AI request, deployment under a public domain, HTTPS certificate setup, or installation on a physical Android/iOS device. Those need the owner's API configuration, hosting and device access. Browser-supported PWA metadata, raster icons, offline assets and install help are provided; install availability is determined by the final origin and browser.
