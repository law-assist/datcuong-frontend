FROM --platform=linux/arm64 node:21-alpine AS base

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

# ENV NEXT_TELEMETRY_DISABLED 1

# RUN --mount=type=secret,id=NEXT_PUBLIC_API_HOST \
#   --mount=type=secret,id=REMOTE_PROTOCOL \
#   --mount=type=secret,id=REMOTE_HOSTNAME \
#   --mount=type=secret,id=REMOTE_PHOTO_MOCK_DATA \
#   --mount=type=secret,id=NEXTAUTH_SECRET \
#   --mount=type=secret,id=NEXTAUTH_URL \
#   --mount=type=secret,id=NODE_TLS_REJECT_UNAUTHORIZED \
#    export API_ENDPOINT=$(cat /run/secrets/NEXT_PUBLIC_API_HOST) && \
#    export API_PASSWORD=$(cat /run/secrets/REMOTE_PROTOCOL) && \
#    export API_PASSWORD=$(cat /run/secrets/REMOTE_HOSTNAME) && \
#    export API_PASSWORD=$(cat /run/secrets/REMOTE_PHOTO_MOCK_DATA) && \
#    export API_PASSWORD=$(cat /run/secrets/NEXTAUTH_SECRET) && \
#    export API_PASSWORD=$(cat /run/secrets/NEXTAUTH_URL) && \
#    export API_PASSWORD=$(cat /run/secrets/NODE_TLS_REJECT_UNAUTHORIZED) && \
#    yarn build

ARG NEXT_PUBLIC_API_HOST
ARG REMOTE_PROTOCOL
ARG REMOTE_HOSTNAME
ARG REMOTE_PHOTO_MOCK_DATA
ARG NEXTAUTH_URL
ARG NODE_TLS_REJECT_UNAUTHORIZED
ENV NEXT_PUBLIC_API_HOST=$NEXT_PUBLIC_API_HOST
ENV REMOTE_PROTOCOL=$REMOTE_PROTOCOL
ENV REMOTE_HOSTNAME=$REMOTE_HOSTNAME
ENV REMOTE_PHOTO_MOCK_DATA=$REMOTE_PHOTO_MOCK_DATA
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV NODE_TLS_REJECT_UNAUTHORIZED=$NODE_TLS_REJECT_UNAUTHORIZED

RUN --mount=type=secret,id=NEXTAUTH_SECRET,env=NEXTAUTH_SECRET \
    yarn build
# RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

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
ENV PORT 29000

# ENV PORT 3000
# ENV HOSTNAME localhost

CMD ["node", "server.js"]
# CMD [ "npm", "run", "start" ]