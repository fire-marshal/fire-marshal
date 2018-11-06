#!/usr/bin/env bash

docker-compose -f docker-compose.base.yml -f docker-compose.prod.yml down
docker-compose -f docker-compose.base.yml -f docker-compose.prod.yml build
docker-compose -f docker-compose.base.yml -f docker-compose.prod.yml up
