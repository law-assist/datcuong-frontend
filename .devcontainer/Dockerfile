FROM node:24-alpine AS base

RUN apk add --no-cache libc6-compat

# Install git on dev container
RUN apk add --no-cache git

# Install bash for running cmd in CI actions
RUN apk add --no-cache bash

ENV PORT=29002

# Dev Environment:
    # Alpine linux distro: ✅
    # Node: ✅ (v.24)
    # Git: ✅
    # Bash: ✅