# Ardent POS - Professional Point of Sale System

A comprehensive, mobile-first Point of Sale (POS) web application for small to medium businesses.

## Features

- **Mobile-First Design**: Optimized for smartphones and tablets used by cashiers
- **Role-Based Access Control**: Admin, Manager, Cashier, Inventory Staff, and Viewer roles
- **Real-Time Inventory Management**: Track stock levels with automated alerts
- **Integrated Payments**: Paystack integration for secure payment processing
- **Customer Management**: Track customer data and loyalty points
- **Comprehensive Reporting**: Sales analytics with visual charts
- **Email Notifications**: SendGrid integration for automated communications

## Tech Stack

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Pure PHP with RESTful API
- **Database**: PostgreSQL
- **Payments**: Paystack
- **Email**: SendGrid
- **Authentication**: JWT-based

## Project Structure

```
/frontend/          # React.js application
/backend/           # PHP REST API
/db/                # Database migrations and schema
/docker/            # Docker configuration
```

## Quick Start

### Prerequisites

- Node.js 18+
- PHP 8.1+
- PostgreSQL 14+
- Composer

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mdYoungDOer/ardent-pos.git
cd ardent-pos
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database and API credentials
```

3. Install dependencies:
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
composer install
```

4. Set up database:
```bash
cd ../db
php migrate.php
```

5. Start development servers:
```bash
# Frontend (port 3000)
cd frontend
npm start

# Backend (port 8000)
cd ../backend
php -S localhost:8000
```

## Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ardent_pos
DB_USER=your_username
DB_PASS=your_password

# JWT
JWT_SECRET=your_jwt_secret_key

# Paystack
PAYSTACK_PUBLIC_KEY=your_paystack_public_key
PAYSTACK_SECRET_KEY=your_paystack_secret_key

# SendGrid
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@yourapp.com
```

## API Documentation

The API follows RESTful conventions. All endpoints are prefixed with `/api/`.

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Password reset request

### Products
- `GET /api/products` - List all products
- `POST /api/products` - Create new product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

### Sales
- `POST /api/sales` - Process a sale
- `GET /api/sales` - Get sales history

### Inventory
- `GET /api/inventory` - Get inventory levels
- `PUT /api/inventory/{id}` - Update stock levels

## Deployment

### Docker

```bash
docker-compose up -d
```

### Digital Ocean App Platform

1. Fork this repository
2. Connect your GitHub account to Digital Ocean
3. Create a new app and select this repository
4. Configure environment variables in the Digital Ocean dashboard
5. Deploy!

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
