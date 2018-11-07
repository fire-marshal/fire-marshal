#!/usr/bin/env bash

# TODO: add options:
# - just test
# - generate performance.md

cat ./docs-template/performance-header.md > ./docs/performance.md

echo 'estimate /api/v1/fires'

echo '## GET /api/v1/fires' >> ./docs/performance.md
echo '```' >> ./docs/performance.md
ab -n 500 http://192.168.100.13:8000/api/v1/fires >> ./docs/performance.md
echo '```' >> ./docs/performance.md
