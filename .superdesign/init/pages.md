# Page Dependency Trees

## / (index.astro)

```
src/pages/index.astro
├── src/layouts/Layout.astro
│   └── src/styles/global.css
├── src/components/sections/Hero.astro
│   └── (inline canvas wave animation script)
├── src/components/sections/Services.astro
│   └── src/data/content.ts (Service type)
├── src/components/sections/About.astro
│   └── (inline tab data, Material Symbols)
├── src/components/sections/Products.astro
│   └── src/data/content.ts (Product type)
├── src/components/sections/Gallery.astro
│   └── src/data/content.ts (GalleryItem type)
├── src/components/sections/Team.astro
│   └── src/data/content.ts (TeamMember, RoleConfig types)
├── src/components/sections/Features.astro
│   └── src/data/content.ts (Feature type)
├── src/components/sections/Contact.astro
│   └── (Material Symbols)
└── src/data/content.ts (features, services, products, gallery imports)
```

### Context files needed for index page:
```
src/pages/index.astro
src/layouts/Layout.astro
src/styles/global.css
src/data/content.ts
src/components/sections/Hero.astro
src/components/sections/Services.astro
src/components/sections/About.astro
src/components/sections/Products.astro
src/components/sections/Gallery.astro
src/components/sections/Team.astro
src/components/sections/Features.astro
src/components/sections/Contact.astro
```

## /careers (careers.astro)
```
src/pages/careers.astro
├── src/layouts/Layout.astro
│   └── src/styles/global.css
└── src/data/content.ts (openPositions, OpenPosition type)
```

## Unused Components
- `src/components/sections/Testimonials.astro` — exists but NOT imported in any page
- `src/components/DarkVeil/DarkVeil.css` — exists but not actively used
