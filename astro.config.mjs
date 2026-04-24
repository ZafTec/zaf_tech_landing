import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  output: "server",
  adapter: node({ mode: "standalone" }),
  integrations: [sitemap()],
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
