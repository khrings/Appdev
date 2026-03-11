// Auth Routes for Express.js
// Use this in your Express app to set up authentication endpoints

const express = require('express');
const router = express.Router();
const authController = require('./authController');

// Public routes (no authentication required)
router.post('/auth/login', authController.login);
router.post('/auth/register', authController.register);

// Protected routes (require authentication)
router.post('/auth/logout', authController.protect, authController.logout);
router.get('/auth/verify', authController.protect, authController.verifyToken);

// Example of how to use in your main app.js or server.js:
// const authRoutes = require('./authRoutes');
// app.use('/api', authRoutes);  // This will create routes like /api/auth/login

module.exports = router;
