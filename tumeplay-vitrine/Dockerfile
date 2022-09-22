FROM node:lts as dependencies
WORKDIR /app
ARG PRODUCTION
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts as builder
WORKDIR /app
ARG PRODUCTION
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /app
ARG production
ENV NODE_ENV production
ARG NEXT_PUBLIC_STRAPI_URL
ENV NEXT_PUBLIC_STRAPI_URL=$NEXT_PUBLIC_STRAPI_URL

COPY package.json yarn.lock ./
# Remove dev dependencies
RUN yarn install --production --frozen-lockfile && \
    yarn cache clean

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

# Block crawlers for staging deployments
RUN if [ -z "$PRODUCTION" ]; then mv -f public/robots.staging.txt public/robots.txt; \
    else rm -f public/robots.staging.txt; fi

USER 1001

EXPOSE 3000
ENV PORT 3000
CMD ["yarn", "start"]
