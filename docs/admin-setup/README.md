# Admin console setup

This guide walks through wiring up the `/admin` console: creating Google OAuth credentials, setting environment variables, and bootstrapping the first admin.

## What the admin console gives you

- A login at **`/admin/login`** that signs in with Google.
- A submissions dashboard at **`/admin`** with three tabs: **Contact**, **Careers**, **Audit**. Click any row for the full detail in a side drawer.
- An admin management page at **`/admin/admins`**: add or remove admins by email. The next time they sign in with that Google account, they're allowed in (or revoked).
- All routes under `/admin*` and `/api/admin/*` require a valid HMAC-signed session cookie. The cookie is stateless — no session table to manage.

The first admin is **seeded automatically** when the table is first created so you have a way in. Default seed: `contact@zaftech.co`. Override via `ADMIN_SEED_EMAIL`.

## 1. Create a Google OAuth client

1. Open the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (or pick an existing one) — name it `ZafTech Admin` or similar.
3. Go to **APIs & Services → OAuth consent screen**.
   - **User type:** External (unless you have a Workspace and want Internal).
   - **App name:** `ZafTech Admin`
   - **User support email:** `contact@zaftech.co`
   - **Developer contact:** `contact@zaftech.co`
   - **Authorized domains:** `zaftech.co`
   - Add scopes: `openid`, `email`, `profile`. These are the defaults — no sensitive scopes needed.
   - On External + Testing status: add the seed admin email (and any other admin Google account) as a **Test user** so they can sign in before the app is verified. You can publish later when you stop adding users frequently.
4. Go to **APIs & Services → Credentials → Create Credentials → OAuth client ID**.
   - **Application type:** Web application
   - **Name:** `ZafTech Admin Web Client`
   - **Authorized JavaScript origins** (one per environment):
     - `https://zaftech.co`
     - `http://localhost:4321` (for `bun dev`)
   - **Authorized redirect URIs:**
     - `https://zaftech.co/api/admin/auth/callback`
     - `http://localhost:4321/api/admin/auth/callback`
   - Save. Google shows you a **Client ID** and **Client secret** — keep them handy.

## 2. Configure environment variables

The admin module reads these from `process.env` at runtime (SSR). Set them wherever you run the server — in cPanel/Plesk/Hosted Node, on Fly/Render/Railway, in a systemd unit, or in `.env` for local dev.

```bash
# Required for OAuth
GOOGLE_CLIENT_ID=xxxxxxxxxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxxxxxxxx

# Required for signing the admin session cookie.
# 32+ random bytes, base64 or hex. Generate with `openssl rand -base64 32`.
ADMIN_SESSION_SECRET=replace-with-a-long-random-string

# Optional. Defaults to contact@zaftech.co.
ADMIN_SEED_EMAIL=contact@zaftech.co

# Optional. Override the redirect URI when the request URL isn't the public origin
# (e.g. running behind a proxy that strips host headers).
# GOOGLE_REDIRECT_URI=https://zaftech.co/api/admin/auth/callback

# Required by the existing form endpoints (contact / careers / audit submissions)
# and by the admin DB. Bun's SQL driver — use a Postgres URL.
DATABASE_URL=postgres://user:pass@host:5432/dbname
```

### Local development

Create `.env` (gitignored) in the project root with the values above. `bun dev` reads it automatically.

### Production

For the standalone Node adapter, just export the variables in the process supervisor. If you're using systemd, drop them into the service `Environment=` lines or an `EnvironmentFile=`. On cPanel/Plesk, use the app's environment variables panel.

## 3. First sign-in

1. Deploy the latest build (or `bun dev` locally).
2. Visit `https://zaftech.co/admin/login`.
3. Click **Sign in with Google** and sign in as `contact@zaftech.co` (or whatever you set `ADMIN_SEED_EMAIL` to).
4. You should land on `/admin`. The Submissions tabs may be empty if no forms have been filled yet — that's expected.

If sign-in fails:

| Error on `/admin/login` | Meaning | Fix |
|---|---|---|
| `not_admin` | The signed-in Google email isn't in the `admins` table. | Sign in with the seed account first, then go to `/admin/admins` to add the new email. |
| `state_mismatch` | The OAuth state cookie expired or was blocked. | Cookies may be blocked by the browser. Try again from `/admin/login`. |
| `exchange_failed` | Google rejected the token exchange. | Verify `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and that the redirect URI matches exactly (scheme + host + path). |
| `OAuth configuration error` | Missing env var. | Confirm `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set in the server process. |

## 4. Adding more admins

1. Sign in as an existing admin.
2. Go to **`/admin/admins`**.
3. Type the new admin's Google email and click **Add admin**.
4. Tell them to visit `/admin/login` and sign in. The first sign-in creates no profile data — only the email needs to be in the table.

The seed admin (and the currently signed-in admin) cannot remove themselves. Anyone else can be removed with one click.

## 5. How it works (one-paragraph version)

The session cookie is an HMAC-SHA256 signed string in the form `base64url(json).base64url(sig)`, set as `httpOnly; SameSite=Lax; Secure` (in production). On every protected request, the server re-derives the signature with `ADMIN_SESSION_SECRET` and confirms the email is still in the `admins` table — so removing an admin revokes access immediately, no waiting for the cookie to expire. Cookies are valid for 7 days. OAuth uses the standard authorization-code flow with a one-time `state` parameter signed into a short-lived cookie for CSRF protection.

## File reference

| File | Purpose |
|---|---|
| `src/lib/db.ts` | Shared `bun:SQL` connection. |
| `src/lib/admin/admins.ts` | `admins` table, seed, list/add/remove/check. |
| `src/lib/admin/session.ts` | HMAC sign/verify, cookie builders. |
| `src/lib/admin/oauth.ts` | Google authorization-URL + token exchange. |
| `src/lib/admin/auth.ts` | `requireAdmin(request)` — call from any protected route. |
| `src/pages/api/admin/auth/login.ts` | Redirects to Google. |
| `src/pages/api/admin/auth/callback.ts` | Verifies state, exchanges code, sets session cookie. |
| `src/pages/api/admin/auth/logout.ts` | Clears session cookie. |
| `src/pages/api/admin/admins.ts` | GET / POST / DELETE for the admins table. |
| `src/pages/admin/login.astro` | Public — Google sign-in page. |
| `src/pages/admin/index.astro` | Auth-gated — submissions dashboard. |
| `src/pages/admin/admins.astro` | Auth-gated — manage admins. |

## Rotating the session secret

Changing `ADMIN_SESSION_SECRET` invalidates every existing session cookie. Everyone gets bounced to `/admin/login` and has to sign in again. Do this if you suspect the secret leaked. No DB change is needed.
