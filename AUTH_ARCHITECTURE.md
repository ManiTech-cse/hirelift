# 🔐 Authentication System - Complete Overview

## 🎯 Quick Reference

| What | Command |
|------|---------|
| **Install** | `npm install mongoose bcryptjs jsonwebtoken` |
| **Configure** | Edit `.env` with `MONGODB_URI` and `JWT_SECRET` |
| **Start** | `npm run dev:all` |
| **Test** | Register at http://localhost:3000 |

---

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    USER'S BROWSER                            │
│                  http://localhost:3000                       │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                REACT FRONTEND (App.tsx)                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Authentication UI:                                   │  │
│  │  - Register Form (name, email, password)             │  │
│  │  - Login Form (email, password)                      │  │
│  │  - Profile Management                                 │  │
│  │  - Auto-login on page load                           │  │
│  │  - Loading states & error handling                   │  │
│  └──────────────────────────────────────────────────────┘  │
│                          │                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Auth Service (services/authService.ts)              │  │
│  │  - register(name, email, password)                   │  │
│  │  - login(email, password)                            │  │
│  │  - getCurrentUser()                                   │  │
│  │  - updateUserProfile(name, profile)                  │  │
│  │  - logout()                                           │  │
│  │  - Token management (localStorage)                   │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                          │
                HTTP/HTTPS + JWT Token
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│              EXPRESS.JS SERVER (Node.js)                     │
│                 http://localhost:5000                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Auth Routes (server/routes/auth.js)                 │  │
│  │  - POST /api/auth/register                           │  │
│  │  - POST /api/auth/login                              │  │
│  │  - GET  /api/auth/me          [Protected]           │  │
│  │  - PUT  /api/auth/profile     [Protected]           │  │
│  │  - POST /api/auth/logout                             │  │
│  └──────────────────────────────────────────────────────┘  │
│                          │                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Auth Middleware (server/middleware/auth.js)         │  │
│  │  - Verify JWT token                                   │  │
│  │  - Extract user ID from token                        │  │
│  │  - Protect routes                                     │  │
│  │  - Return 401 if unauthorized                        │  │
│  └──────────────────────────────────────────────────────┘  │
│                          │                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Auth Controller (server/controllers/authController) │  │
│  │  - register(): Create user + hash password           │  │
│  │  - login(): Verify password + generate token         │  │
│  │  - getMe(): Get current user                         │  │
│  │  - updateProfile(): Update user data                 │  │
│  └──────────────────────────────────────────────────────┘  │
│                          │                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  User Model (server/models/User.js)                  │  │
│  │  - Schema definition                                  │  │
│  │  - Password hashing (bcrypt)                         │  │
│  │  - Password comparison                                │  │
│  │  - Email validation                                   │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                  MONGODB DATABASE                            │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Database: hirelift                                   │  │
│  │  Collection: users                                    │  │
│  │                                                        │  │
│  │  {                                                     │  │
│  │    _id: ObjectId,                                     │  │
│  │    name: "John Doe",                                  │  │
│  │    email: "john@example.com",                        │  │
│  │    password: "$2a$10$hashed...",  // Bcrypt hashed   │  │
│  │    profile: { skills, experience, ... },             │  │
│  │    appliedJobs: [...],                               │  │
│  │    savedJobs: [...],                                 │  │
│  │    createdAt: Date,                                   │  │
│  │    lastLogin: Date                                    │  │
│  │  }                                                     │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Registration Flow

