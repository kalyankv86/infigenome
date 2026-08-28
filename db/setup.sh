#!/usr/bin/env bash
# Create the local database + role and apply the schema.
# Assumes a local PostgreSQL server is already running (e.g. `brew services start postgresql@17`).
#
# Usage: ./db/setup.sh
set -euo pipefail

DB_NAME="${DB_NAME:-infigenome}"
DB_USER="${DB_USER:-infigenome}"
DB_PASS="${DB_PASS:-infigenome}"
SUPERUSER="${SUPERUSER:-$(whoami)}"

echo "==> Ensuring role '$DB_USER' exists"
psql -v ON_ERROR_STOP=1 -U "$SUPERUSER" -d postgres <<SQL
DO \$\$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = '$DB_USER') THEN
    CREATE ROLE $DB_USER LOGIN PASSWORD '$DB_PASS';
  END IF;
END
\$\$;
SQL

echo "==> Ensuring database '$DB_NAME' exists"
if ! psql -U "$SUPERUSER" -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname='$DB_NAME'" | grep -q 1; then
  createdb -U "$SUPERUSER" -O "$DB_USER" "$DB_NAME"
fi

echo "==> Applying schema"
PGPASSWORD="$DB_PASS" psql -v ON_ERROR_STOP=1 -U "$DB_USER" -h 127.0.0.1 -d "$DB_NAME" -f "$(dirname "$0")/schema.sql"

echo "==> Done. DATABASE_URL=postgresql://$DB_USER:$DB_PASS@127.0.0.1:5432/$DB_NAME"
