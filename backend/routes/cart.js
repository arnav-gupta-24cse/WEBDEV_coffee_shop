// Cart Routes - Full CRUD
const express = require('express');
const router = express.Router();
const {
    getCart,
    addItemToCart,
    updateCartItem,
    removeItemFromCart,
    clearCart,
    syncCart
} = require('../controllers/cartController');

// Get user's cart
router.get('/:userId', getCart);

// Add item to cart
router.post('/:userId/items', addItemToCart);

// Update item quantity
router.put('/:userId/items/:itemIndex', updateCartItem);

// Remove item from cart
router.delete('/:userId/items/:itemIndex', removeItemFromCart);

// Clear entire cart
router.delete('/:userId', clearCart);

// Sync cart from localStorage
router.post('/:userId/sync', syncCart);

module.exports = router;
