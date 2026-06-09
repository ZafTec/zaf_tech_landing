// Google OAuth 2.0 authorization code flow.
// Docs: https://developers.google.com/identity/protocols/oauth2/web-server

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo";

const env = (name: string, fallback?: string): string => {
  const v = process.env[name] ?? fallback;
  if (!v) throw new Error(`${name} is not set`);
  return v;
};

const inferRedirectUri = (request: Request): string => {
  const fromEnv = process.env.GOOGLE_REDIRECT_URI;
  if (fromEnv) return fromEnv;
  const url = new URL(request.url);
  return `${url.origin}/api/admin/auth/callback`;
};

export const buildAuthUrl = (request: Request, state: string): string => {
  const params = new URLSearchParams({
    client_id: env("GOOGLE_CLIENT_ID"),
    redirect_uri: inferRedirectUri(request),
    response_type: "code",
    scope: "openid email profile",
    access_type: "online",
    prompt: "select_account",
    state,
  });
  return `${GOOGLE_AUTH_URL}?${params.toString()}`;
};

type TokenResponse = {
  access_token: string;
  id_token?: string;
  token_type: string;
  expires_in: number;
};

type UserInfo = {
  sub: string;
  email: string;
  email_verified: boolean;
  name?: string;
  picture?: string;
};

export const exchangeCodeForUser = async (
  request: Request,
  code: string,
): Promise<UserInfo> => {
  const body = new URLSearchParams({
    code,
    client_id: env("GOOGLE_CLIENT_ID"),
    client_secret: env("GOOGLE_CLIENT_SECRET"),
    redirect_uri: inferRedirectUri(request),
    grant_type: "authorization_code",
  });

  const tokenRes = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!tokenRes.ok) {
    const detail = await tokenRes.text();
    throw new Error(`Token exchange failed (${tokenRes.status}): ${detail.slice(0, 200)}`);
  }
  const tokens = (await tokenRes.json()) as TokenResponse;

  const userRes = await fetch(GOOGLE_USERINFO_URL, {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
  });
  if (!userRes.ok) {
    throw new Error(`User info fetch failed (${userRes.status})`);
  }
  const user = (await userRes.json()) as UserInfo;
  if (!user.email || !user.email_verified) {
    throw new Error("Google account email is missing or unverified");
  }
  return user;
};
