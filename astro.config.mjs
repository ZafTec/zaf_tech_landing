import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  output: "server",
  adapter: node({ mode: "standalone" }),
  integrations: [sitemap()],
  // Astro's `checkOrigin` defaults to true on SSR and rejects every
  // cross-origin form-encoded POST with 403 "Cross-site POST form
  // submissions are forbidden". The OAuth 2.0 token endpoint at
  // /api/auth/mcp/token is *required* to accept cross-origin
  // `application/x-www-form-urlencoded` POSTs from clients like
  // claude.ai, so this check blocks the MCP login dance after the
  // authorization code is issued. BetterAuth has its own CSRF defenses
  // (OAuth `state`, PKCE, signed session cookies), so we disable
  // Astro's broader same-origin form guard.
  security: { checkOrigin: false },
  vite: {
    build: {
      outDir: "dist",
      rollupOptions: { external: ["bun"] },
    },
    plugins: [tailwindcss()],
    ssr: { external: ["bun"] },
  },
  site: "https://zaftech.co",
});
