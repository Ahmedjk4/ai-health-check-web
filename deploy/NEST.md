# Nest deployment

The website runs separately from the existing MCP service, using PM2 process `health-check-web` on port 3000. Use Node.js 22 or newer. A Node binary installed just for this app can be selected with `HEALTHCHECK_NODE` when starting the ecosystem file.

In the deployment directory, create a private `.env` using `.env.example`. Set `HOST=0.0.0.0` so Nest's reverse proxy can reach the app. Supply `HACKCLUB_API_KEY` and `HACKCLUB_MODEL` and keep file permissions at 600.

```sh
HEALTHCHECK_NODE=/path/to/node pm2 start deploy/ecosystem.config.cjs
pm2 save
curl http://127.0.0.1:3000/health
```

Add a domain in the [Nest dashboard](https://dashboard.hackclub.app) with target port 3000. A dedicated hostname such as `healthcheck.ahmedjk4.hackclub.app` avoids replacing the MCP service's existing route. Nest provides the public HTTPS proxy; the app does not need a second Caddy instance inside the container. See the [Nest domain guide](https://guides.hackclub.app/index.php/Dashboard).

Confirm the public site, `/health`, claim checking, and an AI review after deployment. The server authenticates to Hack Club AI using its private key. The chat form displays the provider’s eligibility rules.

To update, deploy a new source archive or pull a reviewed commit, retain the private `.env`, then run `pm2 restart health-check-web`. To stop only this website, use `pm2 stop health-check-web`; the MCP process is separate.
