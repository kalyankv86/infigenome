#!/usr/bin/env bash
# Create the local MySQL database + user and apply the schema.
# Assumes a local MySQL server is running and you can reach it as an admin
# (e.g. `sudo mysql` on Ubuntu, or set MYSQL_ADMIN_ARGS='-u root -pSECRET').
#
# Usage: ./db/setup.sh
set -euo pipefail

DB_NAME="${DB_NAME:-infigenome}"
DB_USER="${DB_USER:-infigenome}"
DB_PASS="${DB_PASS:-infigenome}"
ADMIN="${MYSQL_ADMIN_ARGS:-sudo mysql}"

echo "==> Creating database '$DB_NAME' and user '$DB_USER'"
$ADMIN <<SQL
CREATE DATABASE IF NOT EXISTS \`$DB_NAME\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS '$DB_USER'@'127.0.0.1' IDENTIFIED BY '$DB_PASS';
GRANT ALL PRIVILEGES ON \`$DB_NAME\`.* TO '$DB_USER'@'127.0.0.1';
FLUSH PRIVILEGES;
SQL

echo "==> Applying schema"
$ADMIN "$DB_NAME" < "$(dirname "$0")/schema.sql"

echo "==> Done. Set apps/api/.env:"
echo "    DATABASE_HOST=127.0.0.1"
echo "    DATABASE_PORT=3306"
echo "    DATABASE_NAME=$DB_NAME"
echo "    DATABASE_USER=$DB_USER"
echo "    DATABASE_PASSWORD=$DB_PASS"
