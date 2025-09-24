# Production Deployment Guide

## 🚀 Pre-Deployment Checklist

### 1. Environment Configuration
Before deploying, you need to set up your production environment variables:

```bash
# Copy the example file and fill in your actual values
cp .env.example .env
```

**Required Environment Variables:**
```bash
# Production Settings
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com

# Stripe Keys (Get from https://dashboard.stripe.com/apikeys)
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_publishable_key
STRIPE_SECRET_KEY=sk_live_your_live_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# JWT & Session Secrets (Generate strong random strings)
JWT_SECRET=your_32_character_random_string_here
SESSION_SECRET=your_32_character_random_string_here

# Optional: Database URL if using persistent storage
DATABASE_URL=your_database_connection_string
```

### 2. Security Verification
- [ ] ✅ Environment variables secured (.env in .gitignore)
- [ ] ✅ No hardcoded API keys in source code
- [ ] ✅ Security headers configured (helmet)
- [ ] ✅ Rate limiting implemented
- [ ] ✅ Input validation on all endpoints
- [ ] ✅ CORS properly configured
- [ ] ✅ Error handling doesn't leak sensitive info

### 3. Build for Production
```bash
# Install dependencies
pnpm install

# Build the application
pnpm build

# Test the production build locally
pnpm start
```

## 🌐 Deployment Options

### Option 1: Netlify (Recommended for Frontend)
1. Build the frontend:
   ```bash
   pnpm build:client
   ```

2. Deploy the `dist/spa` folder to Netlify

3. Set environment variables in Netlify dashboard:
   - `VITE_STRIPE_PUBLISHABLE_KEY`
   - `VITE_PUBLIC_BUILDER_KEY`

4. Configure redirects in `netlify.toml` (already included)

### Option 2: Vercel
1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel --prod
   ```

3. Set environment variables in Vercel dashboard

### Option 3: Railway/Heroku (Full Stack)
1. Create a Dockerfile:
   ```dockerfile
   FROM node:18-alpine
   
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   
   COPY . .
   RUN npm run build
   
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. Set environment variables in platform dashboard

### Option 4: VPS/Self-Hosted
1. Use PM2 for process management:
   ```bash
   npm install -g pm2
   pm2 start dist/server/node-build.mjs --name "portfolio"
   pm2 startup
   pm2 save
   ```

2. Set up Nginx reverse proxy:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
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

## 🔒 Production Security Setup

### 1. SSL/HTTPS Certificate
- Use Let's Encrypt for free SSL certificates
- Configure automatic renewal
- Force HTTPS redirects

### 2. Firewall Configuration
```bash
# Example UFW rules
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

### 3. Security Headers Verification
Test your deployment with:
- [Security Headers](https://securityheaders.com/)
- [SSL Labs](https://www.ssllabs.com/ssltest/)

### 4. Monitoring & Logging
```bash
# Set up log rotation
sudo logrotate -d /etc/logrotate.conf

# Monitor with PM2
pm2 logs
pm2 monit
```

## 🗃️ Database Setup (if needed)

### MongoDB Atlas (Recommended)
1. Create a cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Add your deployment IP to the whitelist
3. Set `DATABASE_URL` environment variable

### PostgreSQL/Supabase
1. Create a project at [Supabase](https://supabase.com/)
2. Get connection string from dashboard
3. Set `DATABASE_URL` environment variable

## 🔧 Post-Deployment Configuration

### 1. Stripe Webhook Setup
1. Go to [Stripe Dashboard > Webhooks](https://dashboard.stripe.com/webhooks)
2. Add endpoint: `https://yourdomain.com/api/stripe/webhook`
3. Select events to listen for
4. Copy webhook secret to `STRIPE_WEBHOOK_SECRET`

### 2. Domain Configuration
1. Update CORS origin in production:
   ```bash
   FRONTEND_URL=https://yourdomain.com
   ```

2. Update CSP if needed for your domain

### 3. DNS Configuration
- Point your domain to deployment platform
- Set up CDN (Cloudflare recommended)
- Configure caching rules

## 📊 Performance Optimization

### 1. Build Optimization
```bash
# Enable production optimizations
NODE_ENV=production pnpm build
```

### 2. CDN Setup
- Use Cloudflare or AWS CloudFront
- Cache static assets (images, CSS, JS)
- Enable gzip compression

### 3. Database Optimization
- Set up database indexes
- Configure connection pooling
- Enable query caching

## 🚨 Incident Response Plan

### 1. Monitoring Setup
```bash
# Set up health checks
curl https://yourdomain.com/api/ping
```

### 2. Backup Strategy
- Automated database backups
- Code repository backups
- Environment variables backup (securely)

### 3. Recovery Procedures
1. Keep previous deployment accessible
2. Database rollback procedures
3. DNS failover configuration

## 📋 Maintenance Checklist

### Weekly
- [ ] Check error logs
- [ ] Monitor rate limit violations
- [ ] Review security alerts

### Monthly
- [ ] Update dependencies (`pnpm update`)
- [ ] Security audit (`pnpm audit`)
- [ ] Rotate secrets if needed

### Quarterly
- [ ] Performance review
- [ ] Security penetration testing
- [ ] Backup recovery testing

## 🆘 Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**
   - Check `.env` file location
   - Verify variable names match exactly
   - Ensure no trailing spaces

2. **CORS Errors**
   - Update `FRONTEND_URL` to match your domain
   - Check CORS configuration in server

3. **Stripe Integration Issues**
   - Verify live vs test keys
   - Check webhook endpoint URL
   - Validate webhook secret

4. **Rate Limiting Too Strict**
   - Adjust limits in `server/index.ts`
   - Consider different limits per endpoint

### Support Resources
- [Stripe Documentation](https://stripe.com/docs)
- [Netlify Support](https://docs.netlify.com/)
- [Security Best Practices](https://owasp.org/www-project-top-ten/)

## 🎯 Success Metrics

After deployment, verify:
- [ ] All pages load correctly
- [ ] Payment processing works
- [ ] Contact form submissions
- [ ] Security headers present
- [ ] SSL certificate valid
- [ ] Performance scores good (>90)

Your portfolio is now production-ready with enterprise-grade security! 🎉