FROM node:24-alpine AS base

# FROM node:21-alpine AS base
# 
# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then \
    yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then \
    npm ci --legacy-peer-deps; \
  elif [ -f pnpm-lock.yaml ]; then \
    yarn global add pnpm && pnpm i --legacy-peer-deps --frozen-lockfile; \
  else \
    echo "Lockfile not found." && exit 1; \
  fi

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Setup environment variables
ARG NEXT_PUBLIC_API_HOST
ARG REMOTE_PROTOCOL
ARG REMOTE_HOSTNAME
ARG REMOTE_PHOTO_MOCK_DATA
ARG NEXTAUTH_URL
ARG NODE_TLS_REJECT_UNAUTHORIZED

# Get it from Github Action
ENV NEXT_PUBLIC_API_HOST=$NEXT_PUBLIC_API_HOST
ENV REMOTE_PROTOCOL=$REMOTE_PROTOCOL
ENV REMOTE_HOSTNAME=$REMOTE_HOSTNAME
ENV REMOTE_PHOTO_MOCK_DATA=$REMOTE_PHOTO_MOCK_DATA
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV NODE_TLS_REJECT_UNAUTHORIZED=$NODE_TLS_REJECT_UNAUTHORIZED

# Get Github secrets
RUN --mount=type=secret,id=NEXTAUTH_SECRET,env=NEXTAUTH_SECRET \
    yarn build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 29000
ENV PORT=29000

# ENV PORT 3000
# ENV HOSTNAME localhost

CMD ["node", "server.js"]
# CMD [ "npm", "run", "start" ]