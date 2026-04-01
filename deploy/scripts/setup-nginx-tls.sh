#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -lt 2 ]; then
  echo "Usage: $0 <domain> <email>"
  echo "Example: $0 mysite.com admin@mysite.com"
  exit 1
fi

DOMAIN="$1"
EMAIL="$2"
NGINX_CONF_PATH="/etc/nginx/sites-available/61c.conf"

echo "Installing Nginx and Certbot..."
sudo apt-get update
sudo apt-get install -y nginx certbot python3-certbot-nginx

echo "Creating certbot webroot..."
sudo mkdir -p /var/www/certbot

echo "Writing Nginx config..."
sudo cp deploy/nginx/site.conf "$NGINX_CONF_PATH"
sudo sed -i "s/example.com/$DOMAIN/g" "$NGINX_CONF_PATH"
sudo ln -sf "$NGINX_CONF_PATH" /etc/nginx/sites-enabled/61c.conf
sudo rm -f /etc/nginx/sites-enabled/default

echo "Validating and reloading Nginx..."
sudo nginx -t
sudo systemctl reload nginx

echo "Requesting TLS certificate..."
sudo certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --agree-tos --email "$EMAIL" --non-interactive --redirect

echo "Enabling auto-renew..."
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

echo "TLS setup complete."
