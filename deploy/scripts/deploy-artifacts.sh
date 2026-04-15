#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Builds client/server locally, zips artifacts, uploads via rsync over SSH, and restarts on EC2 with PM2.

Required environment variables:
  EC2_HOST              EC2 public DNS or IP

Optional environment variables:
  EC2_USER              SSH user (default: ec2-user; use ubuntu on Ubuntu AMIs)
  SSH_KEY_PATH          Path to private key (default: ./61c.pem)
  SSH_PORT              SSH port (default: 22)
  REMOTE_APP_DIR        Remote app root (default: /home/<user>/61c)
  REMOTE_CLIENT_PORT    Port for Next.js standalone server (default: 3000)
  REMOTE_SERVER_PORT    Port for API server (default: 5001)
  REMOTE_CLIENT_ENV     Remote env file loaded before starting client
  REMOTE_SERVER_ENV     Remote env file loaded before starting server
  REMOTE_STAGING_DIR    Where uploads land (default: <REMOTE_APP_DIR>/incoming; avoid /tmp on full tmpfs)

Example (Amazon Linux):
  EC2_HOST=ec2-1-2-3-4.compute.amazonaws.com \
  SSH_KEY_PATH=./61c.pem \
  bash deploy/scripts/deploy-artifacts.sh

Ubuntu AMI: add EC2_USER=ubuntu REMOTE_APP_DIR=/home/ubuntu/61c
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
CLIENT_DIR="$ROOT_DIR/client"
SERVER_DIR="$ROOT_DIR/server"

: "${EC2_HOST:?EC2_HOST is required}"
EC2_USER="${EC2_USER:-ec2-user}"
SSH_KEY_PATH="${SSH_KEY_PATH:-$ROOT_DIR/61c.pem}"
SSH_PORT="${SSH_PORT:-22}"
REMOTE_APP_DIR="${REMOTE_APP_DIR:-/home/$EC2_USER/61c}"
REMOTE_CLIENT_PORT="${REMOTE_CLIENT_PORT:-3000}"
REMOTE_SERVER_PORT="${REMOTE_SERVER_PORT:-5001}"
REMOTE_CLIENT_ENV="${REMOTE_CLIENT_ENV:-$REMOTE_APP_DIR/shared/client.env}"
REMOTE_SERVER_ENV="${REMOTE_SERVER_ENV:-$REMOTE_APP_DIR/shared/server.env}"
# Avoid /tmp on small EC2 instances: Amazon Linux often mounts tmpfs on /tmp (fills quickly).
REMOTE_STAGING_DIR="${REMOTE_STAGING_DIR:-$REMOTE_APP_DIR/incoming}"
REMOTE_KEEP_RELEASES="${REMOTE_KEEP_RELEASES:-2}"

if [[ ! -f "$SSH_KEY_PATH" ]]; then
  echo "SSH key not found at: $SSH_KEY_PATH"
  exit 1
fi

WORK_DIR="$(mktemp -d "${TMPDIR:-/tmp}/61c-deploy.XXXXXX")"
cleanup() {
  rm -rf "$WORK_DIR"
}
trap cleanup EXIT

ensure_deps() {
  local app_dir="$1"
  if [[ ! -d "$app_dir/node_modules" ]]; then
    echo "Installing dependencies in $app_dir ..."
    npm --prefix "$app_dir" ci
  fi
}

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

echo "Packaging client build ..."
mkdir -p "$WORK_DIR/client/.next"
cp -R "$CLIENT_DIR/.next/standalone/." "$WORK_DIR/client/"
cp -R "$CLIENT_DIR/.next/static" "$WORK_DIR/client/.next/static"
if [[ -d "$CLIENT_DIR/public" ]]; then
  cp -R "$CLIENT_DIR/public" "$WORK_DIR/client/public"
fi
(
  cd "$WORK_DIR/client"
  zip -qr "$WORK_DIR/client-build.zip" .
)

echo "Packaging server build ..."
mkdir -p "$WORK_DIR/server"
cp -R "$SERVER_DIR/dist" "$WORK_DIR/server/dist"
cp "$SERVER_DIR/package.json" "$WORK_DIR/server/package.json"
if [[ -f "$SERVER_DIR/package-lock.json" ]]; then
  cp "$SERVER_DIR/package-lock.json" "$WORK_DIR/server/package-lock.json"
fi
cp -R "$SERVER_DIR/node_modules" "$WORK_DIR/server/node_modules"
(
  cd "$WORK_DIR/server"
  zip -qr "$WORK_DIR/server-build.zip" .
)

