// customerRoutes.js

const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/authMiddleware');
const {getHello, updateUserProfile } = require('../controllers/userController');

// Update customer profile route
router.patch('/', verifyToken, updateUserProfile);
router.get('/hello',verifyToken, getHello);

module.exports = router;
