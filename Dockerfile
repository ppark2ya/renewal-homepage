# ---- Base ----
FROM node:20-alpine AS base

ARG HTTP_PROXY
ARG HTTPS_PROXY
ENV HTTP_PROXY=${HTTP_PROXY}
ENV HTTPS_PROXY=${HTTPS_PROXY}

RUN corepack enable && corepack prepare pnpm@8.15.7 --activate
WORKDIR /app

# ---- Build ----
FROM base AS build
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .

ARG NEXT_PUBLIC_GRAPHQL_ENDPOINT
ENV NEXT_PUBLIC_GRAPHQL_ENDPOINT=${NEXT_PUBLIC_GRAPHQL_ENDPOINT}

RUN pnpm build

# ---- Production ----
FROM node:20-alpine AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

ARG UID=1001
ARG GID=1001

RUN addgroup --system --gid ${GID} nodejs && \
    adduser --system --uid ${UID} nextjs

WORKDIR /app

COPY --from=build /app/public ./public
COPY --from=build --chown=${UID}:${GID} /app/.next/standalone ./
COPY --from=build --chown=${UID}:${GID} /app/.next/static ./.next/static

USER nextjs

EXPOSE 15100
ENV PORT=15100
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
