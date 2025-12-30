#!/bin/bash

# Start MongoDB container if not already running
if [ ! "$(docker ps -q -f name=lms-mongo)" ]; then
    if [ "$(docker ps -aq -f name=lms-mongo)" ]; then
        # Cleanup stopped container
        docker rm lms-mongo
    fi
    docker run -d -p 27017:27017 --name lms-mongo mongo:latest
    echo "MongoDB container started."
else
    echo "MongoDB already running."
fi

# Start backend
cd backend
echo "Starting backend..."
node app.js
