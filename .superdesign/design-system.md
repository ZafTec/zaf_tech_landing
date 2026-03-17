# Zaftech Solutions — Design System

## Product Context
Zaftech Solutions is a software engineering consultancy based in Addis Ababa, Ethiopia, specializing in full-stack development, machine learning, cloud infrastructure, and security. The landing page serves as the company's primary marketing presence — designed to convey technical competence, reliability, and a modern engineering-first brand.

## Key Pages
- **Homepage** (`/`) — Single-page scroll with 8 sections: Hero, Services, About, Products, Gallery, Team, Features, Contact
- **Careers** (`/careers`) — Job listings

## Brand Identity

### Visual Direction
- **Industrial/Terminal Aesthetic** — monospace labels, section numbering (01 //, 02 //), technical grid backgrounds
- **Sharp Corners** — NO border-radius anywhere (no rounded corners)
- **Minimal Color** — predominantly dark/neutral with targeted spruce-400 accent pops
- **High Contrast** — dark backgrounds with light text, grayscale image treatment

### Logo
- Small green square dot (`w-2 h-2 bg-spruce-400`) + "Zaftech Solutions" text in `font-sans font-bold text-sm tracking-wider`
- No image logo — purely typographic

## Typography

### Heading Font: Plus Jakarta Sans
- **font-family:** "Plus Jakarta Sans", "Segoe UI", sans-serif
- **Tailwind class:** `font-sans`
- **Weights used:** 400 (body), 600 (semibold), 700 (bold headings), 800 (extra bold)
- **Self-hosted WOFF2**

### Monospace Font: JetBrains Mono
- **font-family:** "JetBrains Mono", monospace
- **Tailwind class:** `font-mono`
- **Weights used:** 400, 500
- **Usage:** Labels, tags, section numbers, metadata, small UI text

### Type Scale
- Hero heading: `text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]`
- Section headings: `text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight`
- Card titles: `text-xl font-bold` or `text-lg font-bold`
- Body text: `text-base` or `text-lg` with `leading-relaxed`
- Labels/tags: `text-[10px] font-mono uppercase tracking-widest`
- Section numbers: `text-sm font-mono` (spruce-400 color)

## Color Palette

### Primary Colors (Dark Mode — Default)

| Token | Value | Usage |
|-------|-------|-------|
| `onyx-950` | `oklch(18.53% 0.010 145.15)` | Main background |
| `onyx-900` | `oklch(22.10% 0.017 144.97)` | Surface / card backgrounds / section alternating bg |
| `onyx-800` | `oklch(33.12% 0.031 144.85)` | Active tab bg, hover states |
| `onyx-700` | `oklch(43.12% 0.039 144.86)` | Borders |
| `onyx-400` | `oklch(69.78% 0.047 145.05)` | Muted text / labels |
| `onyx-300` | `oklch(77.52% 0.034 145.24)` | Secondary body text |
| `ivory-100` | `oklch(97.19% 0.053 102.73)` | Primary text |
| `spruce-400` | `oklch(75.87% 0.087 178.41)` | PRIMARY ACCENT — buttons, highlights, hover states, numbers |
| `spruce-300` | `oklch(81.71% 0.067 179.14)` | Accent hover state |
| `spruce-500` | `oklch(70.21% 0.103 176.35)` | Selection background |

### Semantic Tokens
```
ink:          ivory-100 (primary text)
ink-muted:    onyx-400 (secondary/label text)
bg:           onyx-950 (page background)
surface:      onyx-900 (elevated surface)
surface-2:    onyx-800 (higher elevation)
border:       onyx-700 (default borders)
accent:       spruce-400 (primary accent)
accent-hover: spruce-300 (accent hover)
```

### Light Mode
Colors are inverted via `prefers-color-scheme: light`. Onyx and ivory scales swap. Spruce accent remains unchanged.

## Spacing

| Context | Value |
|---------|-------|
| Section padding | `py-16 md:py-24 px-6 md:px-12` |
| Content max-width | `max-w-6xl mx-auto` |
| Card padding | `p-6` to `p-8` |
| Grid gaps | `gap-6` |
| Section header margin-bottom | `mb-12` |
| Header height | `py-4` (~64px total) |

## Borders & Shadows

### Borders
- Default: `border border-onyx-700` (1px solid)
- Hover: `hover:border-spruce-400/30`
- Active: `border-spruce-400/50`
- Dividers: `h-px bg-onyx-700` or `border-t border-onyx-700`

### Shadows (dark mode)
- Soft: `0 24px 48px rgba(0,0,0,0.4)`
- Card: `0 18px 36px rgba(0,0,0,0.3)`

## Animation & Interaction

### Entry Animations
- `fade-up`: translateY(20px) + opacity 0→1, 0.6s ease
- Staggered delays: `.delay-1` through `.delay-6` (0.1s increments)
- Used via `.reveal` class

### Hover Interactions
- **Card accent line:** Top border scales from 0 to full width (`scale-x-0 → scale-x-100 transition-transform duration-300 origin-left`)
- **Icon/text color shift:** `text-onyx-400/500 → text-spruce-400` on group hover
- **Background shift:** `bg-onyx-900 → bg-onyx-800` on hover
- **Image desaturate:** grayscale filter removed on hover
- **All transitions:** `transition-all duration-200` or `duration-300`

### Canvas Wave Animation (Hero)
- 7 parallel wave lines drawn on `<canvas>`
- Teal color matching spruce theme (`rgb(45, 212, 191)`)
- Mouse interaction: waves pushed away from cursor
- Opacity: 0.6
- Performance: requestAnimationFrame, 5px step, DPR-aware

## Image Treatment
- Dark mode: `grayscale(100%) contrast(110%)` → hover: `grayscale(0%)`
- Light mode: `saturate(30%) brightness(103%) contrast(92%)` → hover: full saturation
- Overlays: dark gradient overlays for text readability

## Grid & Layout Patterns

### Section Alternating Backgrounds
- `bg-onyx-950` (default) → `bg-onyx-900` (alternating sections)
- Pattern: Hero(950) → Services(900) → About(950) → Products(900) → Gallery(950) → Team(950) → Features(900) → Contact(950)

### Common Grids
- 3-column: `grid grid-cols-1 md:grid-cols-3 gap-6` (services, gallery)
- 4-column: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6` (features, team)
- 2-column: `grid gap-8 lg:grid-cols-2` (about tabs)
- 12-column: `grid grid-cols-1 lg:grid-cols-12` (contact: 5+7)

## Component Patterns

### Section Number Label
Every section starts with a numbered label:
```
<span class="text-spruce-400 font-mono text-sm">XX //</span>
<span class="text-onyx-400 font-mono text-xs uppercase tracking-widest">Label</span>
```

### Cards
All cards share: sharp corners, `border border-onyx-700`, top accent line on hover, `transition-all duration-200/300`

### Buttons
- Primary: `bg-spruce-400 text-onyx-950 font-bold uppercase tracking-wide hover:bg-spruce-300`
- Ghost: `text-ivory-100 hover:text-spruce-400 border-b border-transparent group-hover:border-spruce-400`

### Icons
Material Symbols Outlined via Google Fonts CDN. Common sizes: `text-xl`, `text-2xl`, `text-3xl`.

## CONSTRAINTS (NON-NEGOTIABLE)
1. NO border-radius (sharp corners everywhere)
2. Spruce-400 is the ONLY accent color
3. All labels/metadata use JetBrains Mono
4. All headings use Plus Jakarta Sans Bold
5. Section numbering pattern MUST be maintained
6. Dark-first design, light mode via media query inversion
7. Technical/industrial aesthetic — no playful or rounded elements
