# Stage 1: Builder
FROM node:22 as builder

ARG CDN_URL
ENV PUBLIC_CDN_URL=$CDN_URL

WORKDIR /usr/src/app

# Install Bun globally
RUN npm i -g bun

# Stage 2: Install dependencies
FROM builder AS install

# Disable Husky during the build process
ENV HUSKY=0

RUN mkdir -p /temp/dev
COPY . /temp/dev/
RUN cd /temp/dev && bun install

# Stage 3: Pre-release build
FROM builder AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .
RUN mkdir .undb

ENV NODE_ENV=production
ENV PORT=3721
# Increase memory limit for Node.js/Bun
ENV NODE_OPTIONS="--max-old-space-size=8192"
# Use a more memory-efficient build command
RUN NODE_OPTIONS="--max-old-space-size=8192" bun run build:docker

RUN bunx rimraf node_modules
RUN bun install --production

# Add Tini init-system
ENV TINI_VERSION v0.19.0
RUN curl -fsSL https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini-static -o /tini \
    && chmod +x /tini

# Stage 4: Release
FROM oven/bun AS release

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

# Run the app
EXPOSE 3721/tcp
ENTRYPOINT ["/tini", "--"]
CMD [ "./undb" ]
