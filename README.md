# Infigenome Platform

WordPress-free rebuild of the CenOmics site for `https://infigenome.com`.

## Stack
- Next.js + React + TypeScript frontend (`apps/web`)
- Node.js + Fastify API (`apps/api`)
- PostgreSQL
- Nginx / Cloudflare at the edge (deployment-time, not part of this repo)
- Light international biotech visual system (no black backgrounds)

## Current implementation
A production-oriented Next.js shell with Home, About, Services, Blog and Contact
routes, migrated legacy imagery, SEO metadata, a Fastify API with a health
endpoint and a `/api/leads` endpoint that persists enquiries to PostgreSQL, and a
wired contact form.

## Prerequisites
- Node.js 22+ (24 recommended)
- A local PostgreSQL server, e.g.:
  ```bash
  brew install postgresql@17
  brew services start postgresql@17
  ```

## Local development

```bash
# 1. Install dependencies (root + both workspaces)
npm install

# 2. Create the database, role and schema
./db/setup.sh

# 3. Configure environment
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local

# 4. Run web + API together
npm run dev
```

- Web: http://localhost:3000
- API: http://localhost:4000/health

Run them individually with `npm run dev:web` / `npm run dev:api`.

### Database

The schema lives in [`db/schema.sql`](db/schema.sql). `./db/setup.sh` creates the
`infigenome` role + database and applies it. To re-apply after a schema change:

```bash
psql "$DATABASE_URL" -f db/schema.sql
```

Inspect captured leads:

```bash
psql "$DATABASE_URL" -c "SELECT created_at, name, email FROM leads ORDER BY created_at DESC LIMIT 20;"
```

## Production build

```bash
npm run build        # builds web (standalone) + compiles the API to apps/api/dist
npm run start        # starts the web server (next start)
node apps/api/dist/server.js   # start the API (with real env vars set)
```

Provide `DATABASE_URL`, `PORT` and `CORS_ORIGINS` to the API process and
`NEXT_PUBLIC_SITE_URL` / `NEXT_PUBLIC_API_URL` at web build time. Put
Nginx / Cloudflare in front; keep PostgreSQL and the API private.

## Migration still required
See [`MIGRATION_NOTES.md`](MIGRATION_NOTES.md). Outstanding items include parsing
the WordPress export, mapping Elementor layouts to React sections, migrating
media, preserving SEO URLs with 301s, replacing all CenOmics brand copy/assets,
connecting leads to email + CRM, and adding sitemap/robots/schema + analytics.
