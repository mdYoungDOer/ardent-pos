# Ardent POS Deployment Guide

## Quick Setup

### 1. Environment Setup
Copy the environment template and configure your settings:
```bash
cp .env.example .env
```

Edit `.env` with your actual values:
- Database credentials
- JWT secret key
- Paystack API keys
- SendGrid API key

### 2. Database Setup
Run the migration script:
```bash
cd db
php migrate.php
```

### 3. Install Dependencies

**Backend:**
```bash
cd backend
composer install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 4. Development Servers

**Backend (PHP):**
```bash
cd backend
php -S localhost:8000
```

**Frontend (React):**
```bash
cd frontend
npm start
```

## Docker Deployment

### Using Docker Compose
```bash
# Copy environment file
cp .env.example .env

# Edit .env with your values
nano .env

# Start all services
docker-compose up -d
```

### Manual Docker Build

**Database:**
```bash
docker run -d \
  --name ardent-postgres \
  -e POSTGRES_DB=ardent_pos \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  -v ./db/init.sql:/docker-entrypoint-initdb.d/init.sql \
  postgres:14
```

**Backend:**
```bash
cd backend
docker build -t ardent-pos-backend .
docker run -d \
  --name ardent-backend \
  --link ardent-postgres:database \
  -p 8000:8000 \
  ardent-pos-backend
```

**Frontend:**
```bash
cd frontend
docker build -t ardent-pos-frontend .
docker run -d \
  --name ardent-frontend \
  --link ardent-backend:backend \
  -p 3000:80 \
  ardent-pos-frontend
```

## Digital Ocean App Platform

### 1. Repository Setup
1. Push code to GitHub repository
2. Connect GitHub account to Digital Ocean

### 2. App Configuration
Create `app.yaml` in root directory:
```yaml
name: ardent-pos
services:
- name: frontend
  source_dir: /frontend
  github:
    repo: your-username/ardent-pos
    branch: main
  run_command: npm start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  routes:
  - path: /
  envs:
  - key: REACT_APP_API_URL
    value: ${backend.PUBLIC_URL}

- name: backend
  source_dir: /backend
  github:
    repo: your-username/ardent-pos
    branch: main
  run_command: php -S 0.0.0.0:8080
  environment_slug: php
  instance_count: 1
  instance_size_slug: basic-xxs
  routes:
  - path: /api
  envs:
  - key: DB_HOST
    value: ${db.HOSTNAME}
  - key: DB_PORT
    value: ${db.PORT}
  - key: DB_NAME
    value: ${db.DATABASE}
  - key: DB_USER
    value: ${db.USERNAME}
  - key: DB_PASS
    value: ${db.PASSWORD}

databases:
- name: db
  engine: PG
  version: "14"
```

### 3. Environment Variables
Set in Digital Ocean dashboard:
- `JWT_SECRET`
- `PAYSTACK_PUBLIC_KEY`
- `PAYSTACK_SECRET_KEY`
- `SENDGRID_API_KEY`
- `SENDGRID_FROM_EMAIL`

## Production Checklist

### Security
- [ ] Change default admin password
- [ ] Set strong JWT secret
- [ ] Configure HTTPS
- [ ] Set up firewall rules
- [ ] Enable rate limiting

### Performance
- [ ] Enable gzip compression
- [ ] Set up CDN for static assets
- [ ] Configure database connection pooling
- [ ] Set up caching (Redis/Memcached)

### Monitoring
- [ ] Set up error logging
- [ ] Configure uptime monitoring
- [ ] Set up database backups
- [ ] Configure email alerts

### Integrations
- [ ] Test Paystack payments
- [ ] Verify SendGrid emails
- [ ] Set up webhook endpoints

## Troubleshooting

### Common Issues

**Database Connection Failed:**
- Check database credentials in `.env`
- Ensure PostgreSQL is running
- Verify network connectivity

**JWT Token Invalid:**
- Check JWT_SECRET in environment
- Ensure consistent secret across instances

**CORS Errors:**
- Verify CORS_ORIGIN setting
- Check API URL configuration

**Payment Integration Issues:**
- Verify Paystack keys
- Check webhook URLs
- Test in sandbox mode first

### Logs
- Backend logs: Check Apache/PHP error logs
- Frontend logs: Browser console
- Database logs: PostgreSQL logs
- Docker logs: `docker logs container-name`

## Support

For technical support:
1. Check the troubleshooting section
2. Review application logs
3. Contact system administrator
4. Submit GitHub issues for bugs

## Backup & Recovery

### Database Backup
```bash
pg_dump -h localhost -U postgres ardent_pos > backup.sql
```

### Database Restore
```bash
psql -h localhost -U postgres -d ardent_pos < backup.sql
```

### File Backup
- Application code (version controlled)
- Environment files (secure storage)
- User uploads (if any)
- Configuration files
