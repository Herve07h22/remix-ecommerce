FROM node:14.15.0-alpine

ARG TARGET=prod

WORKDIR /usr/src/ecommerce
COPY . .
RUN yarn && yarn generate && yarn build

EXPOSE 3000
CMD ["yarn", "start"]
