#!/bin/sh
set -e

if [ -f .env ]; then
  export $(cat .env | xargs)
fi

PORT=${PORT:-3002}

# Build la app si no existe dist
if [ ! -d dist ]; then
  yarn install
  yarn build
fi

# Ejecuta el servidor SSR en el puerto deseado
node dist/super-heroes-app/server/server.mjs --port $PORT 