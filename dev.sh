#!/usr/bin/env bash

docker-compose -f docker-compose.dev.yml down
docker-compose build && docker-compose up
