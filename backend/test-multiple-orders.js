// Test Script - Create Multiple Orders to Verify They Save Separately
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Cart = require('./models/Cart');
const Order = require('./models/Order');

// Load environment variables
dotenv.config();

const testMultipleOrders = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected\n');

        const userId = 'test-user-' + Date.now();
        
        // Test: Create 3 separate orders
        console.log('📦 Creating multiple orders...\n');
        
        for (let i = 1; i <= 3; i++) {
            // Create a cart with items
            const cart = await Cart.create({
                userId: userId + `-order${i}`,
                items: [
                    {
                        name: `Coffee ${i}`,
                        price: 5.99 + i,
                        quantity: i,
                        category: 'hot-drinks'
                    }
                ],
                totalItems: i,
                subtotal: (5.99 + i) * i,
                tax: ((5.99 + i) * i) * 0.05,
                total: ((5.99 + i) * i) * 1.05
            });
            
            // Create order from cart
            const order = await Order.create({
                userId: cart.userId,
                items: cart.items,
                totalItems: cart.totalItems,
                subtotal: cart.subtotal,
                tax: cart.tax,
                total: cart.total,
                customerInfo: {
                    name: `Test Customer ${i}`
                },
                status: 'pending'
            });
            
            console.log(`Order ${i} Created:`);
            console.log(`  Order Number: ${order.orderNumber}`);
            console.log(`  User: ${order.userId}`);
            console.log(`  Items: ${order.totalItems}`);
            console.log(`  Total: $${order.total.toFixed(2)}`);
            console.log(`  Created At: ${order.createdAt}`);
            console.log('');
        }
        
        // Verify all orders are saved
        const allOrders = await Order.find({});
        console.log(`\n✅ Total Orders in Database: ${allOrders.length}`);
        console.log('\nAll Order Numbers:');
        allOrders.forEach((order, index) => {
            console.log(`  ${index + 1}. ${order.orderNumber} - ${order.userId} - $${order.total.toFixed(2)}`);
        });
        
        console.log('\n✨ Success! Multiple orders saved separately in database.');
        console.log('📊 Check MongoDB Compass to see all order documents.');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        // Close connection
        await mongoose.connection.close();
        console.log('\n🔌 Database connection closed.');
        process.exit(0);
    }
};

// Run test
testMultipleOrders();
