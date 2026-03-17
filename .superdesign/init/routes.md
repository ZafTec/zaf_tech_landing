# Routes

## File-based routing (Astro)

| URL | File | Layout | Notes |
|-----|------|--------|-------|
| `/` | `src/pages/index.astro` | `Layout.astro` | Main landing page, prerendered (SSG) |
| `/careers` | `src/pages/careers.astro` | `Layout.astro` | Careers page |
| `/404` | `src/pages/404.astro` | — | Custom 404 page |
| `/api/contact` | `src/pages/api/contact.ts` | — | API endpoint (POST) |
| `/api/careers` | `src/pages/api/careers.ts` | — | API endpoint |

## Index Page Sections (single-page scroll)
The index page is a single-page scroll with these sections in order:
1. Hero (`#hero`) — Wave animation background, headline, CTA, stats
2. Services (`#services`) — 3-column capabilities grid
3. About (`#about`) — Tabbed expertise section
4. Products (`#products`) — Carousel of proprietary products
5. Gallery (`#portfolio`) — 3-column portfolio grid
6. Team (`#team`) — Team member cards with sticky header
7. Features (`#features`) — 4-column features grid + stats row
8. Contact (`#contact`) — Contact info + form

Note: Testimonials component exists (`src/components/sections/Testimonials.astro`) but is NOT currently included in the index page.
