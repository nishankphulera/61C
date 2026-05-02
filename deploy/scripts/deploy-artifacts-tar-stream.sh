#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Deploy client/server to EC2 by streaming tar.gz over SSH (seek-free).
This avoids putting large ZIP archives onto EC2 disk.

Required:
  EC2_HOST

Optional:
  EC2_USER               (default: ec2-user)
  SSH_KEY_PATH           (default: ./61c.pem)
  SSH_PORT               (default: 22)
  REMOTE_APP_DIR        (default: /home/<EC2_USER>/61c)
  REMOTE_CLIENT_PORT    (default: 3000)
  REMOTE_SERVER_PORT    (default: 5001)
  REMOTE_CLIENT_ENV     (default: <REMOTE_APP_DIR>/shared/client.env)
  REMOTE_SERVER_ENV     (default: <REMOTE_APP_DIR>/shared/server.env)
  REMOTE_KEEP_RELEASES  (default: 0)

Example:
  EC2_HOST=ec2-16-170-232-235.eu-north-1.compute.amazonaws.com \
  EC2_USER=ec2-user \
  SSH_KEY_PATH=./61c.pem \
  bash deploy/scripts/deploy-artifacts-tar-stream.sh
EOF
}

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  usage
  exit 0
fi

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1"
    exit 1
  fi
}

require_cmd npm
require_cmd zip
require_cmd ssh
require_cmd tar

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
CLIENT_DIR="$ROOT_DIR/client"
SERVER_DIR="$ROOT_DIR/server"

: "${EC2_HOST:?EC2_HOST is required}"
EC2_USER="${EC2_USER:-ec2-user}"
if [[ -z "${SSH_KEY_PATH:-}" ]]; then
  if [[ -f "$ROOT_DIR/61cweb.pem" ]]; then
    SSH_KEY_PATH="$ROOT_DIR/61cweb.pem"
  else
    SSH_KEY_PATH="$ROOT_DIR/61c.pem"
  fi
fi
SSH_PORT="${SSH_PORT:-22}"
REMOTE_APP_DIR="${REMOTE_APP_DIR:-/home/$EC2_USER/61c}"
REMOTE_CLIENT_PORT="${REMOTE_CLIENT_PORT:-3000}"
REMOTE_SERVER_PORT="${REMOTE_SERVER_PORT:-5001}"
REMOTE_CLIENT_ENV="${REMOTE_CLIENT_ENV:-$REMOTE_APP_DIR/shared/client.env}"
REMOTE_SERVER_ENV="${REMOTE_SERVER_ENV:-$REMOTE_APP_DIR/shared/server.env}"
REMOTE_KEEP_RELEASES="${REMOTE_KEEP_RELEASES:-0}"

if [[ ! -f "$SSH_KEY_PATH" ]]; then
  echo "SSH key not found at: $SSH_KEY_PATH"
  exit 1
fi

WORK_DIR="$(mktemp -d "${TMPDIR:-/tmp}/61c-deploy-tar.XXXXXX")"
cleanup() { rm -rf "$WORK_DIR"; }
trap cleanup EXIT

ensure_deps() {
  local app_dir="$1"
  if [[ ! -d "$app_dir/node_modules" ]]; then
    echo "Installing dependencies in $app_dir ..."
    npm --prefix "$app_dir" ci
  fi
}

SSH_OPTS=(-i "$SSH_KEY_PATH" -p "$SSH_PORT" -o StrictHostKeyChecking=accept-new)

echo "Preparing local dependencies ..."
ensure_deps "$CLIENT_DIR"
ensure_deps "$SERVER_DIR"

echo "Building client locally ..."
(
  cd "$CLIENT_DIR"
  npm run build
)

if [[ ! -f "$CLIENT_DIR/.next/standalone/server.js" ]]; then
  echo "Expected standalone output not found at client/.next/standalone/server.js"
  echo "Set output: 'standalone' in client/next.config.ts and rebuild."
  exit 1
fi

echo "Building server locally ..."
(
  cd "$SERVER_DIR"
  npm run build
)

if [[ ! -d "$SERVER_DIR/dist" ]]; then
  echo "Server build output not found at server/dist"
  exit 1
fi

echo "Preparing client filesystem bundle ..."
mkdir -p "$WORK_DIR/client/.next"
cp -R "$CLIENT_DIR/.next/standalone/." "$WORK_DIR/client/"
cp -R "$CLIENT_DIR/.next/static" "$WORK_DIR/client/.next/static"
if [[ -d "$CLIENT_DIR/public" ]]; then
  cp -R "$CLIENT_DIR/public" "$WORK_DIR/client/public"
fi

echo "Preparing server filesystem bundle ..."
mkdir -p "$WORK_DIR/server"
cp -R "$SERVER_DIR/dist" "$WORK_DIR/server/dist"
cp "$SERVER_DIR/package.json" "$WORK_DIR/server/package.json"
if [[ -f "$SERVER_DIR/package-lock.json" ]]; then
  cp "$SERVER_DIR/package-lock.json" "$WORK_DIR/server/package-lock.json"
