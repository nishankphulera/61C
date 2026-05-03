# EC2 API for the Vercel Next.js client

The browser loads the site from **Vercel (HTTPS)** and calls your Express API on EC2. The API must be reachable at **HTTPS** (not plain `http://IP`) or the browser will block requests.

## 1) AWS security group

Inbound:

- **22/tcp** — your IP (SSH)
- **80/tcp** — `0.0.0.0/0` (Let’s Encrypt + HTTP → HTTPS redirect)
- **443/tcp** — `0.0.0.0/0` (API)

Do **not** expose **5001** publicly if you use Nginx on 80/443 (recommended).

## 2) DNS

Create an **A** record, e.g. `api.yourdomain.com` → your EC2 public IPv4 (`16.170.169.42` until it changes).

**Before Certbot:** the name must resolve globally. If Certbot reports **NXDOMAIN** for your API host, DNS is missing or not propagated yet. From your laptop, `dig +short api.yourdomain.com A` should return that IPv4; fix DNS first, then re-run Certbot.

Bootstrap creates **`~/61c`** for PM2 deploys and **`~/61c/shared/server.env`**. That directory is **not** a git clone. Clone the repo to a **separate** path (e.g. **`~/61c-source`**) and run Nginx/Certbot scripts from there:

```bash
git clone https://github.com/<you>/61C.git ~/61c-source
cd ~/61c-source
sudo bash deploy/scripts/setup-nginx-tls-api-only.sh api.yourdomain.com you@email.com
```

## 2b) Git on EC2 (if `git: command not found`)

Amazon Linux minimal AMIs often omit Git:

```bash
sudo dnf install -y git
```

## 3) Bootstrap the instance (`ec2-user`, Amazon Linux)

`deploy-artifacts.sh` defaults to **`EC2_USER=ec2-user`** and **`REMOTE_APP_DIR=/home/ec2-user/61c`**.

From your laptop (repo root):

If SSH says **“UNPROTECTED PRIVATE KEY FILE”**, fix permissions once:

```bash
chmod 600 61cweb.pem
```

```bash
chmod +x deploy/scripts/bootstrap-ec2.sh
scp -i 61cweb.pem deploy/scripts/bootstrap-ec2.sh ec2-user@16.170.169.42:~/
ssh -i 61cweb.pem ec2-user@16.170.169.42 'bash ~/bootstrap-ec2.sh'
```

On **Ubuntu** AMIs, SSH as **`ubuntu`** instead and run the same script (it installs Node via `apt`). **Amazon Linux 2023** is the smoothest path for `ec2-user`; on older **AL2**, Certbot packages sometimes need [EPEL / AWS guidance](https://docs.aws.amazon.com/AmazonLinux/latest/algsg/certbot.html).

Then on EC2 edit the API env file (Mongo, CORS, admin):

```bash
ssh -i 61cweb.pem ec2-user@16.170.169.42
nano ~/61c/shared/server.env
```

Set **`CLIENT_ORIGIN`** to your real Vercel URLs, comma-separated, for example:

`https://your-app.vercel.app,https://your-custom-domain.com`

**`deploy-artifacts.sh`** starts the API with **`node -r dotenv/config`** and **`DOTENV_CONFIG_PATH=$HOME/61c/shared/server.env`**, so **`pm2 restart 61c-server`** reloads that file on each boot.

If you still see **500** on an **OPTIONS** preflight, the instance is almost certainly running an **old `dist/server.js`** (before static CORS). From your laptop run **`deploy-artifacts.sh`** once so `server-current` matches this repo.

Manual start (no deploy script) after editing env:

```bash
export DOTENV_CONFIG_PATH="$HOME/61c/shared/server.env"
export DOTENV_CONFIG_QUIET=true
export NODE_ENV=production PORT="${PORT:-5001}"
pm2 delete 61c-server 2>/dev/null || true
pm2 start dist/server.js --name 61c-server --cwd "$HOME/61c/server-current" --node-args="-r dotenv/config"
pm2 save
```

## 4) TLS + Nginx (API only)

Clone this repo on the server (or `rsync` the `deploy/` tree), then:

```bash
cd /path/to/61C
sudo bash deploy/scripts/setup-nginx-tls-api-only.sh api.yourdomain.com you@yourdomain.com
```

Use the **same hostname** as in DNS. After this, your public API base is:

`https://api.yourdomain.com`

## 5) Deploy API (and optional Next) from your laptop

`ec2-user` and `61cweb.pem` (in the repo root) are defaults — you only need the host:

```bash
cd /path/to/61C
EC2_HOST=16.170.169.42 bash deploy/scripts/deploy-artifacts.sh
```

Override if needed:

```bash
EC2_HOST=16.170.169.42 EC2_USER=ec2-user SSH_KEY_PATH=./61cweb.pem bash deploy/scripts/deploy-artifacts.sh
```

## 6) Vercel

Project → Settings → Environment variables:

- **`NEXT_PUBLIC_API_BASE_URL`** = `https://api.yourdomain.com` (no trailing slash)

Redeploy the Vercel project after changing env vars.

## 7) Smoke tests

```bash
curl -sS "https://api.yourdomain.com/api/public/content"
curl -sS "https://api.yourdomain.com/"
```

You should get JSON (or `[]`) from the first command and `61c API` from the second.
