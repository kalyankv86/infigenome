# Deploying Infigenome

Production runs on a **shared** Ubuntu host at `/opt/infigenome` alongside other
sites. TLS is terminated at **Cloudflare**; the origin serves plain HTTP on `:80`.

```
Cloudflare ──HTTP──> nginx :80 (vhost infigenome.com)
                       ├── /            -> 127.0.0.1:3100   infigenome-web  (Next.js standalone, systemd, www-data)
                       └── /api/ , /health -> 127.0.0.1:4100 infigenome-api (Fastify + mysql2, systemd, www-data)
MySQL 8: database `infigenome`, table `leads`
```

Node 20 is already installed. Do **not** touch other nginx vhosts or the
`default` site, and do not rename `/opt/infigenome`.

## First-time: add the API service (web service already exists)

```bash
sudo cp /opt/infigenome/ops/systemd/infigenome-api.service /etc/systemd/system/
sudo cp /opt/infigenome/ops/systemd/infigenome-web.service /etc/systemd/system/   # refresh
sudo systemctl daemon-reload
sudo systemctl enable infigenome-api
```

`/opt/infigenome/apps/api/.env` already exists on the server with the MySQL
credentials — keep it. `deploy.sh` preserves it.

## Deploy / redeploy

```bash
sudo bash /opt/infigenome/ops/deploy.sh
```

It refreshes the code from `origin/main` (preserving `apps/api/.env`), runs
`npm ci`, applies `db/schema.sql` (idempotent), builds web + api, copies
`static/` + `public/` into the standalone bundle, fixes ownership to
`www-data`, restarts both services, and health-checks them.

## nginx

The `infigenome.com` vhost already exists. If it changed:

```bash
sudo cp /opt/infigenome/ops/nginx/infigenome.com.conf /etc/nginx/sites-available/infigenome.com
sudo nginx -t && sudo systemctl reload nginx
```

## Verify

```bash
curl -s http://127.0.0.1:4100/health
curl -s -H 'Host: infigenome.com' http://127.0.0.1/ | grep -o '<title>[^<]*</title>'
curl -s -X POST -H 'Host: infigenome.com' -H 'content-type: application/json' \
  http://127.0.0.1/api/leads -d '{"name":"Deploy Check","email":"c@d.com","message":"post-deploy test"}'
sudo mysql infigenome -e 'SELECT id,name,email,created_at FROM leads ORDER BY id DESC LIMIT 3;'
curl -sI https://infigenome.com | head -1
```

## Operations

```bash
systemctl status infigenome-web infigenome-api
journalctl -u infigenome-api -f
journalctl -u infigenome-web -f
```

Still outstanding: real contact details (see README note), 301 redirects from
legacy URLs, `sitemap.xml` / `robots.txt` / structured data, analytics, and
wiring leads to email/CRM.
