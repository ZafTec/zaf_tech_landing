// HMAC-signed admin session in an httpOnly cookie. Stateless — no DB session
// table needed. The cookie carries (email, expiresAt) and a signature; the
// server re-derives the signature with ADMIN_SESSION_SECRET on each request.

const enc = new TextEncoder();
const dec = new TextDecoder();

const b64urlFromBytes = (bytes: Uint8Array): string =>
  Buffer.from(bytes).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

const b64urlFromString = (s: string): string => b64urlFromBytes(enc.encode(s));

const bytesFromB64url = (s: string): Uint8Array => {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  return new Uint8Array(Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/") + pad, "base64"));
};

const stringFromB64url = (s: string): string => dec.decode(bytesFromB64url(s));

const getSecret = (): string => {
  const v = process.env.ADMIN_SESSION_SECRET;
  if (!v || v.length < 16) {
    throw new Error("ADMIN_SESSION_SECRET is missing or too short (need 16+ chars)");
  }
  return v;
};

const hmac = async (data: string): Promise<string> => {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return b64urlFromBytes(new Uint8Array(sig));
};

const timingSafeEqual = (a: string, b: string): boolean => {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
};

export const SESSION_COOKIE = "zaf_admin_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

export type SessionPayload = { email: string; expiresAt: number };

export const signSession = async (email: string): Promise<string> => {
  const payload: SessionPayload = {
    email: email.toLowerCase(),
    expiresAt: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS,
  };
  const body = b64urlFromString(JSON.stringify(payload));
  const sig = await hmac(body);
  return `${body}.${sig}`;
};

export const verifySession = async (token: string | undefined | null): Promise<SessionPayload | null> => {
  if (!token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = await hmac(body);
  if (!timingSafeEqual(sig, expected)) return null;
  let payload: SessionPayload;
  try {
    payload = JSON.parse(stringFromB64url(body));
  } catch {
    return null;
  }
  if (!payload || typeof payload.email !== "string" || typeof payload.expiresAt !== "number") return null;
  if (payload.expiresAt < Math.floor(Date.now() / 1000)) return null;
  return payload;
};

const isProd = (): boolean => process.env.NODE_ENV === "production";

export const buildSessionCookie = (value: string): string => {
  const flags = [
    `${SESSION_COOKIE}=${value}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${SESSION_MAX_AGE_SECONDS}`,
  ];
  if (isProd()) flags.push("Secure");
  return flags.join("; ");
};

export const buildClearSessionCookie = (): string => {
  const flags = [`${SESSION_COOKIE}=`, "Path=/", "HttpOnly", "SameSite=Lax", "Max-Age=0"];
  if (isProd()) flags.push("Secure");
  return flags.join("; ");
};

// Short-lived state cookie used for OAuth CSRF protection.
export const OAUTH_STATE_COOKIE = "zaf_admin_oauth_state";
export const OAUTH_STATE_MAX_AGE_SECONDS = 60 * 10;

export const buildStateCookie = (value: string): string => {
  const flags = [
    `${OAUTH_STATE_COOKIE}=${value}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${OAUTH_STATE_MAX_AGE_SECONDS}`,
  ];
  if (isProd()) flags.push("Secure");
  return flags.join("; ");
};

export const buildClearStateCookie = (): string => {
  const flags = [`${OAUTH_STATE_COOKIE}=`, "Path=/", "HttpOnly", "SameSite=Lax", "Max-Age=0"];
  if (isProd()) flags.push("Secure");
  return flags.join("; ");
};

export const randomState = (): string => {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  return b64urlFromBytes(bytes);
};

export const readCookie = (cookieHeader: string | null, name: string): string | null => {
  if (!cookieHeader) return null;
  const parts = cookieHeader.split(/;\s*/);
  for (const part of parts) {
    const eq = part.indexOf("=");
    if (eq === -1) continue;
    if (part.slice(0, eq) === name) return decodeURIComponent(part.slice(eq + 1));
  }
  return null;
};
