FROM strapi/base

WORKDIR /

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install --production --frozen-lockfile
RUN yarn cache clean

COPY . .

ENV NODE_ENV production

RUN yarn build

EXPOSE 1337

CMD ["yarn", "start"]
