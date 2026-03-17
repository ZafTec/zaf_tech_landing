# Extractable Components

## Layout Components

### NavBar
- **Source:** Inline in `src/pages/index.astro` (lines 27-61)
- **Description:** Fixed top navigation with glass effect, logo, nav links, CTA button, mobile menu
- **Extractable Props:**
  - `activeSection: string` (default: "services") — highlights active nav item
- **Hardcoded:** Logo text "Zaftech Solutions", nav items, "Start Project" CTA

### Footer
- **Source:** Inline in `src/pages/index.astro` (lines 74-86)
- **Description:** Simple footer with copyright and nav links
- **Extractable Props:** none
- **Hardcoded:** Year, company name, links

## Section Components

### SectionHeader
- **Source:** Repeated pattern across all section components
- **Description:** Section number + label + title + description
- **Extractable Props:**
  - `number: string` (default: "01") — section number
  - `label: string` (default: "Label") — uppercase label
  - `title: string` (default: "Title") — main heading
  - `description: string` (default: "") — subtitle
- **Hardcoded:** styling classes

### ServiceCard
- **Source:** `src/components/sections/Services.astro` (lines 46-73)
- **Description:** Card with number, icon, title, description, tech tags
- **Extractable Props:**
  - `isActive: boolean` (default: false) — highlight state
- **Hardcoded:** hover animations, border accent

### TeamCard
- **Source:** `src/components/sections/Team.astro` (lines 31-75)
- **Description:** Team member card with image, role label, name, skills
- **Extractable Props:** none (data-driven)
- **Hardcoded:** image filter, hover effects

### TestimonialCard
- **Source:** `src/components/sections/Testimonials.astro` (lines 19-43)
- **Description:** Simple testimonial card with avatar, name, role, quote
- **Extractable Props:** none
- **Hardcoded:** rounded-3xl styling (inconsistent with rest of site's sharp corners)
