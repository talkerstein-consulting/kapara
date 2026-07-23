# Kapara

Astro + React site for Kapara Bistro & Grill, with an authenticated `/admin`
portal (menu management, form submissions dashboard, Google reviews fetcher).

## Run locally

**Prerequisites:** Node.js, a MySQL database.

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env.local` and fill in the values (see below).
3. Push the DB schema: `npm run db:push`
4. Run the app: `npm run dev`

## Environment variables

See `.env.example` for the full list. Notable ones:

- `DATABASE_URL` — MySQL connection string (`mysql://user:pass@host:3306/dbname`).
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — from a Google Cloud OAuth
  client (Web application). Authorized redirect URI: `<origin>/api/auth/callback/google`.
- `AUTH_SECRET` — generate with `openssl rand -base64 32`.
- `ADMIN_EMAILS` — comma-separated list of Google accounts allowed into `/admin`.
- `GOOGLE_PLACES_API_KEY` / `GOOGLE_PLACE_ID` — for the "Fetch New Reviews"
  admin action (Places API New, Place Details `reviews` field).

## Admin portal

- `/admin` — form submissions dashboard (Reservations, Catering, Contact), with CSV export.
- `/admin/menu` — add/edit/delete menu items, image upload.
- `/admin/reviews` — view stored reviews, fetch new ones from Google.

Gated by Google OAuth + the `ADMIN_EMAILS` allow-list (see `auth.config.ts` and `src/middleware.ts`).

## Deploying to Hostinger (shared/business hosting)

This site uses `output: 'server'` with `@astrojs/node` in **standalone** mode
(`astro.config.mjs`), which builds to a plain Node.js entry point at
`dist/server/entry.mjs` — this matches Hostinger's Node.js app hosting
(Phusion Passenger), which runs a standard Node process bound to
`process.env.PORT`.

1. In hPanel, create a MySQL database + user, and a Node.js application
   pointing at this repo.
2. Set the startup file to `dist/server/entry.mjs` and configure all the env
   vars from `.env.example` in hPanel's Node.js app environment settings
   (using the real production `DATABASE_URL`, Google OAuth credentials, etc).
3. Build (`npm run build`) and deploy `dist/` (plus `node_modules` — or let
   Hostinger run `npm install` itself if its Node.js app manager supports that).
4. Run `npm run db:push` once against the production database to create the
   tables (or `npx drizzle-kit push` with production `DATABASE_URL` set).
5. Only once everything above is verified working: switch `kapara.ca`'s
   hosting/DNS over from the existing WordPress install to this app.
