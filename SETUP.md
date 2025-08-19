# Ardent POS Setup Guide

## Quick Start

### 1. Prerequisites
- PHP 8.1+
- Node.js 18+
- PostgreSQL 14+
- Composer
- npm/yarn

### 2. Environment Setup
```bash
# Clone or download the project
cd "Ardent POS"

# Copy environment file
cp .env.example .env

# Edit .env with your database and API credentials
```

### 3. Backend Setup
```bash
cd backend
composer install
```

### 4. Database Setup
```bash
cd db
php migrate.php
```

### 5. Frontend Setup
```bash
cd frontend
npm install
```

### 6. Development Servers

**Start Backend:**
```bash
cd backend
php -S localhost:8000
```

**Start Frontend:**
```bash
cd frontend
npm start
```

### 7. Docker Setup (Alternative)
```bash
# Copy environment file
cp .env.example .env

# Start all services
docker-compose up -d
```

## Default Login
- **Email:** admin@ardentpos.com
- **Password:** admin123

## Environment Variables

### Required
- `DB_HOST` - Database host
- `DB_NAME` - Database name
- `DB_USER` - Database username
- `DB_PASS` - Database password
- `JWT_SECRET` - JWT signing secret

### Optional (for full functionality)
- `PAYSTACK_PUBLIC_KEY` - Paystack public key
- `PAYSTACK_SECRET_KEY` - Paystack secret key
- `SENDGRID_API_KEY` - SendGrid API key
- `SENDGRID_FROM_EMAIL` - SendGrid sender email

## Testing
```bash
# Backend tests
cd backend
./vendor/bin/phpunit

# Frontend tests
cd frontend
npm test
```

## Deployment
See `deployment-guide.md` for detailed deployment instructions.

## Support
- Check `README.md` for detailed documentation
- Review `API-Documentation.md` for API reference
- Check logs for troubleshooting
