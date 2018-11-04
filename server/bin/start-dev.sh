#!/usr/bin/env bash

npm run build:api-docs
sleep 5
npm run build:fake-db
npm run watch
