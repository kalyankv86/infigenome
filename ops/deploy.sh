#!/usr/bin/env bash
# Redeploy Infigenome in place at /opt/infigenome (folder name is kept).
# Run as root on the server:  bash /opt/infigenome/ops/deploy.sh
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/infigenome}"
REPO="${REPO:-https://github.com/kalyankv86/infigenome.git}"
BRANCH="${BRANCH:-main}"
WEB_STANDALONE="$APP_DIR/apps/web/.next/standalone/apps/web"

# The tree ends up owned by www-data; git runs here as root.
git config --global --get-all safe.directory 2>/dev/null | grep -qx "$APP_DIR" \
  || git config --global --add safe.directory "$APP_DIR"

cd "$APP_DIR"

if [ -d .git ]; then
  echo "==> Updating existing checkout"
  git fetch origin "$BRANCH"
  git reset --hard "origin/$BRANCH"
else
  echo "==> No .git here — refreshing contents from $REPO (keeping $APP_DIR and apps/api/.env)"
  TMP="$(mktemp -d)"
  git clone --depth 1 -b "$BRANCH" "$REPO" "$TMP"
  cp -a apps/api/.env "$TMP/apps/api/.env" 2>/dev/null || true
  rsync -a --delete --exclude apps/api/.env "$TMP"/ "$APP_DIR"/
  rm -rf "$TMP"
fi

echo "==> Installing dependencies"
npm ci

echo "==> Applying database schema (idempotent)"
set -a; . apps/api/.env; set +a
mysql -h "${DATABASE_HOST:-127.0.0.1}" -P "${DATABASE_PORT:-3306}" \
      -u "$DATABASE_USER" -p"$DATABASE_PASSWORD" "$DATABASE_NAME" < db/schema.sql

echo "==> Building web + api"
npm run build

echo "==> Populating standalone bundle (static + public + api .env)"
mkdir -p "$WEB_STANDALONE/.next"
rsync -a --delete apps/web/.next/static/ "$WEB_STANDALONE/.next/static/"
rsync -a --delete apps/web/public/       "$WEB_STANDALONE/public/"

echo "==> Ownership"
chown -R www-data:www-data "$APP_DIR"

echo "==> Restarting services"
systemctl restart infigenome-api
systemctl restart infigenome-web

echo "==> Health check"
sleep 2
curl -fsS http://127.0.0.1:4100/health && echo
curl -fsS -o /dev/null -w 'web HTTP %{http_code}\n' http://127.0.0.1:3100/

echo "==> Done"
