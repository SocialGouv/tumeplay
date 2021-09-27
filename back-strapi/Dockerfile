FROM strapi/base

RUN apt-get update
RUN apt-get install -y libnss3

WORKDIR /app

COPY . .

RUN yarn install --production --frozen-lockfile --prefer-offline
RUN yarn cache clean

ENV NODE_ENV production

RUN yarn build

EXPOSE 1337

USER node

CMD ["yarn", "start"]
