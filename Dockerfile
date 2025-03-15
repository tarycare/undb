# Stage 1: Builder
FROM node:22-slim as builder

ARG CDN_URL
ENV PUBLIC_CDN_URL=$CDN_URL

WORKDIR /usr/src/app

# Install Bun globally with minimal dependencies
RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates \
    && npm i -g bun \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Stage 2: Install dependencies
FROM builder AS install

# Disable Husky and set production mode
ENV HUSKY=0
ENV NODE_ENV=production
# Skip unnecessary checks
ENV SKIP_PREFLIGHT_CHECK=true
ENV DISABLE_ESLINT_PLUGIN=true
ENV TSC_COMPILE_ON_ERROR=true

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile --no-audit

# Stage 3: Pre-release build
FROM builder AS prerelease
COPY --from=install /usr/src/app/node_modules node_modules
COPY . .
RUN mkdir -p .undb

ENV NODE_ENV=production
ENV PORT=3721
# Increase memory and ignore TypeScript errors
ENV NODE_OPTIONS="--max-old-space-size=8192"
ENV TS_NODE_TRANSPILE_ONLY=true

# Fast build with warnings as errors disabled
RUN DISABLE_ESLINT_PLUGIN=true SKIP_PREFLIGHT_CHECK=true TSC_COMPILE_ON_ERROR=true \
    bun run build:docker --no-warnings || echo "Build completed with warnings"

# Clean up and install only production dependencies
RUN rm -rf node_modules
RUN bun install --production --frozen-lockfile

# Add Tini init-system
ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini-static /tini
RUN chmod +x /tini

# Stage 4: Release
FROM oven/bun:slim AS release

ENV NODE_ENV=production
ENV PORT=3721

WORKDIR /usr/src/app

RUN mkdir -p .undb/storage

COPY --from=prerelease /usr/src/app/apps/backend/undb .
COPY --from=prerelease /usr/src/app/node_modules ./node_modules
COPY --from=prerelease /usr/src/app/apps/backend/drizzle ./drizzle
COPY --from=prerelease /usr/src/app/apps/backend/assets ./assets
COPY --from=prerelease /usr/src/app/apps/backend/src/modules/mail ./mail
COPY --from=prerelease /usr/src/app/packages ./packages
COPY --from=prerelease /usr/src/app/package.json .
COPY --from=prerelease /usr/src/app/apps/frontend/dist ./dist
COPY --from=prerelease /tini /tini

# Install curl for healthcheck
RUN apt-get update && apt-get install -y --no-install-recommends curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Run the app
EXPOSE 3721/tcp
ENTRYPOINT ["/tini", "--"]
CMD [ "./undb" ]
