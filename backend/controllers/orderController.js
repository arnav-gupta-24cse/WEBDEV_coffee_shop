// Order Controller - Handle order placement and retrieval
const Order = require('../models/Order');
const Cart = require('../models/Cart');

// @desc    Place an order from cart
// @route   POST /api/orders/:userId/place
// @access  Public
const placeOrder = async (req, res) => {
    try {
        const { userId } = req.params;
        const { customerInfo, deliveryAddress, notes } = req.body;
        
        // Get user's cart
        const cart = await Cart.findOne({ userId });
        
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty. Cannot place order.' });
        }
        
        // Create new order from cart
        const order = await Order.create({
            userId,
            items: cart.items,
            totalItems: cart.totalItems,
            subtotal: cart.subtotal,
            tax: cart.tax,
            total: cart.total,
            customerInfo: customerInfo || {},
            deliveryAddress: deliveryAddress || '',
            notes: notes || '',
            status: 'pending',
        });
        
        // Clear the cart after order is placed
        cart.items = [];
        cart.totalItems = 0;
        cart.subtotal = 0;
        cart.tax = 0;
        cart.total = 0;
        await cart.save();
        
        res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            order,
        });
    } catch (error) {
        console.error('Place order error:', error);
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

// @desc    Get all orders for a user
// @route   GET /api/orders/:userId
// @access  Public
const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        
        // Get all orders for this user, sorted by newest first
        const orders = await Order.find({ userId }).sort({ createdAt: -1 });
        
        res.json({
            success: true,
            count: orders.length,
            orders,
        });
    } catch (error) {
        console.error('Get orders error:', error);
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

// @desc    Get a single order by ID
// @route   GET /api/orders/:userId/:orderId
// @access  Public
const getOrderById = async (req, res) => {
    try {
        const { userId, orderId } = req.params;
        
        const order = await Order.findOne({ _id: orderId, userId });
        
        if (!order) {
            return res.status(404).json({ 
                success: false,
                message: 'Order not found' 
            });
        }
        
        res.json({
            success: true,
            order,
        });
    } catch (error) {
        console.error('Get order by ID error:', error);
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

// @desc    Get all orders (admin view)
// @route   GET /api/orders
// @access  Public (should be admin only in production)
const getAllOrders = async (req, res) => {
    try {
        // Get all orders, sorted by newest first
        const orders = await Order.find({}).sort({ createdAt: -1 });
        
        res.json({
            success: true,
            count: orders.length,
            orders,
        });
    } catch (error) {
        console.error('Get all orders error:', error);
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:orderId/status
// @access  Public (should be admin only in production)
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        
        const validStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ 
                success: false,
                message: 'Invalid status. Must be one of: ' + validStatuses.join(', ')
            });
        }
        
        const order = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true, runValidators: true }
        );
        
        if (!order) {
            return res.status(404).json({ 
                success: false,
                message: 'Order not found' 
            });
        }
        
        res.json({
            success: true,
            message: 'Order status updated',
            order,
        });
    } catch (error) {
        console.error('Update order status error:', error);
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

module.exports = {
    placeOrder,
    getUserOrders,
    getOrderById,
    getAllOrders,
    updateOrderStatus,
};
