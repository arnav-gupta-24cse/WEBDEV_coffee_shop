// Order Model - Each order is a separate document
const mongoose = require('mongoose');

const orderItemSchema = mongoose.Schema({
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

const orderSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            
        },
        orderNumber: {
            type: String,
            required: false,
            unique: true,
        },
        items: [orderItemSchema],
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
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'],
            default: 'pending',
        },
        customerInfo: {
            name: {
                type: String,
                required: false,
            },
            email: {
                type: String,
                required: false,
            },
            phone: {
                type: String,
                required: false,
            },
        },
        deliveryAddress: {
            type: String,
            required: false,
        },
        notes: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);


orderSchema.pre('validate', function(next) {
    if (!this.orderNumber) {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        this.orderNumber = `ORD-${timestamp}-${random}`;
    }
    next();
});

module.exports = mongoose.model('Order', orderSchema);
