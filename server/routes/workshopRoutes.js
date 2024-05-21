// workshopRoutes.js
const express = require('express');
const router = express.Router();
const workshopController = require('../controllers/workshopController');
const authMiddleware = require('../middleware/authMiddleware');

const {authWorkshopMiddleware} = require('../middleware/authMiddleware');
const {getHello, updateWorkshopProfile } = require('../controllers/workshopController');

// Update customer profile route
router.put('/profile', authWorkshopMiddleware, updateWorkshopProfile);
router.get('/hello',authWorkshopMiddleware, getHello);

module.exports = router;
