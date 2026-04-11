# Point GoDaddy domain `www.61c.com` at EC2 (HTTPS, no `:3000`)

This guide connects a domain purchased at **GoDaddy** to your **AWS EC2** instance so visitors use **`https://www.61c.com`** (and optionally **`https://61c.com`**) instead of `http://ec2-....amazonaws.com:3000/`.

**What you are doing:** DNS at GoDaddy → public IP of EC2 → Nginx on EC2 listens on ports **80** and **443** → Nginx proxies to your apps on **localhost** (**3000** = Next.js client, **5001** = API). TLS (HTTPS) is provided by **Let’s Encrypt** via Certbot.

**Assumptions:**

- EC2 already runs your client (PM2) on port **3000** and API on **5001** bound to localhost (or all interfaces; Nginx talks to `127.0.0.1`).
- You can SSH into the instance and use `sudo`.
- Domain: **`61c.com`** (adjust names if yours differs).

---

## Part 1 — Collect information before you start

| Item | Where to get it |
|------|------------------|
| **EC2 public IPv4** | AWS Console → EC2 → Instances → your instance → **Public IPv4 address** |
| **Hosted zone / DNS** | You will edit DNS in **GoDaddy** (this guide) |
| **Email for Let’s Encrypt** | A real address you monitor (renewal notices, expiry warnings) |

