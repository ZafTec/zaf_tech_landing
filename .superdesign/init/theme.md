# Design Tokens & Theme

## Framework
- **CSS Framework:** Tailwind CSS v4 (via `@tailwindcss/vite` plugin)
- **Config:** No `tailwind.config.ts` — uses CSS-first configuration with `@theme` directive in `global.css`

## Fonts

### Plus Jakarta Sans (Primary / Sans)
- Weights: 400, 600, 700, 800
- Usage: `font-sans` → headings, body text
- Self-hosted WOFF2

### JetBrains Mono (Monospace)
- Weights: 400, 500
- Usage: `font-mono` → labels, tags, section numbers, code-style text
- Self-hosted WOFF2

## Color Palette (OKLCH)

### Onyx (Neutral / Dark palette)
```
onyx-50:  oklch(96.40% 0.005 145.54)
onyx-100: oklch(92.67% 0.012 145.48)
onyx-200: oklch(85.22% 0.024 145.36)
onyx-300: oklch(77.52% 0.034 145.24)
onyx-400: oklch(69.78% 0.047 145.05)
onyx-500: oklch(61.89% 0.061 144.79)
onyx-600: oklch(52.72% 0.050 144.82)
onyx-700: oklch(43.12% 0.039 144.86)  — borders
onyx-800: oklch(33.12% 0.031 144.85)  — surface-2, active tabs
onyx-900: oklch(22.10% 0.017 144.97)  — surface, card bg, section bg
onyx-950: oklch(18.53% 0.010 145.15)  — main bg
```

### Ivory (Text palette)
```
ivory-50:  oklch(98.51% 0.026 99.90)
ivory-100: oklch(97.19% 0.053 102.73) — primary text (ink)
ivory-200–950: warm neutrals for light mode
```

### Spruce (Accent / Teal-green)
```
spruce-50:  oklch(96.81% 0.011 182.88)
spruce-100: oklch(93.83% 0.023 179.94)
spruce-200: oklch(87.74% 0.045 180.71)
spruce-300: oklch(81.71% 0.067 179.14) — accent hover
spruce-400: oklch(75.87% 0.087 178.41) — primary accent
spruce-500: oklch(70.21% 0.103 176.35) — selection bg
spruce-600–950: darker accents
```

## Semantic Tokens
```css
--color-ink: var(--color-ivory-100);
--color-ink-muted: var(--color-onyx-400);
--color-bg: var(--color-onyx-950);
--color-surface: var(--color-onyx-900);
--color-surface-2: var(--color-onyx-800);
--color-border: var(--color-onyx-700);
--color-accent: var(--color-spruce-400);
--color-accent-hover: var(--color-spruce-300);
```

## Light Mode
Colors are inverted via `@media (prefers-color-scheme: light)` — onyx scale flips with ivory scale. Spruce accent stays consistent.

## Spacing & Sizing
- Section padding: `py-16 md:py-24 px-6 md:px-12`
- Max content width: `max-w-6xl mx-auto`
- Card padding: `p-6` to `p-8`
- Grid gaps: `gap-6`
- Header height: 64px (`py-4` with content)

## Borders & Shadows
- Default borders: `border border-onyx-700`
- Hover borders: `hover:border-spruce-400/30`
- Active borders: `border-spruce-400/50`
- Shadow soft: `box-shadow: 0 24px 48px rgba(0,0,0,0.4)`
- Shadow card: `box-shadow: 0 18px 36px rgba(0,0,0,0.3)`

## Animations
```css
@keyframes fade-up { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
@keyframes fade-in { from { opacity:0 } to { opacity:1 } }
@keyframes blink { 0%,100% { opacity:1 } 50% { opacity:0 } }
@keyframes pulse-dot { 0%,100% { box-shadow:0 0 4px spruce-400; opacity:1 } 50% { box-shadow:0 0 12px spruce-400; opacity:0.8 } }
```

## Image Treatment
- Dark mode: `filter: grayscale(100%) contrast(110%)` → on hover: `grayscale(0%) contrast(100%)`
- Light mode: `filter: saturate(30%) brightness(103%) contrast(92%)` → on hover: full saturate
- Overlays with `image-overlay--adaptive` class

## Key Design Characteristics
- **Sharp corners** — no border-radius anywhere (except scrollbar thumbs and team images)
- **Industrial/terminal aesthetic** — monospace labels, section numbers (01 //, 02 //)
- **Hover accent line** — top border scale-x animation on cards
- **Minimal color** — mostly grayscale with spruce-400 accent pops
- **Technical grid** — subtle 40px grid background pattern
