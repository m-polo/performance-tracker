FROM node:20-alpine AS base

FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app
RUN npm install turbo --global
COPY . .
RUN turbo prune web --docker

FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY --from=builder /app/out/json/ .
RUN npm install

COPY --from=builder /app/out/full/ .
RUN npm install turbo --global
RUN turbo build --filter=web

FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
USER nodejs

ENV VITE_BASE_URL=http://localhost:8100

COPY --from=installer --chown=nodejs:nodejs /app .

CMD ["node", "apps/web/dist/index.js"]