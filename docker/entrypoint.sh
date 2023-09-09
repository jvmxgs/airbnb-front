#!/bin/bash

if [ ! -d "/var/www/node_modules" ]; then
  pnpm install
fi

echo ' = = = = = = = = = = = = = = = = Hello from entrypoint = = = = = = = = = = = = = = = = = = = ='

pnpm dev
