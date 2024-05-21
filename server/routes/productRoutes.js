// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const workshopController = require('../controllers/workshopController');
const authMiddleware = require('../middleware/authMiddleware');

// // Register a new workshop
// router.post('/workshops', authMiddleware, workshopController.registerWorkshop);

// // Get workshop details
// router.get('/workshops/:id', authMiddleware, workshopController.getWorkshopDetails);

// // Update workshop details
// router.put('/workshops/:id', authMiddleware, workshopController.updateWorkshopDetails);

module.exports = router;
