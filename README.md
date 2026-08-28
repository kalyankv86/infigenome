# Infigenome Platform

WordPress-free rebuild of the CenOmics site for `https://infigenome.com`.

## Stack
- Next.js + React + TypeScript frontend (`apps/web`)
- Node.js + Fastify API (`apps/api`)
- MySQL 8 (`leads` table)
- Nginx origin behind Cloudflare (TLS at the edge; see `DEPLOYMENT.md`)
- Light international biotech visual system (no black backgrounds)

## Current implementation
A single-page site (Hero, About, Services, Completed Programs, Upcoming
Workshops, Lab, Team, Contact) cloned from the live CenOmics site with the brand
renamed to Infigenome and its media re-hosted locally, plus SEO metadata, a
Fastify API with a health endpoint and a `/api/leads` endpoint that persists
enquiries to PostgreSQL, and a wired contact form.

> Contact details in `components/Footer.tsx` / `app/page.tsx` (email
> `infigenome@gmail.com`, Instagram/Facebook `/infigenome`) are name-swapped
> placeholders — replace with real Infigenome accounts. Phone is carried over
> from the source site.

## Prerequisites
- Node.js 20+
- A local MySQL 8 server, e.g.:
  ```bash
  brew install mysql
  brew services start mysql
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
`infigenome` database + user and applies it. To re-apply after a schema change:

```bash
mysql infigenome < db/schema.sql
```

Inspect captured leads:

```bash
mysql infigenome -e "SELECT id, created_at, name, email FROM leads ORDER BY id DESC LIMIT 20;"
```

## Production

See [`DEPLOYMENT.md`](DEPLOYMENT.md) — deploys in place at `/opt/infigenome` via
`ops/deploy.sh` (Next.js standalone on :3100 + Fastify API on :4100, both under
systemd, nginx origin behind Cloudflare, MySQL).

```bash
npm run build   # builds web (standalone) + compiles the API to apps/api/dist
```

## Migration still required
See [`MIGRATION_NOTES.md`](MIGRATION_NOTES.md). Outstanding items include parsing
the WordPress export, mapping Elementor layouts to React sections, migrating
media, preserving SEO URLs with 301s, replacing all CenOmics brand copy/assets,
connecting leads to email + CRM, and adding sitemap/robots/schema + analytics.
