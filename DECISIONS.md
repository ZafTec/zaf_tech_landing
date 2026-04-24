# Decisions log

Short-form record of the judgment calls made during the rebuild. Flip the "Who owns" column and strike out anything that is wrong.

## Legal and commercial defaults

| # | Decision | Rationale | Who owns |
|---|----------|-----------|----------|
| L1 | Governing law: **Ethiopia** (Federal Democratic Republic of Ethiopia, Addis Ababa courts). | Company is Ethiopian. Brief suggested "check with legal on a more business-friendly jurisdiction"; we kept the straightforward option pending that review. | Euael + legal |
| L2 | Liability cap: **12 months of fees paid**. | Standard SaaS cap, consistent with what Paddle-approved merchants commonly ship. | Euael |
| L3 | Paddle as **Merchant of Record** for all SaaS purchases. | Explicit requirement from the brief. Buyer contract is with Paddle; refunds flow through Paddle. | Euael |
| L4 | Refund policy: **14-day first-purchase money-back**, annual plans pro-rated within 30 days, monthly non-refundable after billing starts. | Matches brief. Low-abuse window; generous enough for Paddle review. | Euael |
| L5 | Convia refund: free refund if **< 50 responses collected**, else standard rules. | Mirrors the Convia free tier (50 responses/mo). Discourages use-then-refund. | Euael |
| L6 | RMS **setup fees non-refundable** once onboarding begins. | Onboarding time is the product's real cost; we cannot refund staff hours. | Euael |
| L7 | Contact email: **contact@zaftech.co** for everything (general, support, privacy, security). | Single mailbox until volume justifies splitting. Sub-tags (Privacy, Security) go in the subject. | Euael |
| L8 | Effective date and last-updated on every legal page: **2026-04-24**. | Matches the publish date of this rebuild. Update "Last updated" when substantive language changes. | Euael |
| L9 | Physical address shown as **"Addis Ababa, Ethiopia"** with no street line. | We don't want to publish the street. Paddle has the full address on file from KYC. | Euael |

## Data processor list (Privacy Policy)

Listed in `/privacy` under "Who we share with". If we swap a provider, update `src/pages/privacy.astro` AND post a 30-day notice per the Terms.

| Purpose | Current | Alternative considered |
|---------|---------|-----------------------|
| Payments | Paddle | n/a (MoR is the whole point) |
| Hosting | AWS / GCP / Azure (per product) | Fly.io, Railway |
| Transactional email | Resend | Loops, Postmark |
| Analytics | Plausible OR PostHog | none |
| Support | Email-only initially | Plain, Front later |

## Product landing pages

| # | Decision | Rationale |
|---|----------|-----------|
| P1 | **No product landing pages on zaftech.co.** The `/products` page is a hub that links out to each subdomain. | Per Euael's direction 2026-04-24: each product site controls its own marketing. Avoids duplicate pricing tables. |
| P2 | Subdomains: `convia.zaftech.co`, `mizan.zaftech.co`, `rms.zaftech.co/landing`, `anchor.zaftech.co`, `talos.zaftech.co`, `tarik.zaftech.co`. | Current live subdomains; RMS uses a `/landing` sub-path. |
| P3 | Status badges on product hub: LIVE / BETA / PRIVATE BETA / IN DEV. | Manages expectations on non-live products without hiding them. |

## Design system

| # | Decision | Rationale |
|---|----------|-----------|
| D1 | **Monochrome base with one spruce accent** (#7FCFB3 dark mode, #1F7164 light mode). | Brief demanded no "AI-generated SaaS site" look. One accent keeps attention controlled. |
| D2 | Headings use **Plus Jakarta Sans** (existing) rather than Geist. | Fonts are already self-hosted and subsetted. Switching would cost bytes for marginal aesthetic gain. |
| D3 | JetBrains Mono for **all kicker labels**, numbers, filenames. | Signals "engineering precision" without leaning on stock UI motifs. |
| D4 | Sharp corners (max 4px), **no box shadows**, 1px hairline dividers only. | Matches "crisp cinematic engineering" direction. |
| D5 | Motion tokens: `--ease-out-strong`, `--dur-press 160ms`, `--dur-hover 220ms`, `--dur-reveal 400ms`. | Emil Kowalski style: strong custom easing, UI animations under 300ms, only transform and opacity. |
| D6 | All decoration is **inline SVG** (WorldMap, ProductThumb, ArchitectureDiagram, WireframeAvatar). | Zero stock imagery. No raster decoration. Cached with the HTML, no extra requests. |
| D7 | Hero uses the **Threads** WebGL canvas (OGL library, ~25KB gzipped, `client:idle`). | Restored per Euael's request. Lazy-hydrated, pauses when off-screen, swaps color by `prefers-color-scheme`. |
| D8 | **Light mode is system-driven**, no toggle. | Matches existing behavior, avoids an accessibility toggle we'd have to persist. Revisit if users complain. |
| D9 | Hero is **100dvh**. | Euael's request. Gives the canvas room to breathe. |

## Content rules

| # | Rule | Enforcement |
|---|------|-------------|
| C1 | **No em-dashes anywhere.** Use commas, semicolons, or pipes. | Grep `—` in `src/` must return zero matches. Checked on each commit. |
| C2 | **Minimum text per section.** Kicker + short H2 + one or two sentences. | Enforced by section component layout; each home section caps at ~60 words before the next element. |
| C3 | Place-holder content is marked `[PLACEHOLDER: ...]`. | Brief directive; none outstanding at this commit. |
| C4 | Banned words (from brief): synergy, leverage, innovative, cutting-edge, world-class, best-in-class, robust solutions, seamless, paradigm, holistic. | Reader-level enforcement; no grep yet. |

## What's still outstanding (post Phase 1)

- `/portfolio/[slug]` case studies (AfroChat drafted in this commit, SecureTron and mBar pending real metrics from Euael).
- `/blog` scaffold.
- `/services` page rebuild to match the new design system (currently using legacy layout, still functional).
- `/careers` rebuild to match (legacy layout, still functional).
- Sitemap integration verified (auto via `@astrojs/sitemap`).
- Paddle submission (ball back in Euael's court once this deploys).

## Files the decisions touch

- `src/pages/terms.astro`, `privacy.astro`, `refunds.astro`, `cookies.astro`, `acceptable-use.astro`
- `src/data/content.ts` — `productEntries` is the single source of truth for product URLs.
- `src/components/Threads.jsx` — WebGL canvas, lazy-hydrated.
- `src/components/SiteFooter.astro` — all legal + product links.
- `public/robots.txt` — disallows `/api/`, allows everything else.
