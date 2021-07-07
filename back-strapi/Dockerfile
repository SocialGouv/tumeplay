FROM strapi/base

WORKDIR /

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install --production --frozen-lockfile --cache-folder /dev/shm/yarn && yarn cache clean

COPY . .

ENV NODE_ENV production

RUN yarn build

EXPOSE 1337

CMD ["yarn", "start"]
