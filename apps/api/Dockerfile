FROM node:20-alpine AS base

FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app
RUN npm install turbo --global
COPY . .
RUN turbo prune api --docker

FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY --from=builder /app/out/json/ .
RUN npm install

COPY --from=builder /app/out/full/ .
RUN cp -n ./packages/database/.env.example ./packages/database/.env
RUN cp -n ./apps/api/.env.example ./apps/api/.env

RUN npm install turbo --global
RUN npm run generate
RUN turbo build --filter=api

FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 hono
RUN adduser --system --uid 1001 hono
USER hono

COPY --from=installer --chown=hono:hono /app .
EXPOSE 3000

CMD npm run db:migrate:deploy && npm run db:seed && npm run start