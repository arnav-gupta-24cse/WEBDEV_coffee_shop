# Order System - MongoDB Setup Guide

## Problem Solved
Previously, only **one cart document** was saved in MongoDB Compass because the Cart model uses `userId` with a unique constraint. This means each user has only ONE cart that gets updated.

Now, with the **Order system**, each time you place an order:
- ✅ A **new Order document** is created in the database
- ✅ Each order is stored separately with a unique `orderNumber`
- ✅ Multiple orders stack up one after another in MongoDB Compass
- ✅ Cart is cleared after placing the order

---

## Architecture

### Cart vs Order
- **Cart Collection**: Stores ONE active cart per user (temporary, gets updated)
- **Orders Collection**: Stores ALL completed orders (permanent, each is a new document)

### Flow
1. User adds items to cart → Updates single cart document
2. User clicks "Proceed to Checkout" → Creates NEW order document
3. Cart is cleared → Ready for next order

---

## Backend API Endpoints

### Place Order (Create New Order Document)
```
POST /api/orders/:userId/place
```

**Request Body:**
```json
{
  "customerInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890"
  },
  "deliveryAddress": "123 Coffee Street",
  "notes": "Extra hot"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order placed successfully",
  "order": {
    "_id": "67...",
    "orderNumber": "ORD-1234567890123-456",
    "userId": "guest-user",
    "items": [...],
    "totalItems": 3,
    "subtotal": 25.50,
    "tax": 1.28,
    "total": 26.78,
    "status": "pending",
    "createdAt": "2025-11-19T...",
    "updatedAt": "2025-11-19T..."
  }
}
```

### Get All Orders for a User
```
GET /api/orders/:userId
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "orders": [
    { /* order 1 */ },
    { /* order 2 */ },
    { /* order 3 */ },
    ...
  ]
}
```

### Get Single Order
```
GET /api/orders/:userId/:orderId
```

### Get All Orders (Admin)
```
GET /api/orders
```

### Update Order Status (Admin)
```
PUT /api/orders/:orderId/status
```

**Request Body:**
```json
{
  "status": "confirmed"
}
```

**Valid statuses:** `pending`, `confirmed`, `preparing`, `ready`, `delivered`, `cancelled`

---

## Frontend Usage

### Testing the Order System

1. **Start Backend:**
```powershell
cd C:\WEBDEVASSESS\WEBDEV_coffee_shop\backend
node server.js
```
Backend runs on: `http://localhost:5001`

2. **Open the Website:**
   - Open `Client/index.html` in browser (or use Live Server)
   - Go to Menu page
   - Add items to cart
   - Go to Cart page
   - Click "Proceed to Checkout"

3. **Place Multiple Orders:**
   - Repeat the process multiple times
   - Each time you checkout, a NEW order document is created

4. **Check MongoDB Compass:**
   - Open MongoDB Compass
   - Connect to: `mongodb+srv://arnavgupta24cse_db_user:U5oO8zRpHM0jgfff@coffeeshop.029a8up.mongodb.net/`
   - Database: Default database (or `test`)
   - Collections:
     - `carts` - Will show 1 document per user (active cart)
     - `orders` - Will show ALL orders (1, 2, 3, 4... each as separate document)

---

## Order Model Schema

```javascript
{
  userId: String,
  orderNumber: String (unique),  // Auto-generated: ORD-timestamp-random
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
      category: String,
      image: String
    }
  ],
  totalItems: Number,
  subtotal: Number,
  tax: Number,
  total: Number,
  status: String,  // pending, confirmed, preparing, ready, delivered, cancelled
  customerInfo: {
    name: String,
    email: String,
    phone: String
  },
  deliveryAddress: String,
  notes: String,
  createdAt: Date,  // Auto-generated
  updatedAt: Date   // Auto-generated
}
```

---

## Testing with cURL

### Place an order:
```bash
curl -X POST http://localhost:5001/api/orders/guest-user/place \
  -H "Content-Type: application/json" \
  -d '{
    "customerInfo": {
      "name": "Test User"
    }
  }'
```

### Get all orders:
```bash
curl http://localhost:5001/api/orders/guest-user
```

---

## Verification Steps

### ✅ Test 1: Place First Order
1. Add items to cart
2. Click checkout
3. Confirm order
4. Check MongoDB Compass → `orders` collection → Should see 1 document

### ✅ Test 2: Place Second Order
1. Add different items to cart
2. Click checkout
3. Confirm order
4. Check MongoDB Compass → `orders` collection → Should see 2 documents

### ✅ Test 3: Place Third Order
1. Repeat process
2. Check MongoDB Compass → `orders` collection → Should see 3 documents

**Each order will have:**
- Unique `_id`
- Unique `orderNumber`
- Different `createdAt` timestamp
- All items from that specific order

---

## Key Differences

| Feature | Cart Collection | Orders Collection |
|---------|----------------|-------------------|
| Documents per user | 1 (updates existing) | Multiple (new each time) |
| Purpose | Temporary shopping cart | Permanent order history |
| Cleared after | Order placed | Never (kept as history) |
| Unique constraint | userId | orderNumber |

---

## Troubleshooting

### Only seeing 1 cart document?
✅ **This is correct!** Carts collection should have 1 document per user.
✅ **Check Orders collection instead** - this is where multiple documents appear.

### Orders not appearing?
1. Make sure backend is running on port 5001
2. Check browser console for errors
3. Verify MongoDB connection in terminal
4. Check that cart has items before checkout
5. Look in correct database in MongoDB Compass

### Port already in use?
```powershell
# Kill process on port 5001
$port = Get-NetTCPConnection -LocalPort 5001 -ErrorAction SilentlyContinue | Select-Object -First 1 -ExpandProperty OwningProcess
Stop-Process -Id $port -Force
```

---

## Next Steps

1. ✅ Orders are now saving separately (1 after 1)
2. 🔜 Add order history page to view all orders
3. 🔜 Add order tracking by order number
4. 🔜 Add admin panel to manage orders
5. 🔜 Add email notifications for orders
6. 🔜 Add payment integration

---

## Summary

**Before:** Only 1 cart document in MongoDB (Cart gets updated)
**After:** Multiple order documents in MongoDB (Each order creates new document)

🎉 **Your orders will now stack 1 k baad 1 in the database!**
