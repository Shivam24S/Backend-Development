# QuickNest - Service Booking Backend API

A comprehensive RESTful API backend for a service booking platform built with **Node.js**, **Express**, and **MongoDB**. This application provides a complete solution for managing service providers, users, bookings, and administrative operations with advanced features like real-time notifications, cloud storage, and caching.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Routes](#api-routes)
- [Database Schema](#database-schema)
- [Middleware](#middleware)
- [Authentication & Authorization](#authentication--authorization)
- [Error Handling](#error-handling)
- [Configuration Files](#configuration-files)
- [Utilities & Services](#utilities--services)
- [Security Features](#security-features)
- [Best Practices](#best-practices)

---

## 🎯 Overview

QuickNest is a production-ready backend API designed for service booking platforms. It manages the complete lifecycle of service bookings, from provider registration and service management to user bookings and administrative oversight. The application emphasizes security, performance, and scalability with enterprise-level features.

**Use Cases:**
- On-demand service platforms (cleaning, repair, consultation)
- Professional service marketplaces
- Booking and scheduling systems
- Service provider networks

---

## ✨ Features

### User Management
- User registration and authentication
- Profile management and updates
- Role-based access (User, Provider, Admin)
- Account status management

### Service Provider Features
- Provider registration and verification
- Service catalog creation and management
- Service category organization
- Profile and availability management

### Booking System
- Create, read, update, and cancel bookings
- Booking status tracking (pending, confirmed, completed, cancelled)
- Real-time booking updates
- Booking history and analytics

### Admin Dashboard
- User and provider management
- Booking oversight and control
- Category management
- Audit logging and system monitoring
- Analytics and reporting

### Communication
- **Email Notifications**: Automated emails for bookings, confirmations, cancellations
- **WhatsApp/SMS Integration**: Customer notifications via Twilio
- **Email Templates**: Professional HTML email templates

### Media Management
- Cloud-based image storage via Cloudinary
- Automatic image optimization
- Profile picture and service image uploads
- Secure file handling

### Caching & Performance
- Redis integration for session caching
- Database query optimization
- Improved response times
- Scalable architecture

### Security & Compliance
- JWT-based authentication with expiration
- Password encryption with bcryptjs
- Rate limiting to prevent abuse
- XSS and parameter pollution protection
- Security headers with Helmet
- Input validation with Joi
- Audit logging of all operations

---

## 🛠 Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Runtime** | Node.js | 18+ |
| **Framework** | Express.js | 5.2.1 |
| **Database** | MongoDB | Latest |
| **ODM** | Mongoose | 9.3.2 |
| **Authentication** | JWT | 9.0.3 |
| **Password Security** | bcryptjs | 3.0.3 |
| **Input Validation** | Joi | 18.1.1 |
| **Security** | Helmet | 8.1.0 |
| **Rate Limiting** | express-rate-limit | 8.4.1 |
| **Parameter Protection** | hpp | 0.2.3 |
| **File Upload** | Multer | 2.1.1 |
| **Cloud Storage** | Cloudinary | 1.41.3 |
| **Email** | Nodemailer | 8.0.5 |
| **SMS/WhatsApp** | Twilio | 6.0.0 |
| **Caching** | Redis | 5.12.1 |
| **Dev Tool** | Nodemon | 3.1.14 |

---

## 📁 Project Structure

```
12_quickNest/
│
├── config/                          # Configuration Modules
│   ├── cloudinary.js               # Cloudinary setup for image storage
│   ├── db.js                       # MongoDB connection setup
│   ├── email.js                    # Email service configuration
│   ├── redis.js                    # Redis cache configuration
│   └── twilio.js                   # Twilio SMS/WhatsApp setup
│
├── controller/                      # Request Handlers & Business Logic
│   ├── adminController.js          # Admin operations
│   ├── bookingController.js        # Booking management
│   ├── categoryController.js       # Service category management
│   ├── providerController.js       # Service provider operations
│   ├── serviceController.js        # Service management
│   └── userController.js           # User account operations
│
├── middleware/                      # Express Middleware
│   ├── auth.js                     # JWT authentication middleware
│   ├── checkRole.js                # Role-based access control
│   ├── HttpError.js                # Custom error handling
│   ├── rateLimit.js                # Rate limiting configuration
│   ├── upload.js                   # File upload middleware
│   └── validate.js                 # Request validation middleware
│
├── model/                           # Mongoose Database Schemas
│   ├── AuditLog.js                 # System audit trail schema
│   ├── Booking.js                  # Booking records schema
│   ├── Category.js                 # Service categories schema
│   ├── Provider.js                 # Service providers schema
│   ├── Services.js                 # Services schema
│   └── User.js                     # User accounts schema
│
├── routes/                          # API Route Definitions
│   ├── adminRoutes.js              # Admin endpoints
│   ├── bookingRoutes.js            # Booking endpoints
│   ├── providerRoutes.js           # Provider endpoints
│   └── userRoutes.js               # User endpoints
│
├── services/                        # Reusable Business Services
│   └── emailTemplate.js            # HTML email templates
│
├── utils/                           # Utility Functions
│   ├── auditLogger.js              # Log all system operations
│   ├── sendEmail.js                # Email sending utility
│   └── sendWhatsAppMessage.js      # WhatsApp messaging utility
│
├── validation/                      # Joi Validation Schemas
│   ├── categorySchema.js           # Category validation rules
│   ├── serviceSchema.js            # Service validation rules
│   └── userSchema.js               # User validation rules
│
├── server.js                        # Application Entry Point
├── package.json                     # Project Dependencies
├── .env.example                     # Environment variables template
├── .gitignore                       # Git ignore rules
└── README.md                        # Project documentation
```

---

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn** (comes with Node.js)
- **MongoDB** (local or cloud - MongoDB Atlas)
- **Redis** (for caching features)
- **Cloudinary Account** (for image storage)
- **Twilio Account** (for SMS/WhatsApp)
- **Email Service** (Gmail, SendGrid, etc. for Nodemailer)

### Step-by-Step Installation

1. **Clone the Repository**
```bash
git clone https://github.com/yourusername/quicknest.git
cd 12_quickNest
```

2. **Install Dependencies**
```bash
npm install
```

3. **Create Environment Configuration**
```bash
cp .env.example .env
```
Then edit `.env` with your actual credentials (see Environment Variables section)

4. **Verify MongoDB Connection**
```bash
# Test MongoDB connection
mongo mongodb://localhost:27017/quicknest
```

5. **Start Redis (if using locally)**
```bash
# On Windows with Redis installed
redis-server

# Or use WSL/Docker
docker run -d -p 6379:6379 redis
```

6. **Start the Application**
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will start at `http://localhost:5000` (default port from your .env)

---

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following configuration:

```env
# ==========================================
# SERVER CONFIGURATION
# ==========================================
PORT=5000
NODE_ENV=development

# ==========================================
# DATABASE CONFIGURATION
# ==========================================
# MongoDB Connection String (local or MongoDB Atlas)
MONGO_URI=mongodb://localhost:27017/quicknest
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/quicknest?retryWrites=true&w=majority

# ==========================================
# JWT AUTHENTICATION
# ==========================================
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# ==========================================
# REDIS CACHE
# ==========================================
# Local Redis
REDIS_URL=redis://localhost:6379
# OR Cloud Redis (e.g., Redis Cloud)
# REDIS_URL=redis://:password@host:port

# ==========================================
# CLOUDINARY (Image Storage)
# ==========================================
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# ==========================================
# EMAIL CONFIGURATION (Nodemailer)
# ==========================================
# Gmail Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
# For Gmail: Generate App Password at https://myaccount.google.com/apppasswords

# ==========================================
# TWILIO (SMS/WhatsApp)
# ==========================================
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# ==========================================
# APPLICATION SETTINGS
# ==========================================
# Session expiry time
SESSION_EXPIRY=24h

# Rate limiting (requests per minute)
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100

# ==========================================
# OPTIONAL SETTINGS
# ==========================================
LOG_LEVEL=debug
# Allowed origins for CORS
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
```

### Getting API Credentials

**MongoDB Atlas:**
- Visit: https://www.mongodb.com/cloud/atlas
- Create account and cluster
- Copy connection string

**Cloudinary:**
- Sign up: https://cloudinary.com
- Go to Dashboard → Settings
- Copy Cloud Name, API Key, and API Secret

**Twilio:**
- Sign up: https://www.twilio.com
- Create phone number and project
- Copy Account SID and Auth Token from console

**Gmail (Nodemailer):**
- Enable 2-Factor Authentication
- Generate App Password: https://myaccount.google.com/apppasswords
- Use generated password as `EMAIL_PASS`

**Redis:**
- Local: Install and run `redis-server`
- Cloud: Use Redis Cloud (https://redis.com/try-free/) or AWS ElastiCache

---

## 📊 Running the Application

### Development Mode
```bash
npm run dev
```
- Runs with **Nodemon** for automatic reload on file changes
- Source maps enabled for debugging
- Detailed error messages

### Production Mode
```bash
npm start
```
- Single process execution
- Optimized for performance
- Production error handling

### Testing
```bash
npm test
```
(Configure test setup in package.json)

### Monitoring

Check server health:
```bash
curl http://localhost:5000/
# Expected response: {"message": "hello from server"}
```

---

## 🔗 API Routes

### Base URL
```
http://localhost:5000
```

All requests should include authentication token in header:
```
Authorization: Bearer <jwt_token>
```

---

### **USER ROUTES** (`/user`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/user/register` | Register new user account | ❌ |
| POST | `/user/login` | User login (returns JWT) | ❌ |
| GET | `/user/profile` | Get current user profile | ✅ |
| PUT | `/user/profile` | Update user profile | ✅ |
| DELETE | `/user/account` | Delete user account | ✅ |
| GET | `/user/bookings` | Get user's bookings | ✅ |

**Request Example - Register:**
```json
POST /user/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "phone": "+1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

### **PROVIDER ROUTES** (`/provider`)

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| POST | `/provider/register` | Register service provider | ❌ | - |
| POST | `/provider/services` | Add new service | ✅ | Provider |
| GET | `/provider/services` | Get provider's services | ✅ | Provider |
| PUT | `/provider/services/:id` | Update service | ✅ | Provider |
| DELETE | `/provider/services/:id` | Delete service | ✅ | Provider |
| GET | `/provider/profile` | Get provider profile | ✅ | Provider |
| PUT | `/provider/profile` | Update provider profile | ✅ | Provider |
| GET | `/provider/bookings` | Get provider's bookings | ✅ | Provider |

**Request Example - Add Service:**
```json
POST /provider/services
Authorization: Bearer <jwt_token>
{
  "name": "Home Cleaning",
  "description": "Professional home cleaning service",
  "category": "category_id",
  "basePrice": 50,
  "duration": 120,
  "images": ["image_url"]
}
```

---

### **BOOKING ROUTES** (`/booking`)

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| POST | `/booking/create` | Create new booking | ✅ | User |
| GET | `/booking/:id` | Get booking details | ✅ | - |
| GET | `/booking` | Get all bookings | ✅ | - |
| PUT | `/booking/:id` | Update booking status | ✅ | - |
| DELETE | `/booking/:id` | Cancel booking | ✅ | - |

**Request Example - Create Booking:**
```json
POST /booking/create
Authorization: Bearer <jwt_token>
{
  "serviceId": "service_id",
  "providerId": "provider_id",
  "date": "2026-05-20T10:00:00Z",
  "duration": 120,
  "location": "123 Main St, City"
}
```

---

### **ADMIN ROUTES** (`/admin`)

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| GET | `/admin/users` | List all users | ✅ | Admin |
| GET | `/admin/providers` | List all providers | ✅ | Admin |
| GET | `/admin/bookings` | List all bookings | ✅ | Admin |
| GET | `/admin/categories` | List all categories | ✅ | Admin |
| DELETE | `/admin/users/:id` | Delete user | ✅ | Admin |
| DELETE | `/admin/providers/:id` | Delete provider | ✅ | Admin |
| GET | `/admin/audit-logs` | View system audit logs | ✅ | Admin |
| GET | `/admin/statistics` | Get platform statistics | ✅ | Admin |

**Request Example - Get Users:**
```json
GET /admin/users?page=1&limit=10
Authorization: Bearer <admin_jwt_token>
```

---

## 📊 Database Schema

### User Schema
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  avatar: String (Cloudinary URL),
  role: String (enum: ['user', 'provider', 'admin']),
  status: String (enum: ['active', 'inactive', 'suspended']),
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  bookingHistory: [ObjectId],
  ratings: Number,
  reviews: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### Provider Schema
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  businessName: String,
  description: String,
  avatar: String (Cloudinary URL),
  serviceCategories: [ObjectId] (ref: Category),
  rating: Number,
  reviewCount: Number,
  isVerified: Boolean,
  documents: [String] (Cloudinary URLs),
  availability: {
    days: [String],
    startTime: String,
    endTime: String
  },
  location: {
    latitude: Number,
    longitude: Number,
    city: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Service Schema
```javascript
{
  _id: ObjectId,
  providerId: ObjectId (ref: Provider),
  categoryId: ObjectId (ref: Category),
  name: String,
  description: String,
  basePrice: Number,
  duration: Number (minutes),
  images: [String] (Cloudinary URLs),
  rating: Number,
  reviewCount: Number,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Booking Schema
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  providerId: ObjectId (ref: Provider),
  serviceId: ObjectId (ref: Service),
  status: String (enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled']),
  bookingDate: Date,
  duration: Number (minutes),
  location: String,
  amount: Number,
  notes: String,
  rating: Number,
  review: String,
  cancellationReason: String,
  cancellationDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Category Schema
```javascript
{
  _id: ObjectId,
  name: String (unique),
  description: String,
  icon: String (Cloudinary URL),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### AuditLog Schema
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  action: String,
  entityType: String,
  entityId: ObjectId,
  changes: Object,
  ipAddress: String,
  userAgent: String,
  status: String (enum: ['success', 'failure']),
  createdAt: Date
}
```

---

## 🔄 Middleware

### Authentication Middleware (`auth.js`)
- Verifies JWT token in Authorization header
- Extracts user information from token
- Passes user data to protected routes
- Returns 401 if token is invalid or expired

### Role-Based Access Control (`checkRole.js`)
- Validates user role for specific endpoints
- Supports roles: admin, provider, user
- Returns 403 if user lacks required role

### Rate Limiting (`rateLimit.js`)
- Prevents API abuse through request throttling
- Configurable by route
- Default: 100 requests per 15 minutes per IP

### File Upload (`upload.js`)
- Handles multipart form data
- Integrates with Multer and Cloudinary
- Validates file types and sizes
- Supports multiple file formats (jpg, png, pdf)

### Input Validation (`validate.js`)
- Validates request data using Joi schemas
- Returns 400 with validation errors if data is invalid
- Schemas defined in `/validation` directory

### Error Handling (`HttpError.js`)
- Custom error class for consistent error responses
- Captures status code and message
- Handles async errors gracefully

---

## 🔐 Authentication & Authorization

### JWT Authentication Flow

1. **User Registration/Login**
   - User provides credentials
   - Server validates credentials
   - JWT token generated with user ID, role, and expiration
   - Token returned to client

2. **Token Usage**
   - Client includes token in Authorization header: `Bearer <token>`
   - Server verifies token signature and expiration
   - Request proceeds if valid, rejected if invalid

3. **Token Expiration**
   - Tokens expire after configured time (default: 7 days)
   - Client must request new token (refresh token flow)
   - Expired tokens return 401 Unauthorized

### Role-Based Access Control

**Roles:**
- **admin**: Full system access, user management
- **provider**: Can manage services and view bookings
- **user**: Can book services, view profile

**Route Protection Example:**
```javascript
// Only admin can access
router.get('/admin/users', auth, checkRole(['admin']), controller.getAllUsers);

// Only provider can access
router.post('/provider/services', auth, checkRole(['provider']), controller.addService);
```

---

## ⚠️ Error Handling

### Error Response Format
```json
{
  "message": "Error description",
  "statusCode": 400,
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### Common HTTP Status Codes
| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing/invalid token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Resource already exists |
| 500 | Server Error - Unexpected error |

---

## ⚙️ Configuration Files

### Cloudinary Configuration (`config/cloudinary.js`)
```javascript
// Handles image uploads and storage
- Cloud storage for profile pictures
- Service images
- Document verification uploads
```

### Database Configuration (`config/db.js`)
```javascript
// MongoDB connection setup
- Connection pooling
- Error handling
- Connection status logging
```

### Email Configuration (`config/email.js`)
```javascript
// Nodemailer setup for email notifications
- SMTP configuration
- Email templates
- Sends booking confirmations, cancellations
```

### Redis Configuration (`config/redis.js`)
```javascript
// Redis client setup for caching
- Connection management
- Session storage
- Cache expiration policies
```

### Twilio Configuration (`config/twilio.js`)
```javascript
// SMS/WhatsApp messaging
- Account authentication
- Message templates
- Sends notifications to users
```

---

## 🛠 Utilities & Services

### Email Utility (`utils/sendEmail.js`)
- Sends HTML emails via Nodemailer
- Supports custom templates
- Error handling and retries

### WhatsApp/SMS Utility (`utils/sendWhatsAppMessage.js`)
- Sends SMS/WhatsApp messages via Twilio
- Message templates for different scenarios
- Delivery status tracking

### Audit Logger (`utils/auditLogger.js`)
- Logs all system operations
- Records user actions and changes
- Tracks IP address and user agent
- Used for compliance and debugging

### Email Templates (`services/emailTemplate.js`)
- Pre-designed HTML email templates
- Booking confirmations
- Status updates
- Account notifications

---

## 🔒 Security Features

### 1. **Password Security**
- Passwords hashed with bcryptjs (salt rounds: 10)
- Passwords never stored in plain text
- Password reset via email verification

### 2. **JWT Authentication**
- Secure token-based authentication
- Signed with secret key
- Includes expiration time
- Prevents token tampering

### 3. **Rate Limiting**
- Prevents brute force attacks
- Limits requests per IP
- Configurable per route
- Returns 429 Too Many Requests when exceeded

### 4. **Security Headers (Helmet)**
- X-Frame-Options: Prevent clickjacking
- X-Content-Type-Options: Prevent MIME sniffing
- Strict-Transport-Security: Enforce HTTPS
- Content-Security-Policy: Prevent XSS

### 5. **Parameter Pollution Protection (HPP)**
- Prevents HTTP parameter pollution attacks
- Sanitizes duplicate parameters

### 6. **Input Validation (Joi)**
- Server-side validation of all inputs
- Prevents injection attacks
- Type checking and format validation

### 7. **Audit Logging**
- Tracks all sensitive operations
- Records user actions
- Enables compliance and forensics

### 8. **Role-Based Access Control**
- Ensures users access only permitted resources
- Admin-only endpoints protected
- Provider-specific operations restricted

---

## 📋 Best Practices

### Code Organization
- Separate concerns: routes, controllers, models
- Reusable middleware for common operations
- Configuration files for environment variables

### Error Handling
- Custom error class for consistency
- Try-catch blocks in async functions
- Centralized error middleware

### Database
- Use indexes for frequently queried fields
- Implement pagination for list endpoints
- Use lean() for read-only queries (performance)

### Security
- Never commit .env files
- Use environment variables for secrets
- Validate and sanitize all inputs
- Implement HTTPS in production

### Performance
- Redis caching for frequently accessed data
- Database query optimization
- Pagination for large datasets
- Image optimization via Cloudinary

### API Design
- RESTful principles
- Consistent endpoint naming
- Proper HTTP status codes
- Comprehensive error messages

### Testing
- Unit tests for utilities
- Integration tests for API routes
- Test authentication flows
- Mock external services

---

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongod --version

# Test connection string
mongo <YOUR_MONGO_URI>
```

### Redis Connection Issues
```bash
# Check if Redis is running
redis-cli ping

# Should return: PONG
```

### Email Not Sending
- Verify SMTP credentials
- Check Gmail app-specific password
- Ensure "Less secure app access" is enabled (or use app password)

### Cloudinary Upload Errors
- Verify API credentials
- Check file size limits
- Ensure file type is supported

### JWT Errors
- Check token expiration
- Verify JWT_SECRET matches
- Ensure header format is correct: `Bearer <token>`

---

## 📝 Development Tips

### Debugging
```bash
# Enable verbose logging
DEBUG=* npm run dev

# Use Node debugger
node --inspect server.js
```

### Database Queries
```javascript
// Use lean() for read-only queries
User.find().lean(); // Faster for large datasets

// Use select() to limit fields
User.find().select('name email -_id');

// Use populate() for references
Booking.find().populate('userId').populate('serviceId');
```

### Performance Monitoring
- Monitor MongoDB slow queries
- Check Redis hit rates
- Monitor API response times
- Track error rates

---

## 📞 Support & Contribution

### Getting Help
- Check error messages carefully
- Review API documentation above
- Check environment variables are set
- Verify database connectivity

### Contributing
1. Fork the repository
2. Create feature branch: `git checkout -b feature/feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature/feature-name`
5. Create pull request

### Reporting Issues
- Include error messages and logs
- Specify Node.js and package versions
- Provide reproduction steps
- Include relevant code snippets

---

## 📄 License

ISC License - See LICENSE file for details

---

## 👨‍💻 Author

**Your Name/Team**
- Email: your.email@example.com
- GitHub: [Your GitHub Profile](https://github.com/yourprofile)

---

## 🙏 Acknowledgments

- Express.js team
- MongoDB & Mongoose
- All open-source contributors

---

**Last Updated:** May 13, 2026

For the latest updates and issues, visit the [GitHub Repository](https://github.com/yourusername/quicknest).
