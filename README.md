# 🚀 Backend Development — Complete Learning Journey

This repository is a step-by-step, hands-on guide to **Node.js & Express.js Backend Development**. Starting from the very basics of Node.js modules and HTTP servers, it progresses all the way to a production-ready, full-featured REST API with authentication, file uploads, cloud storage, real-time notifications, and role-based access control.

---

## 📚 Table of Contents

1. [Node.js Modules](#1-nodejs-modules)
2. [HTTP Servers](#2-http-servers)
3. [Express Introduction](#3-express-introduction)
4. [EJS Templating & In-Memory CRUD](#4-ejs-templating--in-memory-crud)
5. [Middlewares](#5-middlewares)
6. [Express REST API CRUD](#6-express-rest-api-crud)
7. [Student Management System (MongoDB)](#7-student-management-system-mongodb)
8. [LinkedIn-style Profile App (Multer)](#8-linkedin-style-profile-app-multer)
9. [E-Commerce API (Multer + Cloudinary)](#9-e-commerce-api-multer--cloudinary)
10. [JWT Authentication](#10-jwt-authentication)
11. [Google OAuth 2.0](#11-google-oauth-20)
12. [QuickNest — Full-Stack Service Booking API](#12-quicknest--full-stack-service-booking-api)
- [Tech Stack](#-tech-stack)
- [How to Run Any Module](#-how-to-run-any-module)
- [Key Learnings & Concepts Covered](#-key-learnings--concepts-covered)
- [Why This Repository is Useful](#-why-this-repository-is-useful)

---

## 1. Node.js Modules

**Folder:** `1_modules/`

The journey begins with understanding the three types of modules in Node.js:

| Sub-folder | Description |
|---|---|
| `1.core-Modules` | Built-in modules like `fs`, `path`, `http`, `os`, etc. |
| `2.Local-Modules` | Writing and importing your own custom modules |
| `3.third-Party-Modules` | Installing and using npm packages |

**Concepts covered:**
- CommonJS `require` vs ES Module `import/export`
- `fs` for file reading/writing
- `path` for cross-platform file paths
- `os` for system information
- npm package management basics

---

## 2. HTTP Servers

**Folder:** `2_servers/`

Raw Node.js HTTP server creation without any framework.

| File | Description |
|---|---|
| `app.js` | Minimal HTTP server with `http.createServer()` |
| `customeServer1.js` | Custom server with request handling logic |
| `fileServer.js` | Server that serves static HTML files |
| `routesServer.js` | Basic manual routing by inspecting `req.url` |

**Concepts covered:**
- `http.createServer()` and `server.listen()`
- Reading `req.url` and `req.method` to handle routes
- Sending responses with `res.writeHead()` and `res.end()`
- Serving static files from disk

---

## 3. Express Introduction

**Folder:** `3_express_intro/`

First look at Express.js as a minimal web framework on top of Node.js.

**Concepts covered:**
- Installing Express with npm
- Creating an Express `app` instance
- Defining `GET` routes with `app.get()`
- Sending JSON responses with `res.json()`
- Starting the server with `app.listen()`

---

## 4. EJS Templating & In-Memory CRUD

**Folder:** `4_ejs_crud/`

A server-rendered Student List application using the EJS template engine.

**Features:**
- List all students on the home page
- Add a new student via a form (`POST /add`)
- Edit an existing student (`GET/POST /edit/:id`)
- Delete a student (`GET /delete/:id`)
- Serve static assets (CSS, images) from the `public/` folder

**Concepts covered:**
- Setting up EJS as a view engine (`app.set("view engine", "ejs")`)
- Rendering templates with `res.render()`
- Parsing form data with `express.urlencoded()`
- Serving static files with `express.static()`
- In-memory data storage (array-based, no database)
- Redirect after form submit (`res.redirect()`)

---

## 5. Middlewares

**Folder:** `5_middlewares/`

Deep dive into how Express middleware works.

**Concepts covered:**
- **Application-level middleware** — `app.use()` for JSON parsing
- **Route-level middleware** — Custom `checkRoll` guard for the `/admin` route
- **Error-handling middleware** — A 4-argument `(error, req, res, next)` handler for centralized error responses
- **Third-party middleware** — Integrating `helmet` for HTTP security headers
- **Custom HttpError class** — A reusable error class with `message` and `statusCode`
- Handling undefined/unknown routes with a catch-all `app.use()`

---

## 6. Express REST API CRUD

**Folder:** `6_express_crud/`

A pure REST API (no views) for a **Task Management** list, built entirely in-memory.

**Endpoints:**

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/taskList` | Get all tasks |
| GET | `/taskList/:id` | Get a single task by ID |
| POST | `/addTask` | Create a new task |
| PATCH | `/updateTask/:id` | Partially update a task |
| PUT | `/updateTasks/:id` | Replace a task entirely |
| DELETE | `/DeleteTask/:id` | Delete a task |

**Concepts covered:**
- RESTful API design principles
- Difference between `PUT` (full update) and `PATCH` (partial update)
- Route parameters (`req.params`)
- Centralized error handling
- Returning correct HTTP status codes (200, 201, 404, 500)

---

## 7. Student Management System (MongoDB)

**Folder:** `7_StudentManagementSystem-Mongo/`

The first project with a real database — **MongoDB via Mongoose**.

**Architecture:**
```
app.js
├── db/mongoose.js          # MongoDB connection
├── model/StudentModel.js   # Mongoose schema & model
├── routes/studentRoute.js  # Express router
├── controller/             # Business logic
└── middleware/HttpError.js # Custom error class
```

**Student Schema Fields:**
- `firstName`, `lastName` — required strings
- `email` — required, unique
- `phoneNumber` — required number
- `course` — enum: `Fullstack Development`, `Graphic Design`, `Video Editing`, `Ui/UX`
- Automatic `createdAt` / `updatedAt` timestamps

**Concepts covered:**
- Connecting to MongoDB Atlas with `mongoose.connect()`
- Defining schemas with `mongoose.Schema` and models with `mongoose.model()`
- Schema validators: `required`, `trim`, `unique`, `enum`, `min`
- Mongoose CRUD methods: `find`, `findById`, `create`, `findByIdAndUpdate`, `findByIdAndDelete`
- Separating concerns: routes → controllers → models
- Async/await with try-catch error handling

---

## 8. LinkedIn-style Profile App (Multer)

**Folder:** `8_Multer_linkedin_project/`

A profile management API inspired by LinkedIn, featuring **multi-file uploads** using Multer.

**Architecture:**
```
app.js
├── config/multer.js         # Multer storage & filter config
├── model/ProfileModel.js    # Profile schema
├── routes/profileRoutes.js  # Routes
├── controller/profileController.js
└── middleware/HttpError.js
```

**Profile Schema Fields:**
- `fullName`, `bio`, `headline`
- `profileImage` — single image path
- `resume` — single PDF/file path
- `projectImages` — array of image paths
- `introVideo` — video file path

**Concepts covered:**
- Installing and configuring **Multer** for `multipart/form-data`
- Multer `diskStorage` for saving files locally
- `upload.fields()` to handle multiple named file fields in one request
- File type filtering (accepting only images, PDFs, videos)
- Storing file paths in MongoDB

---

## 9. E-Commerce API (Multer + Cloudinary)

**Folder:** `9_E-Commerce_multer_and_cloudinary/`

An e-commerce product API that uploads product images to **Cloudinary** (cloud storage) instead of the local disk.

**Architecture:**
```
app.js
├── config/db.js              # MongoDB connection
├── config/cloudinary.js      # Cloudinary SDK config
├── models/Product.js         # Product schema
├── router/productRouter.js   # Routes
├── controller/               # Business logic
└── middleware/               # Multer + HttpError
```

**Product Schema Fields:**
- `name`, `price`, `description`, `category`
- `image` — Cloudinary secure URL
- `cloudinary_id` — public ID for deletion/replacement

**Concepts covered:**
- Integrating **Cloudinary** SDK for cloud image storage
- Using `multer-storage-cloudinary` or buffer upload to Cloudinary
- Storing the Cloudinary `secure_url` and `public_id` in the database
- Deleting images from Cloudinary on product deletion (`cloudinary.uploader.destroy()`)
- Environment variable management with **dotenv**

---

## 10. JWT Authentication

**Folder:** `10_JWT_Authentication/`

A complete **JWT-based authentication** system with register, login, and protected routes.

**Architecture:**
```
app.js
├── config/db.js
├── model/UserModel.js    # User schema with bcrypt & JWT methods
├── routes/userRoutes.js
├── controller/
└── middleware/           # auth middleware + HttpError
```

**User Schema & Methods:**
- Fields: `name`, `email`, `password` (hashed), `tokens[]`
- `UserSchema.pre("save")` — auto-hashes password with **bcryptjs** before saving
- `UserSchema.statics.findByCredentials(email, password)` — verifies login credentials
- `UserSchema.methods.generateAuthToken()` — creates and saves a JWT (7-day expiry)
- `UserSchema.methods.toJSON()` — strips sensitive fields (`password`, `tokens`, `__v`) from API responses

**Endpoints:**

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/user/register` | Register a new user |
| POST | `/user/login` | Login and receive a JWT |
| GET | `/user/profile` | Get own profile (protected) |
| POST | `/user/logout` | Invalidate current token |

**Concepts covered:**
- Password hashing with **bcryptjs**
- Signing and verifying JWTs with **jsonwebtoken**
- Auth middleware that reads `Authorization: Bearer <token>` header
- Multi-device logout support (token stored in DB as array)
- Custom email and password validators in Mongoose schema

---

## 11. Google OAuth 2.0

**Folder:** `11_O-auth/`

Adds **Google Sign-In** to an existing Express + MongoDB application using **Passport.js**.

**Architecture:**
```
app.js
├── config/db.js
├── config/passport.js     # Google OAuth 2.0 strategy
├── model/User.js          # User with googleId field
├── routes/authRoutes.js   # /auth/google, /auth/google/redirect
├── routes/profileRoutes.js
└── views/home.ejs         # EJS page showing logged-in user
```

**OAuth Flow:**
1. User visits `/auth/google` → redirected to Google's login page
2. Google redirects back to `/auth/google/redirect` with a code
3. Passport exchanges code for profile info, finds or creates a DB user
4. Session is established with `express-session`; user is serialized/deserialized

**Concepts covered:**
- Setting up **Passport.js** with `passport-google-oauth20`
- OAuth 2.0 authorization code flow
- Session management with **express-session**
- `passport.serializeUser` / `passport.deserializeUser` for session persistence
- Combining OAuth with EJS templates to show the logged-in user's info

---

## 12. QuickNest — Full-Stack Service Booking API

**Folder:** `12_quickNest/`

The capstone project — a **production-ready home services booking platform** (think UrbanClap/Thumbtack). It brings together everything learned in the previous modules.

**Architecture:**
```
server.js
├── config/
│   ├── db.js                # MongoDB connection
│   └── cloudinary.js        # Cloudinary config
├── model/
│   ├── User.js              # Customer / Provider / Admin
│   ├── Provider.js          # Provider profile with linked services
│   ├── Services.js          # Service listings
│   ├── Category.js          # Service categories (virtual populate)
│   └── Booking.js           # Booking records
├── routes/
│   ├── userRoutes.js
│   ├── providerRoutes.js
│   ├── adminRoutes.js
│   └── bookingRoutes.js
├── controller/              # Route handlers for each entity
├── middleware/              # Auth middleware, role guard, HttpError
├── validation/              # Joi schemas for input validation
│   ├── userSchema.js
│   ├── categorySchema.js
│   └── serviceSchema.js
├── services/                # Email (Nodemailer) & WhatsApp (Twilio)
└── utils/                   # Email template builder
```

**Data Models:**

- **User** — Roles: `customer`, `provider`, `admin`, `super_admin`; bcrypt-hashed password; JWT token array; Cloudinary profile picture; `isVerified` flag
- **Provider** — References `User` + `Services`; experience (years); documents array; `isVerified` flag
- **Services** — Name, description, price, duration; references a `Category`; `isActive` toggle
- **Category** — Name, description; virtual `services` field (reverse populate)
- **Booking** — References `User` and `Services`; bookingDate, timeSlot (9 slots), notes, status (`pending → confirmed → completed / cancelled`), totalPrice

**Key Features:**
- 🔐 JWT authentication + Role-Based Access Control (RBAC)
- 📁 File uploads to Cloudinary (profile pics, provider documents)
- ✅ Input validation with **Joi** schemas
- 📧 Email notifications via **Nodemailer**
- 💬 WhatsApp notifications via **Twilio**
- 🔗 Mongoose `populate` and virtual fields for relational data queries
- 📅 Booking system with time-slot conflict management
- 🛡️ Admin panel routes to manage users, providers, and services

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime |
| **Express.js** | Web framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB ODM (schema, validation, queries) |
| **bcryptjs** | Password hashing |
| **jsonwebtoken** | JWT creation and verification |
| **Passport.js** | OAuth 2.0 (Google Sign-In) |
| **Multer** | Multipart form-data / file uploads |
| **Cloudinary** | Cloud image & file storage |
| **Joi** | Request body validation |
| **Nodemailer** | Sending emails |
| **Twilio** | Sending WhatsApp messages |
| **EJS** | Server-side HTML templating |
| **Helmet** | HTTP security headers |
| **dotenv** | Environment variable management |

---

## ▶ How to Run Any Module

Each numbered folder is an independent project. To run any of them:

```bash
# 1. Navigate to the desired module
cd 7_StudentManagementSystem-Mongo

# 2. Install dependencies
npm install

# 3. Create a .env file (for modules that require it)
# Example for MongoDB projects:
# MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/<dbname>
# JWT_SECRET=your_jwt_secret
# PORT=5000

# 4. Start the server
npm start
# or
node app.js
```

> **Note:** Modules 1–6 do not require a database or `.env` file and can be run directly with `node app.js`.

---

## 🎯 Key Learnings & Concepts Covered

| # | Concept | Module |
|---|---|---|
| 1 | Node.js core, local, and third-party modules | 1 |
| 2 | Raw HTTP server creation and manual routing | 2 |
| 3 | Express.js setup and basic routing | 3 |
| 4 | EJS templating, static files, in-memory CRUD | 4 |
| 5 | Application, route, and error-handling middleware | 5 |
| 6 | RESTful API design (GET, POST, PUT, PATCH, DELETE) | 6 |
| 7 | MongoDB + Mongoose schemas, models, validators | 7 |
| 8 | Multer multi-file upload (disk storage) | 8 |
| 9 | Cloudinary cloud storage integration | 9 |
| 10 | JWT auth, bcrypt hashing, protected routes | 10 |
| 11 | Google OAuth 2.0 with Passport.js and sessions | 11 |
| 12 | RBAC, Joi validation, email/WhatsApp notifications, relational data | 12 |

---

## 💡 Why This Repository is Useful

1. **Beginner to Advanced** — Every concept is introduced from scratch with no assumed knowledge.
2. **Progressive Complexity** — Each module builds on the previous one, so you learn in the right order.
3. **Real-World Projects** — Not just hello-world examples; each module is a mini real-world application (student management, e-commerce, social profile, booking platform).
4. **Interview-Ready** — Covers the most common backend interview topics: REST APIs, databases, authentication, file uploads, OAuth, and security.
5. **Production Patterns** — The final module (QuickNest) follows industry best practices: MVC architecture, input validation, centralized error handling, RBAC, cloud storage, and notification services.
6. **Reference Guide** — Use this repository as a cheat-sheet when building your own Node.js/Express backends.

---

> **Author:** Shivam — A complete learning journey from zero to production-ready Node.js backend development.
