// customerRoutes.js

const express = require('express');
const router = express.Router();
const {authCustomerMiddleware} = require('../middleware/authMiddleware');
const {getHello, updateCustomerProfile } = require('../controllers/customerController');

// Update customer profile route
router.put('/profile', authCustomerMiddleware, updateCustomerProfile);
router.get('/hello',authCustomerMiddleware, getHello);

module.exports = router;
