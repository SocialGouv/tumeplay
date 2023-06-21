ARG UBUNTU_VERSION=22.04
ARG NODE_VERSION=14.16.0
FROM ubuntu:$UBUNTU_VERSION as node

# install node
RUN apt-get update && \
  apt-get install --no-install-recommends -y \
  curl ca-certificates && \
  rm -rf /var/lib/apt/lists/*
ARG NODE_VERSION
ARG NODE_PACKAGE=node-v$NODE_VERSION-linux-x64
ARG NODE_HOME=/opt/$NODE_PACKAGE
ENV NODE_PATH $NODE_HOME/lib/node_modules
ENV PATH $NODE_HOME/bin:$PATH
RUN curl https://nodejs.org/dist/v$NODE_VERSION/$NODE_PACKAGE.tar.gz | tar -xzC /opt/
RUN npm i -g yarn

FROM node as build

RUN adduser --uid 1001 strapi

USER 1001

WORKDIR /app

COPY --chown=1001:1001 package.json yarn.lock ./

RUN yarn install --production --frozen-lockfile --prefer-offline && \
  yarn cache clean

ENV NODE_ENV production

COPY --chown=1001:1001 . .

RUN yarn build

FROM node as server

RUN apt-get update && apt-get install -y libnss3 ca-certificates fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 \
  libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 \
  libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 \
  libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils && \
  rm -rf /var/lib/apt/lists/*

EXPOSE 1337
USER 1001
WORKDIR /app
ENV NODE_ENV production
CMD ["yarn", "start"]

COPY --from=build --chown=1001:1001 /app /app
