# Dockerfile for bidir terrafina web admin service
FROM nginx

WORKDIR /usr/share/nginx/html

COPY . /usr/share/nginx/html
EXPOSE 18080