```
1. USER FILLS FORM
   ├─ Name: "John Doe"
   ├─ Email: "john@example.com"
   └─ Password: "SecurePass123!"
           │
           ▼
2. FRONTEND VALIDATION
   ├─ Check name >= 2 characters
   ├─ Check email format
   ├─ Check password >= 8 characters
   └─ Check passwords match
           │
           ▼
3. CALL AUTH SERVICE
   register(name, email, password)
           │
           ▼
4. HTTP POST REQUEST
   POST /api/auth/register
   Body: { name, email, password }
           │
           ▼
5. BACKEND VALIDATION
   ├─ Check all fields present
   ├─ Check email unique
   └─ Validate format
           │
           ▼
6. HASH PASSWORD
   bcrypt.hash(password, 10)
   Result: "$2a$10$..."
           │
           ▼
7. SAVE TO DATABASE
   User.create({
     name, email, password: hashed
   })
           │
           ▼
8. GENERATE JWT TOKEN
   jwt.sign({ id: user._id }, secret, { expiresIn: '30d' })
   Result: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
           │
           ▼
9. RETURN RESPONSE
   {
     success: true,
     token: "eyJhbGc...",
     user: { id, name, email, profile }
   }
           │
           ▼
10. STORE TOKEN
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
           │
           ▼
11. UPDATE UI
    ├─ Set authenticated state
    ├─ Load user profile
    ├─ Show success message
    └─ Navigate to dashboard
```

---

## 🔑 Login Flow

```
1. USER ENTERS CREDENTIALS
   ├─ Email: "john@example.com"
   └─ Password: "SecurePass123!"
           │
           ▼
2. FRONTEND VALIDATION
   ├─ Check email present
   └─ Check password present
           │
           ▼
3. CALL AUTH SERVICE
   login(email, password)
           │
           ▼
4. HTTP POST REQUEST
   POST /api/auth/login
   Body: { email, password }
           │
           ▼
5. FIND USER
   User.findOne({ email }).select('+password')
           │
           ▼
6. COMPARE PASSWORD
   bcrypt.compare(password, user.password)
   ├─ Match? ✅ Continue
   └─ No match? ❌ Return error
           │
           ▼
7. UPDATE LAST LOGIN
   user.lastLogin = new Date()
   user.save()
           │
           ▼
8. GENERATE JWT TOKEN
   jwt.sign({ id: user._id }, secret, { expiresIn: '30d' })
           │
           ▼
9. RETURN RESPONSE
   {
     success: true,
     token: "eyJhbGc...",
     user: { id, name, email, profile, appliedJobs }
   }
           │
           ▼
10. STORE TOKEN
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
           │
           ▼
11. UPDATE UI
    ├─ Set authenticated state
    ├─ Load user data
    ├─ Show welcome message
    └─ Navigate to dashboard
```

---

## 🔒 Protected Route Flow

```
1. USER REQUEST
   GET /api/auth/me
   Header: Authorization: Bearer eyJhbGc...
           │
           ▼
2. AUTH MIDDLEWARE
   Extract token from header
           │
           ▼
3. VERIFY TOKEN
   jwt.verify(token, secret)
   ├─ Valid? ✅ Extract user ID
   └─ Invalid? ❌ Return 401
           │
           ▼
4. ADD USER ID TO REQUEST
   req.userId = decoded.id
           │
           ▼
5. CONTROLLER EXECUTION
   User.findById(req.userId)
           │
           ▼
6. RETURN USER DATA
   {
     success: true,
     user: { id, name, email, profile }
   }
```

---

## 📦 Data Flow

### Registration Data Flow
```
Frontend Form
    ↓ {name, email, password}
Auth Service
    ↓ HTTP POST
Express Server
    ↓ Validation
Auth Controller
    ↓ bcrypt.hash(password)
User Model
    ↓ Save to DB
MongoDB
    ↓ Return user
Auth Controller
    ↓ Generate JWT
Response
    ↓ {token, user}
LocalStorage
    ↓ Store
UI Update
```

### Login Data Flow
```
Frontend Form
    ↓ {email, password}
Auth Service
    ↓ HTTP POST
Express Server
    ↓ Find user
User Model
    ↓ Compare password
bcrypt.compare()
    ↓ Valid?
Generate JWT
    ↓ {token, user}
LocalStorage
    ↓ Store
UI Update
```

### Protected Request Flow
```
Frontend Action
    ↓ Get token from localStorage
Auth Service
    ↓ HTTP Request + Bearer token
Express Server
    ↓ Verify token
Auth Middleware
    ↓ Extract user ID
Controller
    ↓ Get user data
MongoDB
    ↓ Return data
Response
```

---

## 🗂️ File Structure