**Important:** After DNS changes, wait for propagation (often **5–30 minutes**, sometimes up to **48 hours**). Use [https://dnschecker.org](https://dnschecker.org) to see when `www.61c.com` resolves to your EC2 IP worldwide.

---

## Part 2 — GoDaddy DNS (A records)

You want the **hostname** people type (`www.61c.com` and optionally `61c.com`) to resolve to your **single EC2 public IP**.

### 2.1 Log in to GoDaddy

1. Go to [https://www.godaddy.com](https://www.godaddy.com) and sign in.
2. Open **My Products** (or **Domains**).
3. Find **`61c.com`** and open **DNS** or **Manage DNS** (wording varies).

### 2.2 Add or edit the `www` record

1. In the DNS records table, look for a record for **`www`**.
2. **If `www` exists** (often CNAME or A): edit it.
3. **If it does not exist**: add a new record.

Set:

| Type | Name / Host | Value | TTL |
|------|-------------|-------|-----|
| **A** | `www` | `<YOUR_EC2_PUBLIC_IPV4>` | 600 seconds (or default) |

- **Name:** Often you only type **`www`** (GoDaddy may show the full name as `www.61c.com`).
- **Value:** The **public IPv4** of your EC2 instance (four numbers, e.g. `51.12.34.56`). **Not** the private IP inside VPC.

Save the record.

### 2.3 Apex domain `61c.com` (optional but recommended)

So that **`https://61c.com`** also works (not only `www`):

| Type | Name / Host | Value | TTL |
|------|-------------|-------|-----|
| **A** | `@` (or blank, or `61c.com` depending on UI) | **Same** EC2 public IPv4 | 600 or default |

Some UIs call the root **`@`**.

**Note:** If GoDaddy shows **“Forwarding”** on the domain, avoid double-forwarding; DNS **A** records are usually enough for this setup.

### 2.4 Remove conflicting records (if any)

- If **`www`** was a **CNAME** to something else (e.g. parking page), **delete or replace** it with the **A** record above.
- Duplicate **A** records for the same name can cause confusion; keep **one** correct **A** per hostname.

### 2.5 Verify DNS from your laptop

Replace `<EC2_PUBLIC_IP>` with your IP:

```bash
dig +short www.61c.com A
dig +short 61c.com A
```

You want both to return `<EC2_PUBLIC_IP>` once propagation completes.

---

## Part 3 — AWS Security Group (allow web traffic)

In **AWS Console** → **EC2** → **Instances** → select instance → **Security** tab → click the **security group** → **Edit inbound rules**.

Ensure:

| Type | Port | Source | Purpose |
|------|------|--------|---------|
| SSH | 22 | Your IP (recommended) | Admin access |
| HTTP | 80 | `0.0.0.0/0` | Let’s Encrypt + HTTP → HTTPS redirect |
| HTTPS | 443 | `0.0.0.0/0` | Public website |

**After Nginx is working**, you may **remove** inbound **3000** from `0.0.0.0/0` if you added it for testing (only Nginx needs to reach the app on the instance, via localhost).

Save rules.

---

## Part 4 — Install Nginx and TLS on the EC2 server

Your repo includes:

- `deploy/nginx/site.conf` — reverse proxy: `/` → `127.0.0.1:3000`, `/api/` → `127.0.0.1:5001`
- `deploy/scripts/setup-nginx-tls.sh` — **Ubuntu/Debian** only (`apt-get`)

### 4.1 Which OS?

SSH in and check:

```bash
cat /etc/os-release
```

- If **`ID=ubuntu`** or **Debian**: use **Section 4.2**.
- If **`Amazon Linux`** / **`amzn`**: use **Section 4.3** (paths differ; no `sites-available` by default).

### 4.2 Ubuntu / Debian (use project script)

On the server, you need the repo (or at least `deploy/`). Example:

```bash
cd /path/to/61C   # or clone repo to e.g. /opt/61c
bash deploy/scripts/setup-nginx-tls.sh 61c.com your-email@example.com
```

The script replaces `example.com` with **`61c.com`**, so **`www.61c.com`** is included (see `deploy/nginx/site.conf`). It installs Nginx + Certbot and requests a certificate for **`61c.com`** and **`www.61c.com`**.

Then:

```bash
sudo nginx -t
sudo systemctl status nginx
curl -I https://www.61c.com
```

### 4.3 Amazon Linux 2023 (manual steps)

`setup-nginx-tls.sh` uses `apt-get`; on Amazon Linux use **dnf** and **`/etc/nginx/conf.d/`**.

1. Install packages:

```bash
sudo dnf install -y nginx certbot python3-certbot-nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

2. Copy the site config from your repo (adjust path to where you cloned 61C):

```bash
sudo cp /path/to/61C/deploy/nginx/site.conf /etc/nginx/conf.d/61c.conf
sudo sed -i 's/example.com/61c.com/g' /etc/nginx/conf.d/61c.conf
```

3. Ensure **nothing else** listens on 80/443 in a conflicting way (default server may need tuning). Test:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

4. Obtain certificates (replace email):

```bash
sudo certbot --nginx -d 61c.com -d www.61c.com \
  --agree-tos --email your-email@example.com --non-interactive --redirect
```

5. Certbot will adjust the Nginx config for SSL. Renewals:

```bash
sudo systemctl enable certbot-renew.timer
sudo systemctl start certbot-renew.timer
```

---

## Part 5 — Application environment (CORS + API URL)

Browsers will use **`https://www.61c.com`**. Your API must allow that origin, and the Next.js client must call the API at the **same site** (paths under `/api/`).

On the EC2 host, edit the env files your PM2 deploy uses (often):

- `/home/ec2-user/61c/shared/server.env`
- `/home/ec2-user/61c/shared/client.env`

Set at least:

```bash
# server (Express) — CORS
CLIENT_ORIGIN=https://www.61c.com,https://61c.com

# client build-time — public API base (same origin in production)
# Rebuild client after changing this.
NEXT_PUBLIC_API_BASE_URL=https://www.61c.com
```

**`NEXT_PUBLIC_*`** is embedded at **build time**. After changing it, **rebuild locally** and **redeploy** the client (e.g. `deploy/scripts/deploy-artifacts-tar-stream.sh` or `deploy-artifacts.sh`).

**`PORT`**, **`MONGO_URI`**, **`ADMIN_*`**: keep as you already use them; only add/fix **`CLIENT_ORIGIN`** and **`NEXT_PUBLIC_API_BASE_URL`** for the public domain.

Restart PM2 after editing server env:

```bash
pm2 restart 61c-server 61c-client
pm2 save
```

---

## Part 6 — What URL to share

- **Primary:** `https://www.61c.com/`
- **Apex (if DNS + cert include it):** `https://61c.com/`

Do **not** share `http://ec2-....:3000/` for end users once HTTPS is live.

**Why people saw `ERR_SSL_PROTOCOL_ERROR` on `:3000`:** Port **3000** serves **HTTP** only. If the browser uses **HTTPS** to `:3000`, TLS fails. The fix is **Nginx on 443**, not SSL on 3000.

---

## Part 7 — Verification checklist

1. `curl -I https://www.61c.com` → **200** or **301/302** to HTTPS.
2. Open the site in a browser; address bar shows **padlock** (valid cert).
3. API from browser: open DevTools → Network; calls to **`/api/...`** should go to **`https://www.61c.com/api/...`** and return **200** (not CORS errors).
4. `pm2 list` → `61c-client` and `61c-server` **online**.

---

## Part 8 — Troubleshooting

| Symptom | Things to check |
|--------|-------------------|
| DNS not resolving | GoDaddy **A** record, TTL, `dig www.61c.com` |
| Connection refused on 443 | Security group **443**, Nginx running `sudo systemctl status nginx` |
| Certbot fails | Port **80** open, DNS points to **this** EC2, no CDN blocking |
| CORS errors | `CLIENT_ORIGIN` includes `https://www.61c.com` |
| API 404 / wrong host | `NEXT_PUBLIC_API_BASE_URL` and **rebuilt** client |
| Still see old EC2 URL | Hard refresh, clear cache, check links you share |

---

## Related docs in this repo

- `deploy/README.md` — EC2 baseline, Docker vs artifact deploy, Nginx overview
- `deploy/nginx/site.conf` — proxy rules for client and `/api/`
- `deploy/scripts/setup-nginx-tls.sh` — automated setup on **Ubuntu/Debian**

If your EC2 is **Amazon Linux**, use **Part 4.3** above for Nginx + Certbot; the GoDaddy and DNS parts are the same.
