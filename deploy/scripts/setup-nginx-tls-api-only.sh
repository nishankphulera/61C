#!/usr/bin/env bash
set -euo pipefail

# TLS + Nginx reverse proxy for Express API only (Vercel serves the site).
# Run ON the EC2 host from the repo root, after DNS A/AAAA record points here.
#
# Usage: bash deploy/scripts/setup-nginx-tls-api-only.sh api.example.com admin@example.com

if [ "$#" -lt 2 ]; then
  echo "Usage: $0 <api-hostname> <letsencrypt-email>"
  echo "Example: $0 api.61c.com admin@61c.com"
  exit 1
fi

API_HOST="$1"
EMAIL="$2"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
TEMPLATE="$ROOT_DIR/deploy/nginx/site-api-only.conf"

if [[ ! -f "$TEMPLATE" ]]; then
  echo "Missing template: $TEMPLATE (run this from a clone of the repo on EC2)"
  exit 1
fi

if [[ ! -f /etc/os-release ]]; then
  echo "Missing /etc/os-release — unsupported OS."
  exit 1
fi
# shellcheck source=/dev/null
. /etc/os-release

echo "Installing Nginx and Certbot..."
case "${ID:-}" in
  ubuntu | debian)
    sudo apt-get update
    sudo apt-get install -y nginx certbot python3-certbot-nginx
    NGINX_CONF_PATH="/etc/nginx/sites-available/61c-api.conf"
    sudo mkdir -p /var/www/certbot
    sudo sed "s/__API_HOST__/${API_HOST}/g" "$TEMPLATE" | sudo tee "$NGINX_CONF_PATH" >/dev/null
    sudo ln -sf "$NGINX_CONF_PATH" /etc/nginx/sites-enabled/61c-api.conf
    sudo rm -f /etc/nginx/sites-enabled/default
    ;;
  amzn)
    if command -v dnf >/dev/null 2>&1; then
      PKG=dnf
    else
      PKG=yum
    fi
    sudo "$PKG" install -y nginx certbot python3-certbot-nginx
    NGINX_CONF_PATH="/etc/nginx/conf.d/61c-api.conf"
    sudo mkdir -p /var/www/certbot
    sudo sed "s/__API_HOST__/${API_HOST}/g" "$TEMPLATE" | sudo tee "$NGINX_CONF_PATH" >/dev/null
    ;;
  *)
    echo "Unsupported OS ID=$ID. Use Ubuntu 22.04+ or Amazon Linux 2/2023."
    exit 1
    ;;
esac

echo "Validating and starting Nginx (reload fails if nginx was never started) ..."
sudo nginx -t
sudo systemctl enable nginx 2>/dev/null || true
sudo systemctl restart nginx

echo "Requesting TLS certificate and letting Certbot patch Nginx for $API_HOST ..."
sudo certbot --nginx -d "$API_HOST" --agree-tos --email "$EMAIL" --non-interactive --redirect

echo "Enabling auto-renew (Debian/Ubuntu: certbot.timer; Amazon Linux: certbot-renew.timer) ..."
sudo systemctl enable certbot.timer 2>/dev/null && sudo systemctl start certbot.timer 2>/dev/null || true
sudo systemctl enable certbot-renew.timer 2>/dev/null && sudo systemctl start certbot-renew.timer 2>/dev/null || true

echo "TLS API proxy ready. Public base URL for Vercel:"
echo "  NEXT_PUBLIC_API_BASE_URL=https://${API_HOST}"
echo "Set CLIENT_ORIGIN on the API to your Vercel URL(s)."
