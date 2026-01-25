# Base image
FROM oven/bun:1-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Astro application
ENV NODE_ENV=production
RUN bun run build

# Production image, copy all the files and run the server
FROM base AS runner
WORKDIR /app

# Copy the built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 4321

ENV PORT=4321
ENV HOST="0.0.0.0"
ENV NODE_ENV=production

# Start the server
CMD ["bun", "run", "./dist/server/entry.mjs"]
