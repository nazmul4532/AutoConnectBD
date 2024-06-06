const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { verifyToken, isCustomer, isCompany } = require('../middleware/authMiddleware'); // Assume you have an auth middleware


// Route for creating an order from cart
router.post('/create-order', orderController.createOrderFromCart);

// Route for updating order status
router.put('/update-order-status', orderController.updateOrderStatus);

// Route for fetching order details
router.get('/order-details/:orderId', orderController.getOrderDetails);

// Route for fetching user orders with pagination
router.get('/user-orders', orderController.getUserOrders);

module.exports = router;
