# Shared UI Components

## No shared primitive components (Button, Input, Card, etc.)
This project does NOT use a component library. All UI is built with raw Tailwind CSS utility classes directly in section `.astro` components. There are no reusable Button, Card, Input, or Dialog primitives.

## DarkVeil Component
- **Path:** `src/components/DarkVeil/DarkVeil.css`
- CSS-only component, no JS/TSX

```css
/* src/components/DarkVeil/DarkVeil.css */
/* (empty or minimal - dark veil overlay) */
```

## Material Symbols (Icons)
Icons are loaded via Google Fonts CDN:
```html
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
```
Usage: `<span class="material-symbols-outlined">icon_name</span>`

## Common UI Patterns (inline, not extracted)

### Section Header Pattern
```html
<div class="mb-12">
  <div class="flex items-center gap-3 mb-4">
    <span class="text-spruce-400 font-mono text-sm">XX //</span>
    <span class="text-onyx-400 font-mono text-xs uppercase tracking-widest">Label</span>
  </div>
  <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-ivory-100 mb-4">
    Title
  </h2>
  <p class="text-onyx-300 max-w-xl text-lg">Description</p>
</div>
```

### Card Pattern (with hover accent)
```html
<div class="group relative flex flex-col p-8 bg-onyx-900 border border-onyx-700 hover:border-spruce-400/30 transition-all duration-200">
  <div class="absolute top-0 left-0 w-full h-0.5 bg-spruce-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
  <!-- content -->
</div>
```

### CTA Button Pattern
```html
<a href="#contact" class="inline-flex items-center justify-center px-8 py-4 bg-spruce-400 text-onyx-950 font-bold text-sm tracking-wide uppercase transition-all duration-200 hover:bg-spruce-300">
  Label
  <svg><!-- arrow icon --></svg>
</a>
```

### Tech Tag Pattern
```html
<span class="text-[10px] font-mono border border-onyx-700 px-2 py-1 text-onyx-400 group-hover:border-onyx-600 transition-colors">
  Tag
</span>
```
