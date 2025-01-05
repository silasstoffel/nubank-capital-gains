#!/bin/sh

docker-compose up -d --build
echo ""
echo "You're running capital gain on the docker container:"
echo ""

docker exec -it capital-gains-app bash

docker-compose down
