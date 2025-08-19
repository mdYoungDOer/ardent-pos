# Digital Ocean App Platform Deployment Guide

## Complete Setup Guide for Ardent POS on Digital Ocean

### Prerequisites
- Digital Ocean account
- GitHub account
- Domain name (optional but recommended)

## Step 1: Prepare Your Repository

### 1.1 Initialize Git Repository
```bash
cd "Ardent POS"
git init
git add .
git commit -m "Initial commit: Complete Ardent POS system"
```

### 1.2 Create GitHub Repository
1. Go to GitHub and create a new repository named `ardent-pos`
2. Push your code:
```bash
git remote add origin https://github.com/YOUR_USERNAME/ardent-pos.git
git branch -M main
git push -u origin main
```

## Step 2: Set Up PostgreSQL Database

### 2.1 Create Database Cluster
1. Log into Digital Ocean Dashboard
2. Go to **Databases** → **Create Database Cluster**
3. Choose **PostgreSQL 14**
4. Select your preferred region (choose closest to your users)
5. Choose cluster configuration:
   - **Development**: Basic plan, 1 GB RAM, 1 vCPU, 10 GB disk
   - **Production**: Professional plan, 4 GB RAM, 2 vCPUs, 38 GB disk
6. Name your database: `ardent-pos-db`
7. Click **Create Database Cluster**

### 2.2 Configure Database
1. Wait for cluster to be ready (5-10 minutes)
2. Click on your database cluster
3. Go to **Users & Databases** tab
4. Create a new database:
   - Database name: `ardent_pos`
   - User: `ardent_user` (or use default `doadmin`)
5. Note down the connection details:
   - Host
   - Port
   - Database name
   - Username
   - Password

### 2.3 Set Up Database Schema
1. Connect to your database using the connection string provided
2. You can use:
   - **pgAdmin** (GUI tool)
   - **psql** command line
   - **Digital Ocean's built-in console**

```bash
# Using psql
psql "postgresql://username:password@host:port/database?sslmode=require"

# Run the schema
\i schema.sql
```

## Step 3: Deploy Backend API

### 3.1 Create App Platform Application
1. Go to **Apps** → **Create App**
2. Choose **GitHub** as source
3. Select your `ardent-pos` repository
4. Choose `main` branch
5. **Auto-deploy**: Enable for automatic deployments

### 3.2 Configure Backend Service
1. **Service Type**: Web Service
2. **Source Directory**: `/backend`
3. **Environment**: PHP
4. **Build Command**: `composer install --no-dev --optimize-autoloader`
5. **Run Command**: `heroku-php-apache2`
6. **HTTP Port**: 8080
7. **Instance Count**: 1
8. **Instance Size**: Basic (512 MB RAM)

### 3.3 Set Environment Variables
Add these environment variables in the App Platform:

```env
# Database Configuration
DB_HOST=your-database-host
DB_PORT=25060
DB_NAME=ardent_pos
DB_USER=your-database-user
DB_PASS=your-database-password

# JWT Configuration
JWT_SECRET=your-super-secure-jwt-secret-key-change-this-in-production

# App Configuration
APP_URL=https://your-app-name.ondigitalocean.app
CORS_ORIGIN=https://your-frontend-domain.ondigitalocean.app

# Payment Integration (Optional)
PAYSTACK_PUBLIC_KEY=pk_test_your_paystack_public_key
PAYSTACK_SECRET_KEY=sk_test_your_paystack_secret_key

# Email Integration (Optional)
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
```

### 3.4 Configure Routes
Create a file `backend/.htaccess`:
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.php [QSA,L]
```

## Step 4: Deploy Frontend Application

### 4.1 Create Frontend Service
1. In the same app, add another service
2. **Service Type**: Static Site
3. **Source Directory**: `/frontend`
4. **Build Command**: `npm ci && npm run build`
5. **Output Directory**: `build`

### 4.2 Configure Frontend Environment
Create `frontend/.env.production`:
```env
REACT_APP_API_URL=https://your-backend-service.ondigitalocean.app
REACT_APP_PAYSTACK_PUBLIC_KEY=pk_test_your_paystack_public_key
```

### 4.3 Update Frontend API Configuration
Edit `frontend/src/contexts/AuthContext.js`:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
```

## Step 5: Configure Custom Domains (Optional)

### 5.1 Add Custom Domain
1. Go to your app in Digital Ocean
2. Click **Settings** → **Domains**
3. Add your custom domain
4. Update your DNS records as instructed

