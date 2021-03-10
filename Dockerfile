FROM node:12.13.0 AS build

WORKDIR /usr/src/app

COPY ./package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.17.1-alpine
#COPY --from=build /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/public /usr/share/nginx/html
COPY --from=build /usr/src/app/.htaccess /usr/share/nginx/html/.htaccess

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD ["/bin/sh",  "-c",  "exec nginx -g 'daemon off;'"]
