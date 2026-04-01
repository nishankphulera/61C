#!/usr/bin/env bash
set -euo pipefail

if [ -z "${1:-}" ]; then
  echo "Usage: $0 <repo_path>"
  echo "Example: $0 /opt/61c"
  exit 1
fi

REPO_PATH="$1"

cd "$REPO_PATH"

if [ ! -f ".env.production" ]; then
  echo "Missing .env.production in repo root."
  exit 1
fi

echo "Pulling latest code..."
git pull

echo "Building and starting containers..."
docker compose --env-file .env.production up -d --build

echo "Waiting for services to settle..."
sleep 5

echo "Running health checks..."
curl -fsS http://127.0.0.1:3000/ >/dev/null
curl -fsS http://127.0.0.1:5001/ >/dev/null
curl -fsS http://127.0.0.1:5001/api/public/content >/dev/null || true

echo "Deployment completed successfully."
