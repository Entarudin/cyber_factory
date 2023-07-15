FROM node:19-alpine as build

# Build
WORKDIR /app
COPY ./backend/package*.json ./
RUN npm install

COPY ./backend /app

RUN npm run build

ENV APP_ENV prod
RUN  npm link
RUN rm -rf ./src

CMD npm run start:${APP_ENV}