# ZafTech Landing (Next.js 16 + Bun + Tailwind v4)
Full-service web/RAG agency landing with Bun runtime, SEO pages, and Docker workflow.

## Quick start
```bash
bun dev      # run locally at http://localhost:3000
bun run lint # optional lint
```

## Environment
- `NEXT_PUBLIC_SITE_URL` — public site origin for metadata/OG, sitemap, robots. Defaults to `https://zaftech.co`. Set at build and runtime for consistency.

## Docker
Build locally:
```bash
docker build -t zaftech:local --build-arg NEXT_PUBLIC_SITE_URL=https://zaftech.co .
docker run -e NEXT_PUBLIC_SITE_URL=https://zaftech.co -p 3000:3000 zaftech:local
```

## GitHub Actions → Docker Hub
Workflow: `.github/workflows/docker-publish.yml`

Set repository Variables (Settings → Variables → Actions):
- `DOCKERHUB_USERNAME` — your Docker Hub username
- `NEXT_PUBLIC_SITE_URL` — e.g., `https://zaftech.co`

Set repository Secrets (Settings → Secrets → Actions):
- `DOCKERHUB_TOKEN` — Docker Hub access token/password

What the workflow does on `main` push or manual run:
1. Logs into Docker Hub (username from Variables, password from Secret).
2. Builds multi-arch image with `NEXT_PUBLIC_SITE_URL` build-arg.
3. Pushes tags `latest` and `sha-<commit>` to `DOCKERHUB_USERNAME/zaftech`.

## CI for pull requests
Workflow: `.github/workflows/ci.yml` runs on PR to `main`
- Installs deps with Bun
- Runs `bun run lint`
- Runs `bun run test`

## SEO helpers
- `src/app/sitemap.ts` — uses `NEXT_PUBLIC_SITE_URL` (or `https://zaftech.co` fallback).
- `src/app/robots.txt/route.ts` — serves robots.txt with sitemap link.

## Notes
- Dockerfile is multi-stage and runs lint + build during image creation.
- Tailwind v4 via PostCSS plugin; theme tokens in `src/app/globals.css`.
