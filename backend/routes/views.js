// View Routes - Handlebars Pages
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Item = require('../models/Item');

// Home page
router.get('/', (req, res) => {
    res.render('home', { 
        title: 'Brew Haven - Home',
        message: 'Welcome to Brew Haven Coffee Shop'
    });
});

// Orders page
router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 });
        res.render('orders', {
            title: 'Brew Haven - Orders',
            orders: orders,
            count: orders.length,
            helpers: {
                formatDate: (date) => {
                    return new Date(date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                },
                eq: (a, b) => a === b
            }
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.render('orders', {
            title: 'Brew Haven - Orders',
            orders: [],
            count: 0,
            error: 'Failed to load orders'
        });
    }
});

// Menu page
router.get('/menu', async (req, res) => {
    try {
        const items = await Item.find({});
        res.render('menu', {
            title: 'Brew Haven - Menu',
            items: items
        });
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.render('menu', {
            title: 'Brew Haven - Menu',
            items: [],
            error: 'Failed to load menu items'
        });
    }
});

module.exports = router;
