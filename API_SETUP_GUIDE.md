# Login API Controller Setup Guide

I've created a complete authentication system for your Pawstuff API. Here's what was created:

## Files Created:
1. **authController.js** - Main authentication controller with login, register, logout, verify
2. **authRoutes.js** - Express routes configuration
3. **User.js** - Mongoose User model example

## Installation Requirements:

```bash
npm install express mongoose bcryptjs jsonwebtoken dotenv
```

## Setup Steps:

### 1. Environment Variables
Create a `.env` file in your project root:

```env
PORT=8000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
MONGODB_URI=mongodb://localhost:27017/pawstuff
```

### 2. Basic Express Server Setup
Create or update your `server.js` or `app.js`:

```javascript
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS (if needed for mobile app)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
const authRoutes = require('./authRoutes');
app.use('/', authRoutes);

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

### 3. File Structure
Organize your files like this:

```
pawstuff-api/
├── server.js
├── .env
├── package.json
├── controllers/
│   └── authController.js
├── routes/
│   └── authRoutes.js
└── models/
    └── User.js
```

### 4. API Endpoints
Your API will now have these endpoints:

- `POST /auth/login` - Login with email & password
- `POST /auth/register` - Register new user
- `POST /auth/logout` - Logout (requires token)
- `GET /auth/verify` - Verify JWT token (requires token)

### 5. Request/Response Examples

**Login Request:**
```json
POST /auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Login Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2026-03-10T00:00:00.000Z"
  }
}
```

### 6. Protecting Other Routes
To protect other routes, use the `protect` middleware:

```javascript
const { protect } = require('./controllers/authController');

router.get('/user/profile', protect, (req, res) => {
  // req.user is available here
  res.json({ user: req.user });
});
```

### 7. Testing Your API

Using curl:
```bash
# Register
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","name":"Test User"}'

# Login
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# Verify (replace YOUR_TOKEN with actual token)
curl -X GET http://localhost:8000/auth/verify \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Mobile App Connection
Your React Native app is already configured to connect at `http://10.0.2.2:8000` (Android Emulator).

Make sure your server is running on port 8000 and the mobile app will be able to authenticate!

## Security Notes:
- ✅ Passwords are hashed with bcrypt
- ✅ JWT tokens expire after 7 days
- ✅ Passwords never returned in API responses
- ⚠️ Change JWT_SECRET in production
- ⚠️ Use HTTPS in production
- ⚠️ Add rate limiting for login attempts
