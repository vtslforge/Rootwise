# Backend authentication

This backend uses Better Auth with Neon Postgres for email/password sign-up,
sign-in, session checks, and sign-out.

## Environment

Create `Backend/.env` with:

```env
PORT=3001
NEON_PG_DB=your-Neon-Postgres-connection-string
BETTER_AUTH_SECRET=your-random-secret-of-at-least-32-characters
BETTER_AUTH_URL=http://localhost:3001
FRONTEND_URL=http://localhost:5173
```

Generate `BETTER_AUTH_SECRET` locally with:

```powershell
node -e "console.log(require('node:crypto').randomBytes(32).toString('base64url'))"
```

Keep the secret in the backend environment only. Do not commit it or expose it
with a `VITE_` environment variable.

`NEON_JWKS_URL` and `AUTH_URL` are for Neon Managed Auth and are not used by
this Better Auth setup.

## Initialize the auth tables

From the `Backend` directory, apply Better Auth's schema to the configured Neon
database:

```powershell
npx auth@latest migrate --config .\src\auth.ts
```

This changes the database schema. Confirm the configured Neon project and
database before running it.

## Run locally

Start the backend from `Backend`:

```powershell
npm run dev
```

The React app should have `VITE_API_URL=http://localhost:3001` in
`frontend/.env`, then can be started from `frontend` with `npm run dev`.

For deployment, set `BETTER_AUTH_URL` and `FRONTEND_URL` to the deployed
backend and frontend origins, and configure the frontend's `VITE_API_URL` to
the backend origin.
