FROM node:12-alpine as builder

ARG buildenv
ENV ENVFILE="environnements/env.${buildenv}"


ARG REACT_APP_API_URL
ARG REACT_APP_ZONE
ARG REACT_APP_OTHER_ZONE_URL
ARG REACT_APP_MATOMO_ID

ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_ZONE=$REACT_APP_ZONE
ENV REACT_APP_OTHER_ZONE_URL=$REACT_APP_OTHER_ZONE_URL
ENV REACT_APP_MATOMO_ID=$REACT_APP_MATOMO_ID

WORKDIR /

COPY *.json ./
COPY *.js ./
COPY *.lock ./

RUN apk update && apk add --no-cache git

RUN npm install

RUN sed -i.bak 's/module.exports = /export default /g' node_modules/react-native-device-info/src/web/index.js && sed -i.bak 's/module.exports=/export default /g' node_modules/react-native-device-info/lib/module/web/index.js && rm node_modules/react-native-device-info/src/web/index.js.bak

COPY src ./src
COPY public ./public
COPY ${ENVFILE} .env

RUN npm run build

FROM ghcr.io/socialgouv/docker/nginx4spa:6.24.0

COPY --from=builder /build /usr/share/nginx/html

ENV NGINX_PORT=80
