
document.addEventListener('DOMContentLoaded', () => {
  
  const itemsContainer = document.getElementById('review-items-container');
  const subtotalEl = document.getElementById('summary-subtotal');
  const taxEl = document.getElementById('summary-tax');
  const totalEl = document.getElementById('summary-total');
  
  const orderForm = document.querySelector('.order-form');
  const mainContainer = document.querySelector('main.container');
  
  const TAX_RATE = 0.05;

  function renderCheckout() {
    const cartData = localStorage.getItem('maisonDuCafeCart');
    const items = cartData ? JSON.parse(cartData) : [];

    itemsContainer.innerHTML = '';

    if (items.length === 0) {
      itemsContainer.innerHTML = '<p>Your cart is empty. Please add items from the <a href="../menu/menu.html">menu</a>.</p>';
      
      const placeOrderBtn = orderForm.querySelector('.order-btn[type="submit"]');
      if (placeOrderBtn) {
        placeOrderBtn.disabled = true;
        placeOrderBtn.textContent = 'Your Cart is Empty';
        placeOrderBtn.style.opacity = '0.6';
        placeOrderBtn.style.cursor = 'allowed';
      }
      return; 
    }

    let subtotal = 0;
    items.forEach(item => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;

      const itemEl = document.createElement('div');
      itemEl.classList.add('order-summary');
      
      itemEl.innerHTML = `
        <span>${item.name} (${item.quantity})</span>
        <span>${item.priceDisplay} x ${item.quantity}</span>
      `;
      
      itemsContainer.appendChild(itemEl);
    });

    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    subtotalEl.textContent = `₹${subtotal.toFixed(2)}`;
    taxEl.textContent = `₹${tax.toFixed(2)}`;
    totalEl.textContent = `₹${total.toFixed(2)}`;
  }

  
  if (orderForm) {
    orderForm.addEventListener('submit', (event) => {
      event.preventDefault();

      
      console.log('Order submitted (simulated).');

      localStorage.removeItem('maisonDuCafeCart');
      
      mainContainer.innerHTML = `
        <h1>Thank You!</h1>
        <p>Your order has been placed successfully.</p>
        <p>We'll start preparing it right away.</p>
        <a href="../home/home.html" class="order-btn" style="text-decoration: none;">Return to Home</a>
      `;
      
      mainContainer.classList.add('thank-you-message');
    });
  }

  renderCheckout();
});