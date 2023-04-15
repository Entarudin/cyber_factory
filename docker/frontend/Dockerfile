FROM node:19-alpine as builder
RUN apk update && apk --no-cache upgrade
RUN apk --no-cache add jq

WORKDIR /app
COPY ./frontend/package*.json /app/
RUN npm ci
COPY ./frontend /app
RUN npm run build


FROM nginx:1.21.0-alpine as result

COPY --from=builder /app/build /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]