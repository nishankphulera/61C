#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Builds the API server locally, uploads to EC2, and restarts only the 61c-server PM2 process.

Required:
  EC2_HOST              EC2 public DNS or IP

Optional:
  EC2_USER              SSH user (default: ec2-user)
  SSH_KEY_PATH          Private key (default: ./61cweb.pem or ./61c.pem)
  SSH_PORT              SSH port (default: 22)
  REMOTE_APP_DIR        Remote app root (default: /home/<user>/61c)
  REMOTE_SERVER_PORT    API port (default: 5001)
  REMOTE_SERVER_ENV     Env file (default: <REMOTE_APP_DIR>/shared/server.env)
  REMOTE_STAGING_DIR    Upload dir (default: <REMOTE_APP_DIR>/incoming)
  REMOTE_KEEP_RELEASES  Releases to keep (default: 2)

Example:
  EC2_HOST=ec2-xx-xx.compute.amazonaws.com \
  bash deploy/scripts/deploy-server-artifacts.sh
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
require_cmd rsync
require_cmd ssh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
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
REMOTE_SERVER_PORT="${REMOTE_SERVER_PORT:-5001}"
REMOTE_SERVER_ENV="${REMOTE_SERVER_ENV:-$REMOTE_APP_DIR/shared/server.env}"
REMOTE_STAGING_DIR="${REMOTE_STAGING_DIR:-$REMOTE_APP_DIR/incoming}"
REMOTE_KEEP_RELEASES="${REMOTE_KEEP_RELEASES:-2}"

if [[ ! -f "$SSH_KEY_PATH" ]]; then
  echo "SSH key not found at: $SSH_KEY_PATH"
  exit 1
fi

WORK_DIR="$(mktemp -d "${TMPDIR:-/tmp}/61c-server-deploy.XXXXXX")"
cleanup() { rm -rf "$WORK_DIR"; }
trap cleanup EXIT

if [[ ! -d "$SERVER_DIR/node_modules" ]]; then
  echo "Installing server dependencies ..."
  npm --prefix "$SERVER_DIR" ci
fi

echo "Building server ..."
(cd "$SERVER_DIR" && npm run build)

if [[ ! -d "$SERVER_DIR/dist" ]]; then
  echo "Server build output not found at server/dist"
  exit 1
fi

echo "Packaging server ..."
mkdir -p "$WORK_DIR/server"
cp -R "$SERVER_DIR/dist" "$WORK_DIR/server/dist"
cp "$SERVER_DIR/package.json" "$WORK_DIR/server/package.json"
if [[ -f "$SERVER_DIR/package-lock.json" ]]; then
  cp "$SERVER_DIR/package-lock.json" "$WORK_DIR/server/package-lock.json"
fi
cp -R "$SERVER_DIR/node_modules" "$WORK_DIR/server/node_modules"
(cd "$WORK_DIR/server" && zip -qr "$WORK_DIR/server-build.zip" .)

SSH_OPTS=(-i "$SSH_KEY_PATH" -p "$SSH_PORT" -o StrictHostKeyChecking=accept-new)
RSYNC_RSH=(ssh "${SSH_OPTS[@]}")

echo "Uploading server artifact to $EC2_USER@$EC2_HOST ..."
ssh "${SSH_OPTS[@]}" "$EC2_USER@$EC2_HOST" \
  "rm -f '$REMOTE_STAGING_DIR/server-build.zip' 2>/dev/null || true; mkdir -p '$REMOTE_STAGING_DIR'"
rsync -av -e "${RSYNC_RSH[*]}" \
  "$WORK_DIR/server-build.zip" \
  "$EC2_USER@$EC2_HOST:$REMOTE_STAGING_DIR/"

echo "Activating release and restarting 61c-server ..."
ssh "${SSH_OPTS[@]}" "$EC2_USER@$EC2_HOST" \
  "REMOTE_APP_DIR='$REMOTE_APP_DIR' REMOTE_STAGING_DIR='$REMOTE_STAGING_DIR' REMOTE_KEEP_RELEASES='$REMOTE_KEEP_RELEASES' REMOTE_SERVER_PORT='$REMOTE_SERVER_PORT' REMOTE_SERVER_ENV='$REMOTE_SERVER_ENV' bash -s" <<'REMOTE'
set -euo pipefail
export PATH="$HOME/.local/node/bin:$PATH"

for cmd in unzip node npm; do
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "Missing required command on EC2: $cmd"
    exit 1
  fi
done

if ! command -v pm2 >/dev/null 2>&1; then
  echo "PM2 not found on EC2. Installing globally ..."
  npm install -g pm2
fi

mkdir -p "$REMOTE_APP_DIR/releases" "$REMOTE_APP_DIR/shared" "$REMOTE_STAGING_DIR"

pm2 delete 61c-server >/dev/null 2>&1 || true

mapfile -t releases < <(ls -1dt "$REMOTE_APP_DIR"/releases/* 2>/dev/null || true)
if (( ${#releases[@]} > REMOTE_KEEP_RELEASES )); then
  for old_release in "${releases[@]:$REMOTE_KEEP_RELEASES}"; do
    rm -rf "$old_release"
  done
fi

avail_kb="$(df -Pk / | awk 'NR==2{print $4}')"
if (( avail_kb < 500000 )); then
  echo "Not enough free disk on EC2 for extraction (avail_kb=$avail_kb)."
  exit 1
fi

RELEASE_ID="$(date +%Y%m%d%H%M%S)"
SERVER_RELEASE_DIR="$REMOTE_APP_DIR/releases/$RELEASE_ID/server"
mkdir -p "$SERVER_RELEASE_DIR"
unzip -q -o "$REMOTE_STAGING_DIR/server-build.zip" -d "$SERVER_RELEASE_DIR"
ln -sfn "$SERVER_RELEASE_DIR" "$REMOTE_APP_DIR/server-current"

set -a
if [[ -f "$REMOTE_SERVER_ENV" ]]; then
  . "$REMOTE_SERVER_ENV"
  export DOTENV_CONFIG_PATH="$REMOTE_SERVER_ENV"
  export DOTENV_CONFIG_QUIET=true
fi
set +a
export NODE_ENV=production
export PORT="$REMOTE_SERVER_PORT"

pm2 delete 61c-server >/dev/null 2>&1 || true
pm2 start dist/server.js --name 61c-server --cwd "$REMOTE_APP_DIR/server-current" --node-args="-r dotenv/config"
pm2 save
rm -f "$REMOTE_STAGING_DIR/server-build.zip" || true

echo "Server deployment completed."
echo "Server dir: $REMOTE_APP_DIR/server-current"
REMOTE

echo "Done."