### 5.2 Update Environment Variables
Update the environment variables with your custom domains:
```env
APP_URL=https://api.yourdomain.com
CORS_ORIGIN=https://yourdomain.com
```

## Step 6: Database Migration and Initial Setup

### 6.1 Run Database Migration
Connect to your database and run:
```sql
-- Run the complete schema.sql file
\i schema.sql

-- Verify tables are created
\dt
```

### 6.2 Create Initial Admin User
```sql
INSERT INTO users (name, email, password, role, created_at) 
VALUES (
    'Admin User', 
    'admin@yourdomain.com', 
    '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- password: password
    'Admin', 
    NOW()
);
```

## Step 7: SSL and Security Configuration

### 7.1 SSL Certificate
- Digital Ocean automatically provides SSL certificates
- Ensure **Force HTTPS** is enabled in app settings

### 7.2 Security Headers
The backend already includes security headers. Verify in `backend/index.php`:
```php
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');
```

## Step 8: Monitoring and Logging

### 8.1 Enable Monitoring
1. Go to your app → **Insights**
2. Monitor CPU, Memory, and Request metrics
3. Set up alerts for high resource usage

### 8.2 View Logs
- **Runtime Logs**: App Platform → Your App → Runtime Logs
- **Build Logs**: Available during deployment
- **Database Logs**: Database Cluster → Logs

## Step 9: Production Optimizations

### 9.1 Database Optimizations
```sql
-- Create additional indexes for better performance
CREATE INDEX idx_sales_created_at ON sales(created_at);
CREATE INDEX idx_inventory_product_id ON inventory(product_id);
CREATE INDEX idx_customers_email ON customers(email);
```

### 9.2 Backend Optimizations
1. Enable PHP OPcache in production
2. Use connection pooling for database
3. Implement Redis for session storage (optional)

### 9.3 Frontend Optimizations
1. Enable gzip compression
2. Set up CDN for static assets
3. Implement service worker for PWA features

## Step 10: Backup and Recovery

### 10.1 Database Backups
1. Digital Ocean automatically backs up your database
2. Configure backup retention period
3. Test restore procedures

### 10.2 Application Backups
1. Your code is backed up in GitHub
2. Environment variables should be documented securely
3. Regular database exports for additional safety

## Troubleshooting

### Common Issues

**Database Connection Failed:**
```bash
# Check connection string format
postgresql://username:password@host:port/database?sslmode=require

# Verify firewall rules allow connections
# Ensure database cluster is in same region as app
```

**Build Failures:**
```bash
# Backend: Check composer.json dependencies
# Frontend: Verify Node.js version compatibility
# Check build logs in App Platform
```

**CORS Errors:**
```bash
# Verify CORS_ORIGIN environment variable
# Check frontend API_URL configuration
# Ensure proper headers in backend
```

**SSL Certificate Issues:**
```bash
# Wait 24-48 hours for DNS propagation
# Verify domain DNS settings
# Check domain verification status
```

## Cost Optimization

### Development Environment
- **Database**: Basic plan (~$15/month)
- **App Platform**: Basic plan (~$5/month)
- **Total**: ~$20/month

### Production Environment
- **Database**: Professional plan (~$60/month)
- **App Platform**: Professional plan (~$12/month)
- **Total**: ~$72/month

## Security Checklist

- [ ] Strong JWT secret key
- [ ] Database credentials secured
- [ ] HTTPS enforced
- [ ] CORS properly configured
- [ ] Input validation enabled
- [ ] SQL injection protection
- [ ] Rate limiting implemented
- [ ] Error logging configured
- [ ] Regular security updates

## Support and Maintenance

### Regular Tasks
1. **Weekly**: Monitor application performance
2. **Monthly**: Review database performance and optimize
3. **Quarterly**: Update dependencies and security patches
4. **Yearly**: Review and update SSL certificates

### Scaling Considerations
- Monitor database connection limits
- Consider read replicas for high traffic
- Implement caching strategies
- Use CDN for global distribution

## Additional Resources

- [Digital Ocean App Platform Documentation](https://docs.digitalocean.com/products/app-platform/)
- [PostgreSQL on Digital Ocean](https://docs.digitalocean.com/products/databases/postgresql/)
- [PHP Deployment Best Practices](https://docs.digitalocean.com/developer-center/deploy-a-php-app-on-app-platform/)
- [React Deployment Guide](https://docs.digitalocean.com/developer-center/deploy-a-react-app-on-app-platform/)

---

**Need Help?** Contact Digital Ocean support or refer to the Ardent POS documentation for additional assistance.
