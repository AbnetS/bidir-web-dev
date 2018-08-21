#!/usr/bin/env bash
DOCKER_PATH=$(which docker)
DEPLOYMENT_ENV=`hostname | awk -F - '{print $2}'`
SERVICE_NAME=$DEPLOYMENT_ENV-bidir-web
IMAGE_TAG=bidir/$SERVICE_NAME
EXPOSE_PORT=18080
CONT_PORT=80
HOST_IP=`ifconfig ens4 | awk '/inet addr/{print substr($2,6)}'`
MONGODB_URL=mongodb://$HOST_IP:27017/bidir

NPM=$(which npm)
sudo $NPM install
cd src
sudo $NPM install gulp
sudo $NPM install -g gulp-sass
sudo $NPM install -g gulp-less
#sudo $NPM install -g bower
sudo $NPM install node-build-web-app --save-dev
sudo $NPM install --no-optional
bower install
GULP=$(which gulp)
$GULP build
cd ..
#Stop running container
$DOCKER_PATH stop $SERVICE_NAME
# Remove container
$DOCKER_PATH rm $SERVICE_NAME
# Remove previous image
$DOCKER_PATH rmi $IMAGE_TAG
# Build image
$DOCKER_PATH build -t $IMAGE_TAG .
# Build the container
$DOCKER_PATH run -d \
  --name $SERVICE_NAME \
  -p $HOST:$EXPOSE_PORT:$CONT_PORT \
  -e HOST=$HOST_IP \
  -e MONGODB_URL=$MONGODB_URL \
  --restart=always \
  $IMAGE_TAG
