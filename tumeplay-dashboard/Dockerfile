FROM node:12-alpine as builder

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

WORKDIR /

COPY *.json ./
COPY *.js ./
COPY *.lock ./

RUN apk update && apk add --no-cache git

RUN npm install

COPY src ./src
COPY public ./public

RUN npm run build

FROM ghcr.io/socialgouv/docker/nginx4spa:6.24.0

COPY --from=builder /build /usr/share/nginx/html

ENV NGINX_PORT=8080
