# AWS EC2 Production Deployment

This guide deploys the project to one Ubuntu EC2 instance using Docker Compose and Nginx.

## 1) AWS Infrastructure Baseline

- EC2 instance: Ubuntu 24.04 LTS, `t3.small` (or larger), 20+ GB gp3.
- Security group inbound:
  - `22/tcp` from your office/home IP only
  - `80/tcp` from `0.0.0.0/0`
  - `443/tcp` from `0.0.0.0/0`
- Security group outbound: allow all.
- Attach IAM role with `AmazonSSMManagedInstanceCore` for Session Manager access.

## 2) DNS

- Create `A` record for your domain to EC2 public IPv4.
- Optional: add `www` CNAME to root domain.

## 3) Host Bootstrap

Run this once on the EC2 host:

```bash
sudo apt-get update
sudo apt-get install -y docker.io docker-compose-plugin git curl
sudo usermod -aG docker "$USER"
newgrp docker
sudo systemctl enable docker
sudo systemctl start docker
```

Clone the repository:

```bash
git clone <your-repo-url> /opt/61c
cd /opt/61c
```

## 4) Production Environment File

Create `/opt/61c/.env.production` from `.env.production.example`.

```bash
cp .env.production.example .env.production
```

Update values for your domain, Mongo URI, and admin credentials.

Secret hygiene checklist:
- Generate new `ADMIN_PASSWORD` and optional `ADMIN_TOKEN`.
- Rotate `MONGO_URI` credentials if they were ever committed.
- Keep `.env.production` only on the server; do not commit it.

## 5) First Deploy

```bash
docker compose --env-file .env.production up -d --build
```

Verify:

```bash
curl -I http://127.0.0.1:3000
curl -I http://127.0.0.1:5001
```

## 6) Nginx and TLS

Use the helper script:

```bash
cd /opt/61c
bash deploy/scripts/setup-nginx-tls.sh <domain> <email>
```

Then verify:

```bash
sudo nginx -t
curl -I https://<domain>
```

## 7) Routine Deployments

```bash
cd /opt/61c
bash deploy/scripts/deploy.sh /opt/61c
```

## 8) Rollback

- Revert to previous commit:
  ```bash
  cd /opt/61c
  git log --oneline -n 5
  git checkout <previous-commit-sha>
  docker compose --env-file .env.production up -d --build
  ```
- After incident resolution, move back to branch head.

## 9) Monitoring and Logs

- Container logs:
  ```bash
  docker compose logs -f client
  docker compose logs -f server
  ```
- Nginx logs:
  ```bash
  sudo journalctl -u nginx -f
  ```
- Install CloudWatch Agent if centralized metrics/logs are required.
