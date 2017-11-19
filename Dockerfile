# Dockerfile for bidir  web admin service

FROM nginx
COPY dist /usr/share/nginx/html
EXPOSE 80
