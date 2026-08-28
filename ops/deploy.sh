#!/usr/bin/env bash
# Redeploy Infigenome from the current git checkout.
# Run as the deploy user from the repo root:  ./ops/deploy.sh
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/infigenome}"
cd "$APP_DIR"

echo "==> Pulling latest main"
git fetch origin
git reset --hard origin/main

echo "==> Installing dependencies"
npm ci

echo "==> Applying database schema"
# DATABASE_URL is read from apps/api/.env
set -a; . apps/api/.env; set +a
psql "$DATABASE_URL" -f db/schema.sql

echo "==> Building"
export NEXT_PUBLIC_SITE_URL="${NEXT_PUBLIC_SITE_URL:-https://infigenome.com}"
export NEXT_PUBLIC_API_URL="${NEXT_PUBLIC_API_URL:-https://infigenome.com}"
npm run build

echo "==> Restarting services"
sudo systemctl restart infigenome-api
sudo systemctl restart infigenome-web

echo "==> Health check"
sleep 2
curl -fsS http://127.0.0.1:4000/health && echo
curl -fsS -o /dev/null -w 'web HTTP %{http_code}\n' http://127.0.0.1:3000/

echo "==> Done"
