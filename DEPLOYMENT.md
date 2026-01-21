# Deployment Guide - DigitalOcean

This guide covers deploying your Next.js blog to a DigitalOcean Droplet.

## Prerequisites

- DigitalOcean account
- Domain name (optional but recommended)
- Supabase project set up and running
- SSH key configured for DigitalOcean

## Option 1: Deploy with Docker (Recommended)

### 1. Create Dockerfile

Create a `Dockerfile` in your project root:

```dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for build
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### 2. Create .dockerignore

```
.next
node_modules
.git
.gitignore
README.md
.env*.local
npm-debug.log
```

### 3. Create docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      args:
        NEXT_PUBLIC_SUPABASE_URL: ${NEXT_PUBLIC_SUPABASE_URL}
        NEXT_PUBLIC_SUPABASE_ANON_KEY: ${NEXT_PUBLIC_SUPABASE_ANON_KEY}
    ports:
      - "3000:3000"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
```

### 4. Set Up DigitalOcean Droplet

```bash
# Create a droplet (Ubuntu 22.04, minimum $6/month)
# SSH into your droplet
ssh root@your-droplet-ip

# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
apt install docker-compose -y

# Create app directory
mkdir -p /var/www/personal-blog
cd /var/www/personal-blog
```

### 5. Deploy Your Application

```bash
# On your local machine, push to Git
git push origin main

# On the droplet, clone your repository
cd /var/www/personal-blog
git clone https://github.com/yourusername/personal-blog.git .

# Create .env file
nano .env

# Add your environment variables:
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Build and start
docker-compose up -d --build

# Check logs
docker-compose logs -f
```

### 6. Set Up Nginx Reverse Proxy

```bash
# Install Nginx
apt install nginx -y

# Create Nginx config
nano /etc/nginx/sites-available/personal-blog
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable the site
ln -s /etc/nginx/sites-available/personal-blog /etc/nginx/sites-enabled/

# Test Nginx config
nginx -t

# Restart Nginx
systemctl restart nginx
```

### 7. Set Up SSL with Let's Encrypt

```bash
# Install Certbot
apt install certbot python3-certbot-nginx -y

# Get SSL certificate
certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Certificate will auto-renew
```

### 8. Update Script

Create an update script at `/var/www/personal-blog/update.sh`:

```bash
#!/bin/bash
cd /var/www/personal-blog
git pull origin main
docker-compose down
docker-compose up -d --build
```

Make it executable:

```bash
chmod +x update.sh
```

## Option 2: Deploy with PM2

### 1. Set Up Droplet

```bash
# SSH into droplet
ssh root@your-droplet-ip

# Update system
apt update && apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install PM2
npm install -g pm2

# Create app directory
mkdir -p /var/www/personal-blog
cd /var/www/personal-blog
```

### 2. Deploy Application

```bash
# Clone repository
git clone https://github.com/yourusername/personal-blog.git .

# Install dependencies
npm ci --production

# Create .env.local
nano .env.local
# Add your Supabase credentials

# Build application
npm run build

# Start with PM2
pm2 start npm --name "personal-blog" -- start

# Save PM2 config
pm2 save

# Set PM2 to start on boot
pm2 startup
```

### 3. Set Up Nginx (same as Docker option above)

Follow steps 6-7 from the Docker deployment.

### 4. Update Script

Create `/var/www/personal-blog/update.sh`:

```bash
#!/bin/bash
cd /var/www/personal-blog
git pull origin main
npm ci --production
npm run build
pm2 restart personal-blog
```

## Domain Configuration

### 1. Configure DNS

In your domain registrar, add these DNS records:

- A record: `@` → Your Droplet IP
- A record: `www` → Your Droplet IP

### 2. Wait for DNS Propagation

This can take 1-48 hours. Check with:

```bash
nslookup yourdomain.com
```

## Monitoring

### View Application Logs

**Docker:**
```bash
docker-compose logs -f
```

**PM2:**
```bash
pm2 logs personal-blog
```

### Check Application Status

**Docker:**
```bash
docker-compose ps
```

**PM2:**
```bash
pm2 status
```

### Monitor Resources

```bash
# Install htop
apt install htop -y
htop
```

## Firewall Configuration

```bash
# Enable UFW
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable

# Check status
ufw status
```

## Backup Strategy

### Database Backups

Supabase handles database backups automatically. For additional safety:

1. Go to Supabase Dashboard → Database → Backups
2. Enable automatic backups
3. Schedule regular exports

### Application Backups

```bash
# Create backup script
nano /root/backup.sh
```

Add:

```bash
#!/bin/bash
BACKUP_DIR="/root/backups"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

# Backup application
cd /var/www
tar -czf $BACKUP_DIR/personal-blog_$DATE.tar.gz personal-blog

# Keep only last 7 backups
cd $BACKUP_DIR
ls -t | tail -n +8 | xargs rm -f
```

```bash
# Make executable
chmod +x /root/backup.sh

# Add to crontab (daily at 2 AM)
crontab -e
# Add: 0 2 * * * /root/backup.sh
```

## Troubleshooting

### Application won't start

1. Check logs: `docker-compose logs` or `pm2 logs`
2. Verify environment variables are set
3. Check Supabase connection
4. Ensure port 3000 is not in use: `lsof -i :3000`

### Cannot connect to domain

1. Check DNS propagation: `nslookup yourdomain.com`
2. Verify Nginx is running: `systemctl status nginx`
3. Check firewall: `ufw status`
4. Test Nginx config: `nginx -t`

### SSL certificate issues

```bash
# Check certificate status
certbot certificates

# Renew manually
certbot renew --dry-run
```

## Performance Optimization

### Enable Gzip in Nginx

Add to your Nginx config:

```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
```

### Set Up Swap (for smaller droplets)

```bash
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' | tee -a /etc/fstab
```

## Cost Estimate

- **Droplet**: $6-12/month (Basic/Regular)
- **Domain**: $10-15/year
- **Supabase**: Free tier (up to 500MB database)
- **Total**: ~$7-13/month

## Security Best Practices

1. Keep system updated: `apt update && apt upgrade`
2. Use SSH keys, disable password auth
3. Configure firewall with UFW
4. Keep Node.js and dependencies updated
5. Use environment variables, never commit secrets
6. Enable Supabase Row Level Security (RLS)
7. Regular backups

## Next Steps

After deployment:

1. Test all pages and functionality
2. Submit sitemap to Google Search Console
3. Set up monitoring (e.g., UptimeRobot)
4. Configure analytics (optional)
5. Test mobile responsiveness
6. Check Core Web Vitals

---

Your personal blog is now live! 🚀
