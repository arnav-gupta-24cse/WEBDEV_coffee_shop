// Seed script to populate menu items in MongoDB
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Item = require('./models/Item');

dotenv.config();

const menuItems = [
    {
        name: "Espresso",
        description: "Rich and bold single shot espresso",
        price: 3.39,
        category: "coffee",
        image: "/Client/assets/coffee-1.jpg",
        available: true,
        caffeine: 150
    },
    {
        name: "Cappuccino",
        description: "Espresso with steamed milk and foam",
        price: 4.39,
        category: "coffee",
        image: "/Client/assets/coffee-1.jpg",
        available: true,
        caffeine: 120
    },
    {
        name: "Latte",
        description: "Smooth espresso with steamed milk",
        price: 4.75,
        category: "coffee",
        image: "/Client/assets/coffee-1.jpg",
        available: true,
        caffeine: 100
    },
    {
        name: "Americano",
        description: "Espresso with hot water",
        price: 3.75,
        category: "coffee",
        image: "/Client/assets/coffee-1.jpg",
        available: true,
        caffeine: 140
    },
    {
        name: "Mocha",
        description: "Espresso with chocolate and steamed milk",
        price: 5.25,
        category: "coffee",
        image: "/Client/assets/coffee-1.jpg",
        available: true,
        caffeine: 110
    },
    {
        name: "Cold Brew",
        description: "Smooth, refreshing cold coffee",
        price: 4.25,
        category: "coffee",
        image: "/Client/assets/coffee-1.jpg",
        available: true,
        caffeine: 200
    },
    {
        name: "Croissant",
        description: "Buttery, flaky French pastry",
        price: 3.25,
        category: "pastries",
        image: "/Client/assets/pastry-1.jpg",
        available: true,
        caffeine: 0
    },
    {
        name: "Chocolate Muffin",
        description: "Rich chocolate chip muffin",
        price: 3.75,
        category: "pastries",
        image: "/Client/assets/pastry-1.jpg",
        available: true,
        caffeine: 0
    },
    {
        name: "Blueberry Scone",
        description: "Fluffy scone with glaze",
        price: 3.90,
        category: "pastries",
        image: "/Client/assets/pastry-1.jpg",
        available: true,
        caffeine: 0
    },
    {
        name: "Cinnamon Roll",
        description: "Warm roll with cream cheese frosting",
        price: 4.25,
        category: "pastries",
        image: "/Client/assets/pastry-1.jpg",
        available: true,
        caffeine: 0
    },
    {
        name: "Breakfast Sandwich",
        description: "Egg, cheese, and bacon on brioche",
        price: 6.50,
        category: "food",
        image: "/Client/assets/food-1.jpg",
        available: true,
        caffeine: 0
    },
    {
        name: "Avocado Toast",
        description: "Smashed avocado on sourdough",
        price: 7.25,
        category: "food",
        image: "/Client/assets/food-1.jpg",
        available: true,
        caffeine: 0
    }
];

const seedDatabase = async () => {
    try {
        console.log(' Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(' MongoDB Connected!');

        // Clear existing items
        console.log(' Clearing existing menu items...');
        await Item.deleteMany({});

        // Insert new items
        console.log(' Inserting menu items...');
        const items = await Item.insertMany(menuItems);
        console.log(` ${items.length} menu items added successfully!`);

        console.log('\n Menu Items:');
        items.forEach(item => {
            console.log(`   - ${item.name} ($${item.price}) - ${item.category}`);
        });

        await mongoose.connection.close();
        console.log('\n Database seeding complete! Connection closed.');
        process.exit(0);
    } catch (error) {
        console.error(' Error:', error.message);
        process.exit(1);
    }
};

seedDatabase();