```
hirelift/
│
├── server/
│   ├── config/
│   │   └── database.js              ← MongoDB connection
│   │
│   ├── models/
│   │   └── User.js                  ← User schema + password hashing
│   │
│   ├── middleware/
│   │   └── auth.js                  ← JWT verification
│   │
│   ├── controllers/
│   │   ├── authController.js        ← Register, login, profile
│   │   ├── jobController.js
│   │   └── ...
│   │
│   ├── routes/
│   │   ├── auth.js                  ← Auth endpoints
│   │   ├── api.js
│   │   └── ...
│   │
│   └── index.js                     ← Main server + DB init
│
├── services/
│   ├── authService.ts               ← Frontend auth functions
│   ├── api.ts
│   └── ...
│
├── App.tsx                          ← Auth UI integration
│
├── .env                             ← Config (MONGODB_URI, JWT_SECRET)
├── .env.example                     ← Template
│
└── Documentation/
    ├── AUTH_SETUP_COMPLETE.md       ← Full documentation
    ├── AUTH_QUICK_SETUP.md          ← Quick guide
    ├── AUTH_SUMMARY.md              ← Summary
    └── AUTH_ARCHITECTURE.md         ← This file
```

---

## 🔐 Security Layers

```
┌─────────────────────────────────────┐
│  Layer 1: Input Validation          │
│  - Frontend form validation          │
│  - Backend schema validation         │
│  - Email format check                │
│  - Password strength check           │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  Layer 2: Password Security          │
│  - Bcrypt hashing (10 salt rounds)  │
│  - Never store plain text            │
│  - Never return in API               │
│  - Secure comparison                 │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  Layer 3: Token Security             │
│  - JWT signing with secret           │
│  - Token expiration (30 days)       │
│  - Bearer token authentication       │
│  - Verification on each request      │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  Layer 4: Database Security          │
│  - Unique email constraint           │
│  - Mongoose validators               │
│  - Connection security               │
│  - Data sanitization                 │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  Layer 5: API Security               │
│  - Protected routes                  │
│  - User authorization                │
│  - Error handling                    │
│  - Rate limiting (future)            │
└─────────────────────────────────────┘
```

---

## 📋 Dependencies

```json
{
  "dependencies": {
    "express": "^4.18.2",        // Web framework
    "mongoose": "^8.0.3",        // MongoDB ODM
    "bcryptjs": "^2.4.3",        // Password hashing
    "jsonwebtoken": "^9.0.2",   // JWT tokens
    "cors": "^2.8.5",            // Cross-origin
    "dotenv": "^16.3.1"          // Environment vars
  }
}
```

---

## 🎯 API Reference Card

```
┌──────────────────────────────────────────────────────┐
│              AUTHENTICATION API                       │
├──────────────────────────────────────────────────────┤
│                                                       │
│  BASE URL: http://localhost:5000/api/auth           │
│                                                       │
├──────────────────────────────────────────────────────┤
│  REGISTER                                            │
│  POST /register                                      │
│  Body: {name, email, password}                      │
│  Returns: {token, user}                             │
├──────────────────────────────────────────────────────┤
│  LOGIN                                               │
│  POST /login                                         │
│  Body: {email, password}                            │
│  Returns: {token, user}                             │
├──────────────────────────────────────────────────────┤
│  GET CURRENT USER                                    │
│  GET /me                                             │
│  Header: Authorization: Bearer <token>              │
│  Returns: {user}                                     │
├──────────────────────────────────────────────────────┤
│  UPDATE PROFILE                                      │
│  PUT /profile                                        │
│  Header: Authorization: Bearer <token>              │
│  Body: {name, profile}                              │
│  Returns: {user}                                     │
├──────────────────────────────────────────────────────┤
│  LOGOUT                                              │
│  POST /logout                                        │
│  Returns: {success: true}                           │
└──────────────────────────────────────────────────────┘
```

---

## 🎉 Complete!

**You now have a professional authentication system with:**

✅ User registration & login
✅ JWT token authentication
✅ MongoDB database
✅ Password hashing
✅ Protected routes
✅ Session persistence
✅ Frontend integration
✅ Complete documentation

**Start using it:** Follow `AUTH_QUICK_SETUP.md`

---

*Last Updated: December 21, 2025*
