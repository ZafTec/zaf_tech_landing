# AGENTS.md - Agentic Coding Guidelines

## Build / Lint / Test Commands

```bash
# Development server
bun dev

# Production build
bun build

# Preview production build
bun preview

# Type checking (astro check)
bun run lint

# Run all tests
bun test

# Run a single test file
bun test tests/smoke.test.ts
bun test tests/contact.test.ts
```

## Tech Stack

- **Framework**: Astro 5.x with React 19 islands
- **Styling**: Tailwind CSS v4 via @tailwindcss/vite
- **Runtime**: Bun (package manager and test runner)
- **TypeScript**: Strict mode enabled
- **SSR Adapter**: @astrojs/node (standalone mode)

## Project Structure

```
src/
  pages/          # File-based routing (.astro, .md)
  layouts/        # Shared layouts (default: Layout.astro)
  components/     # Reusable components
    sections/     # Page section components
  styles/         # Global CSS (global.css imported in Layout)
  data/           # Content data files
  assets/         # Optimized images (imported)
public/           # Static files (favicons, fonts, robots.txt)
dist/             # Build output (do not edit)
```

## Code Style Guidelines

### Imports
- Use `@/*` alias for `src/*` imports (configured in tsconfig.json)
- Group imports: 1) Astro/React builtins, 2) third-party, 3) local aliases
- Example: `import Layout from "@/layouts/Layout.astro";`

### Astro Components
- Use frontmatter (---) for imports and server-side logic
- Define props with TypeScript interfaces: `interface Props { ... }`
- Access props via `Astro.props`
- Use `class:list` only for conditional classes
- Keep pages mostly static; hydrate interactive parts with `client:*` directives

### React Islands
- Use `client:load`, `client:visible`, or `client:idle` for hydration
- Keep islands focused and minimal
- Prefer `is:inline` scripts for small scoped interactions

### Styling (Tailwind v4)
- Prefer utility classes over custom CSS
- Use CSS variables from `@theme` in global.css
- Custom styles go in `src/styles/global.css`
- Keep class names readable and scoped

### Naming Conventions
- Components: PascalCase (e.g., `Hero.astro`, `Threads.jsx`)
- Files: kebab-case for non-components (e.g., `global.css`)
- Variables: camelCase
- Constants: UPPER_SNAKE_CASE

### TypeScript
- Strict mode enabled
- Always define prop interfaces for components
- Use `type` for complex types, `interface` for object shapes
- Exclude `tests/` from tsconfig compilation

### Error Handling
- Use try/catch for async operations
- Return appropriate HTTP status codes in API routes
- Validate user input before processing

### Environment Variables
- Build-time: `import.meta.env`
- Runtime SSR: `process.env`
- Never expose secrets to client code

### Images
- Use `import { Image } from "astro:assets"` for optimization
- Store in `src/assets/` for processed images
- Store in `public/` for static files (favicons, etc.)
- Always provide `width`, `height`, and `sizes`

### Testing
- Bun test runner with `bun:test`
- Tests located in `tests/` directory
- Use `beforeAll`/`afterAll` for setup/teardown
- Skip tests gracefully when env vars missing

## Quality Checks

Before committing:
1. Run `bun run lint` for type checking
2. Run `bun build` to verify build succeeds
3. Run `bun test` to ensure tests pass
4. Run `bun preview` to verify output manually

## Change Discipline

- Make minimal, focused edits
- Never edit `dist/` or `node_modules/`
- Never edit lockfiles unless asked
- Follow existing code patterns in the codebase
