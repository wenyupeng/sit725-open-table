#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e 

GITHUB_REPO_URL="https://github.com/wenyupeng/sit725-skipy.git" 
PROJECT_DIR="/usr/local/sit725-skipy" 
CLONE_DIR="/usr/local" 
DOCKER_IMAGE_NAME="sit725-skipy-image" 
DOCKER_CONTAINER_NAME="sit725-skipy" 
DOCKER_PORT_MAPPING="3000:3000" 

echo "Cloning repository from $GITHUB_REPO_URL"

if [ -d "$PROJECT_DIR" ]; then
  echo "Directory $PROJECT_DIR already exists. Pulling latest changes"
  cd "$PROJECT_DIR" && git pull
else
  echo "Cloning into $PROJECT_DIR"
  git clone "$GITHUB_REPO_URL" "$PROJECT_DIR"
  cd "$PROJECT_DIR"
fi

if [ "$(docker ps -q -f name=$DOCKER_CONTAINER_NAME)" ]; then
  echo "Stopping and removing existing container $DOCKER_CONTAINER_NAME"
  docker stop "$DOCKER_CONTAINER_NAME"
  docker rm "$DOCKER_CONTAINER_NAME"
fi
echo "Running Docker container $DOCKER_CONTAINER_NAME"


if [ "$(docker images -q $DOCKER_IMAGE_NAME)" ]; then
  echo "Removing existing Docker image $DOCKER_IMAGE_NAME"
  docker rmi "$DOCKER_IMAGE_NAME" || true
fi

echo "Building Docker image $DOCKER_IMAGE_NAME"
docker build -t "$DOCKER_IMAGE_NAME" .

docker run -d --name "$DOCKER_CONTAINER_NAME" -p "$DOCKER_PORT_MAPPING" "$DOCKER_IMAGE_NAME"

echo "Deployment complete. The application is running in container $DOCKER_CONTAINER_NAME"