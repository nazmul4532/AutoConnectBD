const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { verifyToken, isCustomer } = require('../middleware/authMiddleware'); // Assume you have an auth middleware

router.post('/add', verifyToken, isCustomer , cartController.addToCart);
router.get('/', verifyToken, isCustomer , cartController.getCart);
router.put('/decrease', verifyToken, isCustomer , cartController.decreaseQuantity);
router.delete('/remove/:productId', verifyToken, isCustomer , cartController.removeFromCart);

module.exports = router;
