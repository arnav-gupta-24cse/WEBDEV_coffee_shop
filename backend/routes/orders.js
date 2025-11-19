// Order Routes
const express = require('express');
const router = express.Router();
const {
    placeOrder,
    getUserOrders,
    getOrderById,
    getAllOrders,
    updateOrderStatus,
} = require('../controllers/orderController');

// Place order from cart
router.post('/:userId/place', placeOrder);

// Get all orders for a user
router.get('/:userId', getUserOrders);

// Get specific order by ID
router.get('/:userId/:orderId', getOrderById);

// Get all orders (admin)
router.get('/', getAllOrders);

// Update order status (admin)
router.put('/:orderId/status', updateOrderStatus);

module.exports = router;
