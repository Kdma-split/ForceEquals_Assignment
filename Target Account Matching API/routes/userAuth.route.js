const express = require('express');
const { login, logout, refreshToken } = require('../controllers/userAuth.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

const router = express.Router();

// Login route
router.post('/login', login);

// Refresh token route
router.post('/refresh-token', refreshToken);

// Protected Logout route 
router.post('/logout', authMiddleware, logout);

module.exports = router;