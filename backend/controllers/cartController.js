// Cart Controller - Full CRUD Operations
const Cart = require('../models/Cart');
const Item = require('../models/Item');

// @desc    Get user's cart
// @route   GET /api/cart/:userId
// @access  Public
const getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        
        let cart = await Cart.findOne({ userId });
        
        // If cart doesn't exist, create a new one
        if (!cart) {
            cart = await Cart.create({
                userId,
                items: [],
                totalItems: 0,
                subtotal: 0,
                tax: 0,
                total: 0
            });
        }
        
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add item to cart
// @route   POST /api/cart/:userId/items
// @access  Public
const addItemToCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, price, category, quantity, itemId, image } = req.body;
        
        // Validate required fields
        if (!name || !price) {
            return res.status(400).json({ message: 'Name and price are required' });
        }
        
        let cart = await Cart.findOne({ userId });
        
        // Create cart if it doesn't exist
        if (!cart) {
            cart = new Cart({
                userId,
                items: []
            });
        }
        
        // Check if item already exists in cart
        const existingItemIndex = cart.items.findIndex(
            item => item.name === name
        );
        
        if (existingItemIndex > -1) {
            // Update quantity if item exists
            cart.items[existingItemIndex].quantity += quantity || 1;
        } else {
            // Add new item to cart
            cart.items.push({
                itemId: itemId || null,
                name,
                price,
                quantity: quantity || 1,
                category: category || 'general',
                image: image || null
            });
        }
        
        // Calculate totals
        cart.calculateTotals();
        
        // Save cart
        await cart.save();
        
        res.status(201).json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update item quantity in cart
// @route   PUT /api/cart/:userId/items/:itemIndex
// @access  Public
const updateCartItem = async (req, res) => {
    try {
        const { userId, itemIndex } = req.params;
        const { quantity } = req.body;
        
        if (!quantity || quantity < 1) {
            return res.status(400).json({ message: 'Quantity must be at least 1' });
        }
        
        const cart = await Cart.findOne({ userId });
        
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        
        if (itemIndex < 0 || itemIndex >= cart.items.length) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }
        
        // Update quantity
        cart.items[itemIndex].quantity = quantity;
        
        // Calculate totals
        cart.calculateTotals();
        
        // Save cart
        await cart.save();
        
        res.json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:userId/items/:itemIndex
// @access  Public
const removeItemFromCart = async (req, res) => {
    try {
        const { userId, itemIndex } = req.params;
        
        const cart = await Cart.findOne({ userId });
        
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        
        if (itemIndex < 0 || itemIndex >= cart.items.length) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }
        
        // Remove item
        cart.items.splice(itemIndex, 1);
        
        // Calculate totals
        cart.calculateTotals();
        
        // Save cart
        await cart.save();
        
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Clear entire cart
// @route   DELETE /api/cart/:userId
// @access  Public
const clearCart = async (req, res) => {
    try {
        const { userId } = req.params;
        
        const cart = await Cart.findOne({ userId });
        
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        
        // Clear all items
        cart.items = [];
        cart.calculateTotals();
        
        await cart.save();
        
        res.json({ message: 'Cart cleared successfully', cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Sync cart from localStorage
// @route   POST /api/cart/:userId/sync
// @access  Public
const syncCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const { items } = req.body;
        
        if (!Array.isArray(items)) {
            return res.status(400).json({ message: 'Items must be an array' });
        }
        
        let cart = await Cart.findOne({ userId });
        
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }
        
        // Replace cart items with synced items
        cart.items = items.map(item => ({
            itemId: item.itemId || null,
            name: item.name,
            price: item.price,
            quantity: item.quantity || 1,
            category: item.category || 'general',
            image: item.image || null
        }));
        
        // Calculate totals
        cart.calculateTotals();
        
        await cart.save();
        
        res.json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getCart,
    addItemToCart,
    updateCartItem,
    removeItemFromCart,
    clearCart,
    syncCart
};
