#!/bin/sh

npm install --platform=linux --arch=x64 sharp

exec "$@"