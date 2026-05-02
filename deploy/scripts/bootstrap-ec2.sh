#!/usr/bin/env bash
set -euo pipefail

# One-time host prep for EC2 (API + optional Next via deploy-artifacts).
# Supports Ubuntu/Debian (user: ubuntu) and Amazon Linux 2/2023 (user: ec2-user).
# Run ON the instance: bash deploy/scripts/bootstrap-ec2.sh
# Or: scp ... ec2-user@IP:~/ && ssh ... 'bash ~/bootstrap-ec2.sh'

if [[ "${EUID:-$(id -u)}" -eq 0 ]]; then
  echo "Run as the default login user (ec2-user or ubuntu), not root."
  exit 1
fi

if [[ ! -f /etc/os-release ]]; then
  echo "Missing /etc/os-release — unsupported OS."
  exit 1
fi
# shellcheck source=/dev/null
. /etc/os-release

REMOTE_APP_DIR="${REMOTE_APP_DIR:-$HOME/61c}"

install_node_apt() {
  sudo apt-get update
  sudo apt-get install -y ca-certificates curl gnupg unzip git
  if ! command -v node >/dev/null 2>&1; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
  fi
}

install_node_dnf() {
  if command -v dnf >/dev/null 2>&1; then
    PKG=dnf
  else
    PKG=yum
  fi
  # Amazon Linux ships curl-minimal; installing package "curl" conflicts with it.
  sudo "$PKG" install -y ca-certificates unzip git
  if ! command -v curl >/dev/null 2>&1; then
    echo "curl is required for NodeSource setup. Install curl-minimal or curl from your AMI docs."
    exit 1
  fi
  if ! command -v node >/dev/null 2>&1; then
    curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
    sudo "$PKG" install -y nodejs
  fi
}

echo "Detected OS: ${PRETTY_NAME:-$ID}"
case "${ID:-}" in
  ubuntu | debian)
    install_node_apt
    ;;
  amzn)
    install_node_dnf
    ;;
  *)
    echo "Unsupported ID=$ID. Use Ubuntu 22.04+ or Amazon Linux 2/2023."
    exit 1
    ;;
esac

echo "Node: $(node -v)  npm: $(npm -v)"

if ! command -v pm2 >/dev/null 2>&1; then
  echo "Installing PM2 globally ..."
  sudo npm install -g pm2
fi

mkdir -p "$REMOTE_APP_DIR/shared" "$REMOTE_APP_DIR/incoming" "$REMOTE_APP_DIR/releases"

SERVER_ENV="$REMOTE_APP_DIR/shared/server.env"
if [[ ! -f "$SERVER_ENV" ]]; then
  cat >"$SERVER_ENV" <<'EOF'
# API process env (sourced by deploy-artifacts PM2 step)
NODE_ENV=production
PORT=5001
MONGO_URI=
# Comma-separated browser origins allowed to call this API (your Vercel URLs)
CLIENT_ORIGIN=https://YOUR-APP.vercel.app
ADMIN_USERNAME=admin
ADMIN_PASSWORD=change-me
ADMIN_TOKEN=
EOF
  chmod 600 "$SERVER_ENV"
  echo "Created $SERVER_ENV — edit MONGO_URI, CLIENT_ORIGIN, and ADMIN_* before deploying."
else
  echo "Keeping existing $SERVER_ENV"
fi

CLIENT_ENV="$REMOTE_APP_DIR/shared/client.env"
if [[ ! -f "$CLIENT_ENV" ]]; then
  echo "# Optional: runtime env for Next standalone on this host (omit if API-only)" >"$CLIENT_ENV"
  chmod 600 "$CLIENT_ENV"
fi

if ! pm2 startup systemd -u "$USER" --hp "$HOME" >/tmp/pm2-startup.txt 2>&1; then
  cat /tmp/pm2-startup.txt || true
fi
echo "If PM2 printed a sudo command, run it once so processes survive reboot."

echo "Done. App root: $REMOTE_APP_DIR"
echo "Next: (1) Edit $SERVER_ENV"
echo "      (2) Point DNS api.yourdomain.com → this instance (for HTTPS + Vercel)"
echo "      (3) From laptop: EC2_HOST=<ip> bash deploy/scripts/deploy-artifacts.sh   # ec2-user is the default EC2_USER"
echo "      (4) On EC2 from repo: sudo bash deploy/scripts/setup-nginx-tls-api-only.sh api.yourdomain.com you@email.com"
