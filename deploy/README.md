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

**GoDaddy:** step-by-step DNS + Nginx + HTTPS for `www.61c.com` is in [`deploy/GODADDY_DOMAIN_SETUP.md`](GODADDY_DOMAIN_SETUP.md).

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

## 7b) Low-memory EC2 Deploy (build locally + SCP)

Use this path when your EC2 instance cannot handle `docker compose --build`.
It builds artifacts on your machine, uploads ZIP files to EC2, and restarts apps with PM2.

### One-time EC2 setup

**Ubuntu:** install Node and PM2 with `apt`, then create app dirs.

**Amazon Linux 2023:** `dnf` may fail with mirror errors on small instances; the deploy script expects `node` on `PATH` for non-interactive SSH. A reliable approach is installing the official Node.js Linux x64 tarball under `~/.local/node` (see Node.js download docs) and adding `export PATH="$HOME/.local/node/bin:$PATH"` to `~/.bashrc`, then `npm install -g pm2`. Ensure `unzip` is installed (`sudo dnf install -y unzip`).

Avoid relying on `/tmp` for large uploads on Amazon Linux: it is often a small tmpfs that fills easily. The deploy script uploads to `<REMOTE_APP_DIR>/incoming` on the root volume instead.

Create runtime env files on EC2 (default app root is `/home/ec2-user/61c` on Amazon Linux):

- `<REMOTE_APP_DIR>/shared/server.env` (API env: `MONGO_URI`, `ADMIN_*`, etc.)
- `<REMOTE_APP_DIR>/shared/client.env` (optional runtime vars for client process)

### Deploy command (run on your local machine)

**Amazon Linux** (`deploy-artifacts.sh` defaults to `ec2-user` and `/home/ec2-user/61c`):

```bash
cd /path/to/61C
chmod +x deploy/scripts/deploy-artifacts.sh
EC2_HOST=<ec2-public-dns-or-ip> \
SSH_KEY_PATH=./61c.pem \
bash deploy/scripts/deploy-artifacts.sh
```

**Ubuntu AMI** (override user and home):

```bash
EC2_HOST=<ec2-public-dns-or-ip> \
SSH_KEY_PATH=./61c.pem \
EC2_USER=ubuntu \
REMOTE_APP_DIR=/home/ubuntu/61c \
bash deploy/scripts/deploy-artifacts.sh
```

Default ports:
- client: `3000`
- server: `5001`

Override if needed:

```bash
REMOTE_CLIENT_PORT=3000 REMOTE_SERVER_PORT=5001 bash deploy/scripts/deploy-artifacts.sh
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
