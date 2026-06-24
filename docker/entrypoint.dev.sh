#!/bin/sh
set -e

if [ ! -f .env ]; then
  echo "→ No .env found, copying from .env.example..."
  cp .env.example .env
fi

echo "→ Installing / syncing npm packages..."
npm install

echo "→ Generating Prisma client..."
npx prisma generate

echo "→ Applying database migrations..."
npx prisma migrate deploy

echo "→ Preparing Nuxt..."
npx nuxt prepare

echo "→ Starting dev server on http://localhost:3000"
exec npm run dev -- --host 0.0.0.0 --port 3000
