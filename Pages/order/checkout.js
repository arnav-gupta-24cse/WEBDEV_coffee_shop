// ../../Scripts/checkout.js

document.addEventListener('DOMContentLoaded', () => {
  
  // Get references to the new elements in checkout.html
  const itemsContainer = document.getElementById('review-items-container');
  const subtotalEl = document.getElementById('summary-subtotal');
  const taxEl = document.getElementById('summary-tax');
  const totalEl = document.getElementById('summary-total');
  
  const TAX_RATE = 0.05; // 5% tax

  function renderCheckout() {
    // 1. Load the cart data from localStorage
    const cartData = localStorage.getItem('maisonDuCafeCart');
    const items = cartData ? JSON.parse(cartData) : [];

    // Clear any old content
    itemsContainer.innerHTML = '';

    // 2. Check if the cart is empty
    if (items.length === 0) {
      itemsContainer.innerHTML = '<p>Your cart is empty. Please add items from the <a href="../menu/menu.html">menu</a>.</p>';
      // Optionally, disable the 'Place Order' button
      document.querySelector('.order-btn[type="submit"]').disabled = true;
      return; 
    }

    // 3. Loop through items and build HTML
    let subtotal = 0;
    items.forEach(item => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;

      // Create the HTML elements for the review box
      // (using the classes from delivery.css)
      const itemEl = document.createElement('div');
      itemEl.classList.add('order-summary');
      
      itemEl.innerHTML = `
        <span>${item.name} (${item.quantity})</span>
        <span>${item.priceDisplay} x ${item.quantity}</span>
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
  }

  // Initial load when page opens
  renderCheckout();
});