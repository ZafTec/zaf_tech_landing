import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";
import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  integrations: [react(), sitemap()],
  vite: {
    build: {
      outDir: "dist",
    },
    plugins: [tailwindcss()],
    ssr: {
      external: ["bun"],
      noExternal: ["ogl"],
    },
    build: {
      rollupOptions: {
        external: ["bun"],
      },
    },
    optimizeDeps: {
      include: ["ogl"],
    },
  },
  site: "https://zaftech.co",
});