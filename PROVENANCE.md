# Source provenance

Created from these existing local projects. Their folders were read, not modified:

- `D:\nodeprojects\ai-health-check-extension\ai-health-check-ext`
- `D:\nodeprojects\ai-health-check-mcp`

`public/lib/analyzer.js`, `public/lib/data.js`, and `tests/analyzer.test.js` were copied from the extension's `src/` and `tests/`. The analyzer's source lookup now uses the merged registry in `resources.js` and filters missing entries; its import in the tests was updated to the web location. The original pattern scoring, regexes, curated claims, and advice are otherwise retained.

`resources.js` adapts selected named source records and the verification concepts from `ai_health_check/knowledge.py`. The missing `who_gho` entry referenced by a curated extension myth is supplied from that MCP registry. The regional WHO link uses HTTPS.

The website interface, Node HTTP server, structured Hack Club chatbot integration, web-specific AI output screen, install manifest, offline worker, icons, deployment samples, and server tests are new. The website does not claim to port every MCP tool or to independently verify the inherited medical content.

No files from the unrelated Claude/QKD archive were used as application source. Its context instructions were read only to identify the active workspace's boundaries.
