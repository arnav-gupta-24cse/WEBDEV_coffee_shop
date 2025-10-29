// ../../Scripts/checkout.js

document.addEventListener('DOMContentLoaded', () => {
  
  // Get references to the new elements in checkout.html
  const itemsContainer = document.getElementById('review-items-container');
  const subtotalEl = document.getElementById('summary-subtotal');
  const taxEl = document.getElementById('summary-tax');
  const totalEl = document.getElementById('summary-total');
  
  // NEW: Get references to the form and main container
  const orderForm = document.querySelector('.order-form');
  const mainContainer = document.querySelector('main.container');
  
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
      
      // NEW: Disable the 'Place Order' button if cart is empty
      const placeOrderBtn = orderForm.querySelector('.order-btn[type="submit"]');
      if (placeOrderBtn) {
        placeOrderBtn.disabled = true;
        placeOrderBtn.textContent = 'Your Cart is Empty';
        placeOrderBtn.style.opacity = '0.6';
        placeOrderBtn.style.cursor = 'not-allowed';
      }
      return; 
    }

    // 3. Loop through items and build HTML
    let subtotal = 0;
    items.forEach(item => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;

      // Create the HTML elements for the review box
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

  // --- NEW: FORM SUBMISSION HANDLING ---
  
  if (orderForm) {
    orderForm.addEventListener('submit', (event) => {
      // 1. Stop the form from actually submitting and reloading the page
      event.preventDefault();

      // --- In a real app, you would send data to a server here ---
      // We will simulate a successful payment.
      
      console.log('Order submitted (simulated).');

      // 2. Clear the cart from localStorage
      localStorage.removeItem('maisonDuCafeCart');
      
      // 3. Show a "Thank You" message
      // We will replace the entire form content with our message
      mainContainer.innerHTML = `
        <h1>Thank You!</h1>
        <p>Your order has been placed successfully.</p>
        <p>We'll start preparing it right away.</p>
        <a href="../home/home.html" class="order-btn" style="text-decoration: none;">Return to Home</a>
      `;
      
      // 4. Add a class for styling the new thank-you message
      mainContainer.classList.add('thank-you-message');
    });
  }

  // Initial load when page opens
  renderCheckout();
});