echo "Uploading artifacts to $EC2_USER@$EC2_HOST ..."
# rsync over a shell channel: some hosts have a broken SFTP subsystem (OpenSSH scp uses SFTP by default),
# which causes "scp: Connection closed"; rsync -e ssh avoids that.
SSH_OPTS=(-i "$SSH_KEY_PATH" -p "$SSH_PORT" -o StrictHostKeyChecking=accept-new)
RSYNC_RSH=(ssh "${SSH_OPTS[@]}")

ssh "${SSH_OPTS[@]}" "$EC2_USER@$EC2_HOST" "rm -f '$REMOTE_STAGING_DIR/client-build.zip' '$REMOTE_STAGING_DIR/server-build.zip' 2>/dev/null || true; mkdir -p '$REMOTE_STAGING_DIR'"
rsync -av -e "${RSYNC_RSH[*]}" \
  "$WORK_DIR/client-build.zip" \
  "$WORK_DIR/server-build.zip" \
  "$EC2_USER@$EC2_HOST:$REMOTE_STAGING_DIR/"

echo "Deploying and restarting PM2 services on EC2 ..."
ssh "${SSH_OPTS[@]}" "$EC2_USER@$EC2_HOST" \
  "REMOTE_APP_DIR='$REMOTE_APP_DIR' REMOTE_STAGING_DIR='$REMOTE_STAGING_DIR' REMOTE_KEEP_RELEASES='$REMOTE_KEEP_RELEASES' REMOTE_CLIENT_PORT='$REMOTE_CLIENT_PORT' REMOTE_SERVER_PORT='$REMOTE_SERVER_PORT' REMOTE_CLIENT_ENV='$REMOTE_CLIENT_ENV' REMOTE_SERVER_ENV='$REMOTE_SERVER_ENV' bash -s" <<'REMOTE'
set -euo pipefail
# Non-interactive SSH often skips .bashrc; common user-local Node install (e.g. tarball under ~/.local/node).
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

# Stop running services before deleting/removing old releases (avoids deleting files in-use).
pm2 delete 61c-client >/dev/null 2>&1 || true
pm2 delete 61c-server >/dev/null 2>&1 || true

# Pre-clean releases BEFORE unzipping to avoid disk-full mid-extract.
mapfile -t releases < <(ls -1dt "$REMOTE_APP_DIR"/releases/* 2>/dev/null || true)
if (( ${#releases[@]} > REMOTE_KEEP_RELEASES )); then
  for old_release in "${releases[@]:$REMOTE_KEEP_RELEASES}"; do
    rm -rf "$old_release"
  done
fi

# Fail fast if the root volume is too full.
avail_kb="$(df -Pk / | awk 'NR==2{print $4}')"
# ~1.5GB minimum free on / to safely unzip both artifacts.
if (( avail_kb < 1500000 )); then
  echo "Not enough free disk on EC2 for extraction (avail_kb=$avail_kb). Free space and retry."
  exit 1
fi

RELEASE_ID="$(date +%Y%m%d%H%M%S)"
RELEASE_DIR="$REMOTE_APP_DIR/releases/$RELEASE_ID"
CLIENT_RELEASE_DIR="$RELEASE_DIR/client"
SERVER_RELEASE_DIR="$RELEASE_DIR/server"
mkdir -p "$CLIENT_RELEASE_DIR" "$SERVER_RELEASE_DIR"

unzip -q -o "$REMOTE_STAGING_DIR/client-build.zip" -d "$CLIENT_RELEASE_DIR"
unzip -q -o "$REMOTE_STAGING_DIR/server-build.zip" -d "$SERVER_RELEASE_DIR"

ln -sfn "$CLIENT_RELEASE_DIR" "$REMOTE_APP_DIR/client-current"
ln -sfn "$SERVER_RELEASE_DIR" "$REMOTE_APP_DIR/server-current"

set -a
if [[ -f "$REMOTE_SERVER_ENV" ]]; then
  . "$REMOTE_SERVER_ENV"
fi
set +a
export NODE_ENV=production
export PORT="$REMOTE_SERVER_PORT"
pm2 delete 61c-server >/dev/null 2>&1 || true
pm2 start dist/server.js --name 61c-server --cwd "$REMOTE_APP_DIR/server-current"

set -a
if [[ -f "$REMOTE_CLIENT_ENV" ]]; then
  . "$REMOTE_CLIENT_ENV"
fi
set +a
export NODE_ENV=production
export PORT="$REMOTE_CLIENT_PORT"
pm2 delete 61c-client >/dev/null 2>&1 || true
pm2 start server.js --name 61c-client --cwd "$REMOTE_APP_DIR/client-current"

pm2 save
rm -f "$REMOTE_STAGING_DIR/client-build.zip" "$REMOTE_STAGING_DIR/server-build.zip" || true

echo "Deployment completed."
echo "Client dir: $REMOTE_APP_DIR/client-current"
echo "Server dir: $REMOTE_APP_DIR/server-current"
REMOTE

echo "Done."
