# Health Check Web

A responsive, installable website for screening health misinformation and reviewing AI-written health claims. Runs on phones, tablets, and computers. No build step or npm dependencies.

## Start on your computer

Install Node.js 22 or newer, then open a terminal in this folder:

```powershell
npm start
```

Open http://localhost:3000. The claim checker, source directory, and verification guide work immediately. The claim checker runs entirely on your device and continues working offline after the app has loaded online once and its service worker has finished installing. AI chat requires configuration and internet access.

## Connect Hack Club AI

1. Copy `.env.example` to `.env`.
2. Set `HACKCLUB_API_KEY` to your own Hack Club API key.
3. Set `HACKCLUB_MODEL` to a currently available chat model ID. The example is `openai/gpt-4.1-mini`; confirm availability in your account.
4. Set `CHAT_ACCESS_TOKEN` to a random private app access code of at least 16 characters. For example, generate one with `node -e "console.log(require('node:crypto').randomBytes(24).toString('hex'))"`.
5. Restart `npm start`. Open **AI connection** in the website and enter that app access code. This field is **not** for the Hack Club API key.

The API key is read only by the server. It is never served to the browser. The app access code stays in browser memory for the current tab and is required to use the chat endpoint. Claims are sent to Hack Club AI only when the user presses Send in the assistant. No accounts, analytics, or conversation database are included. Messages and reviews may still be processed/retained by the AI provider according to its policies.

The integration follows [Hack Club chat completions](https://docs.ai.hackclub.com/api/chat-completions.html). Check the [current available models](https://docs.ai.hackclub.com/models-list.html) and [service rules](https://docs.ai.hackclub.com/guide/rules.html) before enabling access for other people. The service has eligibility and usage restrictions; a shared app code is a technical access control, not proof of user eligibility. Use only an audience and deployment permitted by the provider. Never commit `.env`.

## Use and install on your phone

For ordinary browsing on the same Wi-Fi network, set `HOST=0.0.0.0` in `.env`, restart the server, and visit `http://YOUR-PC-LAN-IP:3000`. Your firewall may need to permit Node on your private network. Local network HTTP supports browsing, but does **not** enable offline service workers or app installation on a phone.

For phone installation, deploy the Node server behind **HTTPS**. A reverse-proxy example is in `deploy/Caddyfile`. The website and `/api/*` must use the same origin; no separate frontend host is necessary. Start the app with `npm start` using your hosting platform's normal process manager. The server listens on `HOST` and `PORT` (defaults: `127.0.0.1`, `3000`). Cloud platforms commonly require `HOST=0.0.0.0`; keep it bound to localhost when Caddy runs on the same machine.

An optional Docker image is provided:

```sh
docker build -f deploy/Dockerfile -t healthcheck .
docker run --env-file .env -e HOST=0.0.0.0 -p 3000:3000 healthcheck
```

Supply secrets through deployment environment settings; do not copy `.env` into an image. Terminate HTTPS at your host or reverse proxy, keep access logs free of request bodies and authorization headers, and limit traffic at the proxy for public deployment. The built-in chat limiter is per process and connection address; requests behind a proxy share that address. Multiple server instances need a shared limiter at the edge if exposed publicly.

Install from the website's **Install app** button when the browser offers installation. Otherwise:

- **iPhone/iPad:** Safari → Share → Add to Home Screen. Enable Open as Web App if offered.
- **Android:** Chrome menu → Install app / Add to Home screen.
- **PC/Mac:** Chrome or Edge → install icon in the address bar, or the browser's app installation menu.

Browser support and labels vary. A manifest, real 192px/512px icons, a maskable icon, an Apple touch icon, standalone display, and an offline service worker are included. The final HTTPS deployment still needs verification on your actual phone. See [MDN's installability guide](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable).

## What moved from the original projects

- `public/lib/analyzer.js` and `data.js` reuse the extension's pattern engine and curated myths. Original analyzer tests are retained. A missing WHO GHO reference in the original source registry is resolved in `resources.js`.
- The source directory and verification guide adapt the original MCP project's curated reference registry and verification approach. The chatbot uses the extension's analyzer on the server to screen both user claims and generated explanations.
- The Chrome extension's page-injection and right-click actions stay in the extension: a normal website cannot read arbitrary browser tabs. Paste text into the website instead.
- The Python MCP server remains available separately. Its MCP transport, live WHO indicator tools, and full response-review tool are not replaced by the website. The web chat uses its own structured review endpoint; it does not require an MCP client or Python.

Source paths and changes are recorded in `PROVENANCE.md`. Both original project folders are preserved.

## Limits

The local checker recognizes English patterns, with false positives and false negatives. Its curated knowledge base is inherited from the original project and has not received a fresh clinical review. A match is a reason to check context, not proof that a particular user is spreading misinformation. No match never means true. Non-English claims are outside the local pattern engine's supported scope.

The AI assistant has **no live web search**. It returns structured assessments, verification steps, and suggested references selected from a fixed registry. Those references are not citations it has fetched or verified. Server-side screening can withhold an apparently unsafe answer, but is heuristic and can reject valid explanations or miss harmful ones. This app does not diagnose, prescribe, or provide a clinical safety guarantee.

Use qualified health professionals and current primary sources for consequential decisions. Never stop treatment because of an AI answer or an online claim.

## Validate

```powershell
npm test
```

Tests cover original pattern behavior, complete source references, server assets, PWA icons and shell, secret isolation, chat authentication, bounded message input, cross-origin rejection, provider errors, output screening, allowlisted references, and rate limiting. Provider calls are mocked: a live Hack Club request requires your credentials and an available model.

When changing cached frontend files, bump the cache version in `public/sw.js` (currently `healthcheck-shell-v4`) and the stylesheet/script references in `public/index.html` when entry files are renamed. Existing tabs keep their current worker until they close; reopen the app to activate the new version. API requests and chat content are excluded from the service-worker cache.

The November 2026 interface refinement is documented in `DESIGN.md`, `PRODUCT.md`, and `docs/DESIGN-REVIEW.md`. The current workbench layout is documented in `docs/WORKBENCH-REVIEW.md`. Current previews are `docs/desktop-workbench.jpg` and `docs/mobile-workbench.jpg`.

