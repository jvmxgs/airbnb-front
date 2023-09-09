#!/bin/bash

if [ ! -d "/var/www/node_modules" ]; then
  pnpm install
fi

pnpm dev
