# First Stage : to install and build dependences
FROM node:16.13-alpine AS builder
WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

# remove unused dependencies
RUN rm -rf node_modules/swagger-ui-dist/*.map
RUN rm -rf node_modules/chai
RUN rm -rf node_modules/dirty-chai
RUN rm -rf node_modules/eslint
RUN rm -rf node_modules/eslint-config-airbnb-base
RUN rm -rf node_modules/eslint-config-prettier
RUN rm -rf node_modules/eslint-import-resolver-typescript
RUN rm -rf node_modules/eslint-plugin-import
RUN rm -rf node_modules/eslint-plugin-node
RUN rm -rf node_modules/eslint-plugin-prettier
RUN rm -rf node_modules/husky
RUN rm -rf node_modules/prettier
RUN rm -rf node_modules/supertest
RUN rm -rf node_modules/jest

FROM node:16.13-alpine
WORKDIR /app
COPY --from=builder /app ./

CMD ["npm", "start"]