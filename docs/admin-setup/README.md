# Admin console setup

This guide walks through the admin console + MCP server: creating Google OAuth credentials, setting environment variables, configuring SMTP for the reach-out feature, and connecting AI agents to the MCP endpoint.

## Architecture in one paragraph

[BetterAuth](https://www.better-auth.com/) handles Google sign-in and issues sessions backed by Postgres tables. The same BetterAuth instance acts as an OAuth 2 / OIDC provider for MCP clients via the `mcp` plugin, so AI agents go through the same Google sign-in and receive scoped access tokens. Every admin route (`/admin/*`, `/api/admin/*`) and the MCP endpoint (`/api/mcp`) re-confirms the signed-in email is in the `admins` table on each request — revoking an admin is instant.

## 1. Create a Google OAuth client

1. Open the [Google Cloud Console](https://console.cloud.google.com/).
2. Create or select a project (e.g. `ZafTech Admin`).
3. **APIs & Services → OAuth consent screen**
   - User type: External (or Internal for Workspace)
   - App name: `ZafTech Admin`
   - Support email + developer contact: `contact@zaftech.co`
   - Authorized domains: `zaftech.co`
   - Scopes: `openid`, `email`, `profile` (the defaults — no sensitive scopes needed).
   - While in testing status, add each admin Google account as a **Test user**.
4. **APIs & Services → Credentials → Create Credentials → OAuth client ID**
   - Application type: **Web application**
   - Name: `ZafTech Admin Web`
   - **Authorized JavaScript origins:**
     - `https://zaftech.co`
     - `http://localhost:4321`
   - **Authorized redirect URIs:**
     - `https://zaftech.co/api/auth/callback/google`
     - `http://localhost:4321/api/auth/callback/google`
5. Copy the **Client ID** and **Client secret**.

> **Note:** the callback path is `/api/auth/callback/google` — that's BetterAuth's catch-all. Don't use the old `/api/admin/auth/callback` path.

## 2. Apply the database schema

BetterAuth creates its own tables. Run the migration once against your `DATABASE_URL`:

```bash
bunx @better-auth/cli migrate
```

This creates `user`, `session`, `account`, `verification`, `oauthApplication`, `oauthAccessToken`, `oauthConsent`. Re-running is safe — the CLI is idempotent.

The submission tables (`contact_submissions`, `career_applications`, `audit_submissions`) and the `admins` table are created lazily by the app on first use, so no separate migration is needed for those.

## 3. Configure environment variables

```bash
# Database
DATABASE_URL=postgres://user:pass@host:5432/dbname

# BetterAuth — public origin + signing secret
BETTER_AUTH_URL=https://zaftech.co
BETTER_AUTH_SECRET=$(openssl rand -base64 32)

# Google OAuth
GOOGLE_CLIENT_ID=xxxxxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxxxxxxxxxx

# SMTP — admin "Reach out" feature + MCP send_reachout tool
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_USER=mailer@zaftech.co
SMTP_PASS=app-specific-password
SMTP_FROM="ZafTech <hello@zaftech.co>"

# Optional — first admin seeded on initial startup (defaults to contact@zaftech.co)
# ADMIN_SEED_EMAIL=contact@zaftech.co
```

Local dev: put these in `.env` (already gitignored). `bun dev` reads it automatically.

Production: export the same variables in your process supervisor / container runtime.

### Docker Compose snippet

```yaml
services:
  zaftech:
    image: euaell/zaftech:latest
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgres://admin:...@postgresql-db:5432/zaftech
      - BETTER_AUTH_URL=https://zaftech.co
      - BETTER_AUTH_SECRET=<generated>
      - GOOGLE_CLIENT_ID=...
      - GOOGLE_CLIENT_SECRET=...
      - SMTP_HOST=...
      - SMTP_PORT=587
      - SMTP_USER=...
      - SMTP_PASS=...
      - SMTP_FROM=ZafTech <hello@zaftech.co>
      - PORT=3000
```

## 4. First sign-in

1. Deploy the latest build (or `bun dev` locally).
2. Visit `BETTER_AUTH_URL/admin/login`.
3. Click **Sign in with Google** and authenticate as `contact@zaftech.co` (or whichever email you set as `ADMIN_SEED_EMAIL`).
4. You land on `/admin`. The first request lazily creates the `admins` table and inserts the seed email — you'll see `[admins] Seeded admin: contact@zaftech.co` in logs.

Errors land back on `/admin/login` with a `?error=` code:

| Code | Meaning | Fix |
|---|---|---|
| `not_admin` | Signed-in email isn't in the admins table | Sign in as the seed admin, then go to `/admin/admins` and add the new email |
| `oauth_failed` | Google rejected the sign-in (bad client ID/secret, redirect mismatch, or test user not allowlisted) | Re-check the credentials + the redirect URI in Cloud Console |

## 5. Adding more admins

1. Sign in as any existing admin.
2. Go to **`/admin/admins`**.
3. Enter the new admin's Google email and click **Add admin**.
4. Tell them to visit `/admin/login`. They sign in with that exact Google account.

The seed admin and the currently signed-in admin cannot remove themselves. Anyone else can be removed with one click — their next request gets bounced back to login.

## 6. SMTP / Reach-out

The dashboard exposes a **Reach out** button in the detail drawer for contact and career submissions. Clicking it opens an inline compose form with a pre-filled subject and a polite scaffold; admin edits, sends, and the submission gets marked handled automatically.

The same operation is available to AI agents via the `send_reachout` MCP tool (see below).

If `SMTP_HOST` / `SMTP_USER` / `SMTP_PASS` are unset, both the UI and MCP tool return a clear error — nothing else breaks.

## 7. Connect an MCP client

The admin console *is* an MCP server. Once you're signed in as an admin, visit `/admin/mcp` for the canonical config block. The short version:

```json
{
  "mcpServers": {
    "zaftech-admin": {
      "url": "https://zaftech.co/api/mcp"
    }
  }
}
```

The first time the agent connects, it'll go through Google sign-in (using the same OAuth client). The issued access token is bound to the user's email; if that email isn't in `admins`, the agent gets a 403. Tools available:

| Tool | Description |
|---|---|
| `list_submissions` | List recent submissions of a type, filtered by `open` / `handled` / `all`. |
| `get_submission` | Fetch one submission by `type` and `id`. |
| `send_reachout` | Send an email to the submitter (contact + careers only) and mark handled. |
| `mark_handled` | Mark a submission handled. |
| `mark_unhandled` | Re-open a previously-handled submission. |

## 8. Rotating secrets

- **`BETTER_AUTH_SECRET`** — rotating signs out every admin and invalidates every MCP access token. No DB change needed.
- **`GOOGLE_CLIENT_SECRET`** — rotate in Google Cloud Console → Credentials → your OAuth client. Update `GOOGLE_CLIENT_SECRET` in your env, restart the server.
- **SMTP_PASS** — rotate at the mail provider, update env, restart.

## File reference

| File | Purpose |
|---|---|
| `src/lib/auth.ts` | BetterAuth instance — Google provider + MCP plugin. |
| `src/lib/db.ts` | Shared Bun SQL connection for the form/admin tables. |
| `src/lib/mail.ts` | Nodemailer SMTP transport. |
| `src/lib/admin/admins.ts` | `admins` table — seed, list/add/remove/check. |
| `src/lib/admin/auth.ts` | `requireAdmin(...)` — used by every protected page/route. |
| `src/lib/admin/submissions.ts` | Typed CRUD over `contact_submissions` / `career_applications` / `audit_submissions`. |
| `src/lib/admin/mcp-tools.ts` | Declarative MCP tool definitions + handlers. |
| `src/middleware.ts` | Loads the BetterAuth session into `Astro.locals` for every request. |
| `src/pages/api/auth/[...all].ts` | BetterAuth catch-all (sign-in, callbacks, token issuance, MCP OAuth endpoints). |
| `src/pages/api/mcp/[...rest].ts` | JSON-RPC MCP endpoint. Admin-only via the OAuth bearer token. |
| `src/pages/api/admin/admins.ts` | Manage admins (list / add / remove). |
| `src/pages/api/admin/handled.ts` | Toggle `handled_at` on a submission. |
| `src/pages/api/admin/reachout.ts` | Send a reply email + mark handled. |
| `src/pages/admin/login.astro` | Sign-in. |
| `src/pages/admin/index.astro` | Submissions dashboard + detail drawer + reachout UI. |
| `src/pages/admin/admins.astro` | Manage admins. |
| `src/pages/admin/mcp.astro` | MCP connection instructions + tool list. |