fi
cp -R "$SERVER_DIR/node_modules" "$WORK_DIR/server/node_modules"

RELEASE_ID="$(date +%Y%m%d%H%M%S)"
REMOTE_RELEASE_DIR="$REMOTE_APP_DIR/releases/$RELEASE_ID"
REMOTE_CLIENT_RELEASE_DIR="$REMOTE_RELEASE_DIR/client"
REMOTE_SERVER_RELEASE_DIR="$REMOTE_RELEASE_DIR/server"

echo "Preparing EC2 (stop services, pre-clean releases, create dirs) ..."
ssh "${SSH_OPTS[@]}" "$EC2_USER@$EC2_HOST" \
  "REMOTE_APP_DIR='$REMOTE_APP_DIR' REMOTE_KEEP_RELEASES='$REMOTE_KEEP_RELEASES' REMOTE_CLIENT_RELEASE_DIR='$REMOTE_CLIENT_RELEASE_DIR' REMOTE_SERVER_RELEASE_DIR='$REMOTE_SERVER_RELEASE_DIR' bash -s" <<'REMOTE'
set -euo pipefail
export PATH="$HOME/.local/node/bin:$PATH"

for cmd in unzip node npm tar; do
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "Missing required command on EC2: $cmd"
    exit 1
  fi
done

if ! command -v pm2 >/dev/null 2>&1; then
  echo "PM2 not found on EC2. Installing globally ..."
  npm install -g pm2
fi

mkdir -p "$REMOTE_APP_DIR/releases" "$REMOTE_APP_DIR/shared"

pm2 delete 61c-client >/dev/null 2>&1 || true
pm2 delete 61c-server >/dev/null 2>&1 || true

mapfile -t releases < <(ls -1dt "$REMOTE_APP_DIR"/releases/* 2>/dev/null || true)
if (( ${#releases[@]} > REMOTE_KEEP_RELEASES )); then
  for old_release in "${releases[@]:$REMOTE_KEEP_RELEASES}"; do
    rm -rf "$old_release"
  done
fi

mkdir -p "$REMOTE_CLIENT_RELEASE_DIR" "$REMOTE_SERVER_RELEASE_DIR"
REMOTE

echo "Streaming client bundle to EC2 (tar.gz over SSH) ..."
tar -C "$WORK_DIR/client" -czf - . | ssh "${SSH_OPTS[@]}" "$EC2_USER@$EC2_HOST" \
  "mkdir -p '$REMOTE_CLIENT_RELEASE_DIR' && tar -xzf - -C '$REMOTE_CLIENT_RELEASE_DIR'"

echo "Streaming server bundle to EC2 (tar.gz over SSH) ..."
tar -C "$WORK_DIR/server" -czf - . | ssh "${SSH_OPTS[@]}" "$EC2_USER@$EC2_HOST" \
  "mkdir -p '$REMOTE_SERVER_RELEASE_DIR' && tar -xzf - -C '$REMOTE_SERVER_RELEASE_DIR'"

echo "Activating release and restarting PM2 ..."
ssh "${SSH_OPTS[@]}" "$EC2_USER@$EC2_HOST" \
  "REMOTE_APP_DIR='$REMOTE_APP_DIR' REMOTE_CLIENT_PORT='$REMOTE_CLIENT_PORT' REMOTE_SERVER_PORT='$REMOTE_SERVER_PORT' REMOTE_CLIENT_ENV='$REMOTE_CLIENT_ENV' REMOTE_SERVER_ENV='$REMOTE_SERVER_ENV' REMOTE_CLIENT_RELEASE_DIR='$REMOTE_CLIENT_RELEASE_DIR' REMOTE_SERVER_RELEASE_DIR='$REMOTE_SERVER_RELEASE_DIR' bash -s" <<'REMOTE'
set -euo pipefail
export PATH="$HOME/.local/node/bin:$PATH"

ln -sfn "$REMOTE_CLIENT_RELEASE_DIR" "$REMOTE_APP_DIR/client-current"
ln -sfn "$REMOTE_SERVER_RELEASE_DIR" "$REMOTE_APP_DIR/server-current"

set -a
if [[ -f "$REMOTE_SERVER_ENV" ]]; then
  . "$REMOTE_SERVER_ENV"
fi
set +a
export NODE_ENV=production
export PORT="$REMOTE_SERVER_PORT"
pm2 start dist/server.js --name 61c-server --cwd "$REMOTE_APP_DIR/server-current"

set -a
if [[ -f "$REMOTE_CLIENT_ENV" ]]; then
  . "$REMOTE_CLIENT_ENV"
fi
set +a
export NODE_ENV=production
export PORT="$REMOTE_CLIENT_PORT"
pm2 start server.js --name 61c-client --cwd "$REMOTE_APP_DIR/client-current"

pm2 save
echo "Deployment completed."
REMOTE

echo "Done."

