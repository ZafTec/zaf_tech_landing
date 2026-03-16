# Layout Components

## Layout.astro (Main Layout)
- **Path:** `src/layouts/Layout.astro`
- Wraps all pages with `<html>`, `<head>`, `<body>`
- Imports global.css
- Props: `title`, `description`

```astro
---
import "@/styles/global.css";

const {
  title = "Zaftech Solutions | Full-stack Development & Machine Learning",
  description = "Full-stack engineering & ML solutions for high-stakes environments.",
} = Astro.props;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={description} />
    <meta name="theme-color" content="#0D0D0D" />
    <link rel="icon" type="image/svg+xml" href="/logo.svg" />
    <link rel="icon" type="image/png" sizes="32x32" href="/logo.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/logo.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="preload" href="/fonts/plus-jakarta-sans/plus-jakarta-sans-400.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="/fonts/plus-jakarta-sans/plus-jakarta-sans-600.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="/fonts/jetbrains-mono/jetbrains-mono-400.woff2" as="font" type="font/woff2" crossorigin />

    <title>{title}</title>

    <script is:inline async src="https://www.googletagmanager.com/gtag/js?id=G-7C4HBS7YTG"></script>
    <script is:inline>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-7C4HBS7YTG');
    </script>
  </head>
  <body class="bg-onyx-950 text-ivory-100 antialiased selection:bg-spruce-500 selection:text-onyx-950">
    <slot />
  </body>
</html>
```

## Navigation (Inline in index.astro)
- Fixed header with glass effect
- Logo: green dot + "Zaftech Solutions" text
- Desktop nav links (Capabilities, Products, Team, Contact)
- "Start Project" CTA button
- Mobile hamburger menu

```html
<header class="fixed top-0 left-0 w-full z-50 border-b border-onyx-700 bg-onyx-950/95 backdrop-blur-sm" data-header>
  <div class="px-6 md:px-12 py-4 flex items-center justify-between">
    <div class="flex items-center gap-6">
      <div class="flex items-center gap-2">
        <div class="w-2 h-2 bg-spruce-400"></div>
        <a href="/" class="text-ivory-100 text-sm font-bold tracking-wider font-sans">Zaftech Solutions</a>
      </div>
      <div class="hidden md:block h-4 w-px bg-onyx-700"></div>
      <nav class="hidden md:flex gap-6">
        <a class="text-[10px] font-mono text-onyx-400 hover:text-spruce-400 transition-colors uppercase tracking-widest" href="#services">Capabilities</a>
        <a class="text-[10px] font-mono text-onyx-400 hover:text-spruce-400 transition-colors uppercase tracking-widest" href="#products">Products</a>
        <a class="text-[10px] font-mono text-onyx-400 hover:text-spruce-400 transition-colors uppercase tracking-widest" href="#team">Team</a>
        <a class="text-[10px] font-mono text-onyx-400 hover:text-spruce-400 transition-colors uppercase tracking-widest" href="#contact">Contact</a>
      </nav>
    </div>
    <div class="flex items-center gap-4">
      <a href="#contact" class="hidden sm:flex h-9 items-center justify-center px-5 bg-spruce-400 text-onyx-950 text-[10px] font-bold tracking-wider hover:bg-spruce-300 transition-colors uppercase">Start Project</a>
      <button class="flex sm:hidden h-9 w-9 items-center justify-center bg-onyx-900 border border-onyx-700 text-ivory-100" aria-label="Menu">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>
    </div>
  </div>
</header>
```

## Footer (Inline in index.astro)
```html
<footer class="border-t border-onyx-700 py-8 px-6 md:px-12 mt-auto">
  <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-onyx-400">
    <div class="flex items-center gap-6">
      <span class="text-spruce-400">2026 Zaftech Solutions</span>
      <span>All rights reserved.</span>
    </div>
    <div class="flex gap-6">
      <a href="#services" class="hover:text-spruce-400 transition-colors">Capabilities</a>
      <a href="#contact" class="hover:text-spruce-400 transition-colors">Contact</a>
      <a href="/careers" class="hover:text-spruce-400 transition-colors">Careers</a>
    </div>
  </div>
</footer>
```
