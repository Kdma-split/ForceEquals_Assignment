const express = require('express');
const { getAccounts, updateAccountStatus } = require('../controllers/userAccount.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

const router = express.Router();

// Protect all account routes
router.use(authMiddleware);

// Get all accounts
router.get('/', getAccounts);

// Update account status
router.post('/:id/status', updateAccountStatus);

module.exports = router;