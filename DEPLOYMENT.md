# Deploying Infigenome to a VPS (production, infigenome.com)

Target: single Ubuntu/Debian server. Nginx terminates TLS and reverse-proxies to
two Node services — web (Next.js) on `:3000` and API (Fastify) on `:4000` — with
PostgreSQL local on `:5432`. The API is mounted under `/api` and `/health`.

> The old WordPress site lives on a different domain (`cenomics.in`) and is not
> touched by this. Make sure `infigenome.com` (and `www`) A/AAAA records already
> point at this server before requesting certificates.

---

## 1. One-time server setup

Run as **root**.

### 1.1 System packages

```bash
apt update
apt install -y curl git nginx postgresql ca-certificates gnupg

# Node.js 22 LTS
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs

node -v   # expect v22.x
```

### 1.2 Deploy user

```bash
adduser --system --group --shell /bin/bash --home /opt/infigenome infigenome
```

### 1.3 Replace the existing /opt/infigenome folder

There is already a `/opt/infigenome/` on this box. Archive it, then clone fresh.

```bash
systemctl stop infigenome-web infigenome-api 2>/dev/null || true
mv /opt/infigenome /opt/infigenome.bak.$(date +%Y%m%d%H%M%S)

git clone https://github.com/kalyankv86/infigenome.git /opt/infigenome
chown -R infigenome:infigenome /opt/infigenome
```

(Delete the `.bak` directory once the new deploy is verified.)

### 1.4 PostgreSQL database

```bash
sudo -u postgres psql <<'SQL'
CREATE ROLE infigenome LOGIN PASSWORD 'REPLACE_WITH_STRONG_PASSWORD';
CREATE DATABASE infigenome OWNER infigenome;
SQL
```

### 1.5 API environment file

```bash
sudo -u infigenome tee /opt/infigenome/apps/api/.env >/dev/null <<'ENV'
NODE_ENV=production
PORT=4000
DATABASE_URL=postgresql://infigenome:REPLACE_WITH_STRONG_PASSWORD@127.0.0.1:5432/infigenome
CORS_ORIGINS=https://infigenome.com
ENV
chmod 600 /opt/infigenome/apps/api/.env
```

### 1.6 systemd services

```bash
cp /opt/infigenome/ops/systemd/infigenome-api.service /etc/systemd/system/
cp /opt/infigenome/ops/systemd/infigenome-web.service /etc/systemd/system/
systemctl daemon-reload
systemctl enable infigenome-api infigenome-web
```

Allow the deploy user to restart them without a password:

```bash
tee /etc/sudoers.d/infigenome >/dev/null <<'EOF'
infigenome ALL=(root) NOPASSWD: /bin/systemctl restart infigenome-web, /bin/systemctl restart infigenome-api
EOF
```

### 1.7 First build + start

```bash
cd /opt/infigenome
sudo -u infigenome NEXT_PUBLIC_API_URL=https://infigenome.com \
     NEXT_PUBLIC_SITE_URL=https://infigenome.com ./ops/deploy.sh
```

`deploy.sh` installs deps, applies `db/schema.sql`, builds both apps, restarts
the services and health-checks them.

### 1.8 Nginx + TLS

```bash
cp /opt/infigenome/ops/nginx/infigenome.com.conf /etc/nginx/sites-available/infigenome.com
ln -sf /etc/nginx/sites-available/infigenome.com /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

apt install -y certbot python3-certbot-nginx
certbot --nginx -d infigenome.com -d www.infigenome.com --redirect -m infigenome@gmail.com --agree-tos -n
```

Certbot adds the `:443` block and the HTTP→HTTPS redirect, and installs a renewal timer.

### 1.9 Verify

```bash
curl -I https://infigenome.com
curl -s https://infigenome.com/health
curl -s -X POST https://infigenome.com/api/leads \
  -H 'content-type: application/json' \
  -d '{"name":"Test User","email":"test@example.com","message":"hello from prod"}'

sudo -u postgres psql infigenome -c 'SELECT created_at,name,email FROM leads ORDER BY created_at DESC LIMIT 5;'
```

---

## 2. Subsequent deploys

```bash
sudo -u infigenome /opt/infigenome/ops/deploy.sh
```

Pulls `origin/main`, `npm ci`, applies schema, rebuilds, restarts, health-checks.

---

## 3. Operations

```bash
systemctl status infigenome-web infigenome-api
journalctl -u infigenome-api -f
journalctl -u infigenome-web -f
```

- Firewall: expose only 22, 80, 443. Postgres and the Node ports stay on
  `127.0.0.1`.
- Backups: `pg_dump infigenome` on a schedule.
- Still outstanding before this is a full production site: real contact details
  (see README note), 301 redirects from legacy URLs, `sitemap.xml` / `robots.txt`
  / structured data, analytics, and wiring leads to email/CRM.
