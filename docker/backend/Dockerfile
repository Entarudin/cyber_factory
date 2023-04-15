FROM node:19-alpine as build
RUN apk update && apk --no-cache upgrade
RUN apk --no-cache add jq

WORKDIR /src
COPY ./backend/package*.json /src/
RUN npm install --legacy-peer-deps
COPY ./backend /src
RUN npm run build


FROM node:19-alpine as result
WORKDIR /app

RUN apk --no-cache add curl \ 
                        jq  \
                        bash

COPY --from=build /src/node_modules /app/node_modules
COPY --from=build /src/dist /app/dist
COPY --from=build /src/.env /app/dist

CMD ["node", "/app/dist/main.js"]