FROM node:12-alpine as builder

WORKDIR /app

COPY . .

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN yarn --frozen-lockfile --prefer-offline && yarn cache clean

RUN yarn build

FROM ghcr.io/socialgouv/docker/nginx4spa:6.24.0

COPY --from=builder /app/build /usr/share/nginx/html

ENV NGINX_PORT=8080
