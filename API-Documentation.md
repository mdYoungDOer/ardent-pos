# Ardent POS API Documentation

## Base URL
```
http://localhost:8000
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password

### Dashboard
- `GET /dashboard` - Get dashboard data

### Products
- `GET /products` - List products (with pagination)
- `POST /products` - Create product
- `GET /products/{id}` - Get product details
- `PUT /products/{id}` - Update product
- `DELETE /products/{id}` - Delete product

### Sales
- `GET /sales` - List sales
- `POST /sales` - Create sale
- `GET /sales/{id}` - Get sale details

### Inventory
- `GET /inventory` - List inventory items
- `PUT /inventory/{id}` - Update stock
- `GET /inventory/low-stock` - Get low stock items

### Customers
- `GET /customers` - List customers
- `POST /customers` - Create customer
- `GET /customers/{id}` - Get customer details
- `PUT /customers/{id}` - Update customer
- `DELETE /customers/{id}` - Delete customer

### Orders
- `GET /orders` - List orders
- `POST /orders` - Create order
- `GET /orders/{id}` - Get order details
- `PUT /orders/{id}/status` - Update order status
- `GET /payments/history` - Get payment history

### Payments
- `POST /payments/initialize` - Initialize payment
- `GET /payments/verify` - Verify payment
- `POST /payments/webhook` - Payment webhook

## Request/Response Examples

### Login
```json
POST /auth/login
{
  "email": "admin@ardentpos.com",
  "password": "password"
}

Response:
{
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@ardentpos.com",
    "role": "Admin"
  }
}
```

### Create Product
```json
POST /products
{
  "name": "Product Name",
  "sku": "SKU123",
  "price": 100.00,
  "cost": 50.00,
  "category_id": 1,
  "description": "Product description"
}
```

### Create Sale
```json
POST /sales
{
  "customer_id": 1,
  "items": [
    {
      "product_id": 1,
      "quantity": 2,
      "unit_price": 100.00
    }
  ],
  "total_amount": 200.00,
  "payment_method": "cash"
}
```

## Error Responses
```json
{
  "error": "Error message",
  "code": 400
}
```

## Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error
