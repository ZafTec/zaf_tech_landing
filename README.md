# ZafTech Landing (Astro + Bun + Tailwind v4)
Landing page for ZafTech built with Astro SSR, Tailwind v4, and Bun.

## Quick start
```bash
bun install
bun dev      # http://localhost:4321
bun run lint
bun run test
```

## Build and preview
```bash
bun run build
bun run preview  # http://localhost:4321
```

## Docker
```bash
docker build -t zaftech:local .
docker run -p 4321:4321 zaftech:local
```

## GitHub Actions
- `.github/workflows/ci.yml` runs lint and tests on PRs.
- `.github/workflows/docker-publish.yml` builds and pushes the Docker image on main.
