// ../../Scripts/cart.js

// Run this function when the page is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  
  // Get references to the HTML elements we need to update
  const itemsContainer = document.getElementById('cart-items-container');
  const subtotalEl = document.getElementById('cart-subtotal');
  const taxEl = document.getElementById('cart-tax');
  const totalEl = document.getElementById('cart-total');
  const TAX_RATE = 0.05; // 5% tax

  // This function does all the work: loading, rendering, and calculating
  function renderCart() {
    // 1. Load the cart data from localStorage
    const cartData = localStorage.getItem('maisonDuCafeCart');
    const items = cartData ? JSON.parse(cartData) : []; // If cart is empty, use an empty array

    // Clear the 'Loading...' message
    itemsContainer.innerHTML = '';

    // 2. Check if the cart is empty
    if (items.length === 0) {
      itemsContainer.innerHTML = '<p>Your cart is empty. <a href="../menu/menu.html">Go add some items</a>!</p>';
      subtotalEl.textContent = '₹0.00';
      taxEl.textContent = '₹0.00';
      totalEl.textContent = '₹0.00';
      return; // Stop here if cart is empty
    }

    // 3. Loop through items and build HTML
    let subtotal = 0;
    items.forEach(item => {
      // Calculate subtotal for this item
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;

      // Create the HTML elements for the cart item
      // These classes match your cart.css
      const itemEl = document.createElement('div');
      itemEl.classList.add('cart-item');
      
      itemEl.innerHTML = `
        <div class="cart-item-details">
          <span class="cart-item-name">${item.quantity} x ${item.name}</span>
          <span class="cart-item-price">${item.priceDisplay} each</span>
        </div>
        <button class="cart-item-remove" data-id="${item.id}">Remove</button>
      `;
      
      itemsContainer.appendChild(itemEl);
    });

    // 4. Calculate totals
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    // 5. Update the summary in the HTML
    subtotalEl.textContent = `₹${subtotal.toFixed(2)}`;
    taxEl.textContent = `₹${tax.toFixed(2)}`;
    totalEl.textContent = `₹${total.toFixed(2)}`;
    
    // 6. Add event listeners to all 'Remove' buttons
    document.querySelectorAll('.cart-item-remove').forEach(button => {
      button.addEventListener('click', () => {
        const itemIdToRemove = button.dataset.id;
        // Create a new array *without* the removed item
        const newCartItems = items.filter(item => item.id !== itemIdToRemove);
        
        // Save the new, smaller array back to localStorage
        localStorage.setItem('maisonDuCafeCart', JSON.stringify(newCartItems));
        
        // Re-run this whole function to update the page
        renderCart(); 
      });
    });
  }

  // Initial load when page opens
  renderCart();
});