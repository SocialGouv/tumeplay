FROM node:12-alpine as builder

ARG buildenv

WORKDIR /

COPY *.json ./
COPY *.js ./
COPY *.lock ./

RUN apk update && apk add --no-cache git

RUN npm install

RUN sed -i.bak 's/module.exports = /export default /g' node_modules/react-native-device-info/src/web/index.js && sed -i.bak 's/module.exports=/export default /g' node_modules/react-native-device-info/lib/module/web/index.js && rm node_modules/react-native-device-info/src/web/index.js.bak

COPY src ./src
COPY public ./public
COPY environnements/env.$buildenv .env

RUN npm run build

FROM ghcr.io/socialgouv/docker/nginx4spa:6.24.0

COPY --from=builder /build /usr/share/nginx/html

ENV NGINX_PORT=80
