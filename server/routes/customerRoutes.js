// customerRoutes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { updateCustomerProfile } = require('../controllers/customerController');

// Update customer profile route
router.put('/profile', authMiddleware, updateCustomerProfile);

module.exports = router;
