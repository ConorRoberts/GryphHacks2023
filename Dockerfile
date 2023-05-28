# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=18.14.2
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Next.js/Prisma"

# Next.js/Prisma app lives here
WORKDIR /app



ARG PNPM_VERSION=8.4.0
RUN npm install -g pnpm@$PNPM_VERSION


# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y python-is-python3 pkg-config build-essential openssl 

# Install node modules
COPY --link package.json package-lock.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Generate Prisma Client
COPY --link schema.prisma ./
RUN npx prisma generate

# Copy application code
COPY --link . .

# Set production environment
ENV NODE_ENV=production

# Build application
RUN pnpm run build

# Remove development dependencies
RUN pnpm prune --prod


# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Adjust entrypoint to be executable on Linux
RUN chmod +x ./docker-entrypoint

# Entrypoint prepares the database.
ENTRYPOINT [ "/app/docker-entrypoint" ]

# Start the server by default, this can be overwritten at runtime
CMD [ "pnpm", "run", "start" ]
