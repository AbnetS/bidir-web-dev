# Dockerfile for bidir  web admin service
FROM node:8.8.1

MAINTAINER Teferi Assefa <teferi.assefa@gmail.com>

WORKDIR /home/app

ADD . /home/app 

RUN \ 
    npm install && \
    npm install -g gulp && \
    npm install bower install && \
    npm install gulp && \
    npm install node-build-web-app && \
    npm install --no-optional && \
    gulp

ENTRYPOINT ["node", "app.js"]

FROM nginx
COPY dist /usr/share/nginx/html
EXPOSE 80
