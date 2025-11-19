// Test script to verify MongoDB connection and Cart operations
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import models
const Cart = require('./models/Cart');
const Item = require('./models/Item');

// Connect to MongoDB
const testConnection = async () => {
    try {
        console.log('🔄 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB Connected Successfully!');
        console.log(`📊 Database: ${mongoose.connection.name}`);
        
        // Test Cart operations
        await testCartOperations();
        
        // Close connection
        await mongoose.connection.close();
        console.log('\n✅ All tests passed! Connection closed.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

const testCartOperations = async () => {
    try {
        console.log('\n🧪 Testing Cart CRUD Operations...\n');
        
        const testUserId = 'test-user-' + Date.now();
        
        // CREATE: Create a new cart
        console.log('1️⃣ CREATE: Creating new cart...');
        const cart = new Cart({
            userId: testUserId,
            items: [
                {
                    name: 'Test Espresso',
                    price: 3.39,
                    quantity: 2,
                    category: 'coffee'
                },
                {
                    name: 'Test Croissant',
                    price: 3.25,
                    quantity: 1,
                    category: 'pastries'
                }
            ]
        });
        
        cart.calculateTotals();
        await cart.save();
        console.log(`✅ Cart created: ${cart._id}`);
        console.log(`   Total Items: ${cart.totalItems}`);
        console.log(`   Subtotal: $${cart.subtotal.toFixed(2)}`);
        console.log(`   Tax: $${cart.tax.toFixed(2)}`);
        console.log(`   Total: $${cart.total.toFixed(2)}`);
        
        // READ: Find the cart
        console.log('\n2️⃣ READ: Finding cart...');
        const foundCart = await Cart.findOne({ userId: testUserId });
        console.log(`✅ Cart found: ${foundCart._id}`);
        console.log(`   Items count: ${foundCart.items.length}`);
        
        // UPDATE: Update item quantity
        console.log('\n3️⃣ UPDATE: Updating item quantity...');
        foundCart.items[0].quantity = 5;
        foundCart.calculateTotals();
        await foundCart.save();
        console.log(`✅ Cart updated`);
        console.log(`   New Total Items: ${foundCart.totalItems}`);
        console.log(`   New Total: $${foundCart.total.toFixed(2)}`);
        
        // DELETE: Remove an item
        console.log('\n4️⃣ DELETE: Removing an item...');
        foundCart.items.splice(1, 1);
        foundCart.calculateTotals();
        await foundCart.save();
        console.log(`✅ Item removed`);
        console.log(`   Remaining items: ${foundCart.items.length}`);
        
        // DELETE: Remove entire cart
        console.log('\n5️⃣ DELETE: Removing entire cart...');
        await Cart.deleteOne({ userId: testUserId });
        console.log(`✅ Cart deleted successfully`);
        
        console.log('\n🎉 All CRUD operations completed successfully!');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        throw error;
    }
};

// Run tests
testConnection();
