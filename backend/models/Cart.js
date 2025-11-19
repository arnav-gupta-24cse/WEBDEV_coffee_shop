// Cart Model
const mongoose = require('mongoose');

const cartItemSchema = mongoose.Schema({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: false,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
        min: 1,
    },
    category: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    }
});

const cartSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
        },
        items: [cartItemSchema],
        totalItems: {
            type: Number,
            default: 0,
        },
        subtotal: {
            type: Number,
            default: 0,
        },
        tax: {
            type: Number,
            default: 0,
        },
        total: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Method to calculate totals
cartSchema.methods.calculateTotals = function() {
    this.totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
    this.subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.tax = this.subtotal * 0.05; // 5% tax
    this.total = this.subtotal + this.tax;
};

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
