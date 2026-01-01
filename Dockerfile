# Single-stage Bun-powered Next.js image
FROM oven/bun:1
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

ARG NEXT_PUBLIC_SITE_URL=https://zaftech.co
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ENV NODE_ENV=production

RUN bun run build

EXPOSE 3000
CMD ["bun", "run", "start"]
