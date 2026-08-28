#!/usr/bin/env bash
# Poll origin/main; if it moved past the deployed commit, run ops/deploy.sh.
# Invoked by infigenome-deploy.timer every couple of minutes. Runs as root.
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/infigenome}"
BRANCH="${BRANCH:-main}"
LOG="${LOG:-/var/log/infigenome-deploy.log}"
LOCKFILE="/run/infigenome-deploy.lock"

exec 9>"$LOCKFILE"
flock -n 9 || { echo "$(date -Is) another deploy is running, skipping" >>"$LOG"; exit 0; }

git config --global --get-all safe.directory | grep -qx "$APP_DIR" \
  || git config --global --add safe.directory "$APP_DIR"

cd "$APP_DIR"
git fetch --quiet origin "$BRANCH"
LOCAL="$(git rev-parse HEAD)"
REMOTE="$(git rev-parse "origin/$BRANCH")"

if [ "$LOCAL" = "$REMOTE" ]; then
  echo "$(date -Is) up to date at ${LOCAL:0:8}" >>"$LOG"
  exit 0
fi

echo "$(date -Is) deploying ${LOCAL:0:8} -> ${REMOTE:0:8}" | tee -a "$LOG"
if bash "$APP_DIR/ops/deploy.sh" >>"$LOG" 2>&1; then
  echo "$(date -Is) deploy OK now at $(git rev-parse --short HEAD)" | tee -a "$LOG"
else
  rc=$?
  echo "$(date -Is) deploy FAILED rc=$rc (see $LOG)" | tee -a "$LOG"
  exit $rc
fi
