// Single source of truth for the public, externally-visible origin of this
// server. Used wherever code needs to construct a URL that an external client
// (browser, OAuth client, MCP agent) will resolve.
//
// Nginx already sets `X-Forwarded-Proto: $scheme` and `Host: $host`, but
// Astro's @astrojs/node adapter doesn't fold those into `request.url`, so
// downstream code that derives URLs from `request.url` ends up with `http://`
// (the upstream scheme nginx talks to the container with). Rather than
// sniffing forwarded headers at every call site, we anchor on the `BETTER_AUTH_URL`
// env var, which is canonical and already set in prod (and dev).

const FALLBACK = "http://localhost:4321";

export const publicOrigin = (): string => {
  const v = process.env.BETTER_AUTH_URL;
  if (!v) {
    console.warn(`[public-url] BETTER_AUTH_URL is not set; falling back to ${FALLBACK}.`);
    return FALLBACK;
  }
  return v.replace(/\/$/, "");
};

export const publicUrl = (path: string): string => {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${publicOrigin()}${p}`;
};
