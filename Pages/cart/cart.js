document.addEventListener('DOMContentLoaded', () => {
  

  const itemsContainer = document.getElementById('cart-items-container');
  const subtotalEl = document.getElementById('cart-subtotal');
  const taxEl = document.getElementById('cart-tax');
  const totalEl = document.getElementById('cart-total');
  const TAX_RATE = 0.05;


  function renderCart() {

    const cartData = localStorage.getItem('maisonDuCafeCart');
  const items = cartData ? JSON.parse(cartData) : [];


    itemsContainer.innerHTML = '';


    if (items.length === 0) {
      itemsContainer.innerHTML = '<p>Your cart is empty. <a href="../menu/menu.html">Go add some items</a>!</p>';
      subtotalEl.textContent = '₹0.00';
      taxEl.textContent = '₹0.00';
      totalEl.textContent = '₹0.00';
  return;
    }


    let subtotal = 0;
    items.forEach(item => {

      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;



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


    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;


    subtotalEl.textContent = `₹${subtotal.toFixed(2)}`;
    taxEl.textContent = `₹${tax.toFixed(2)}`;
    totalEl.textContent = `₹${total.toFixed(2)}`;
    

    document.querySelectorAll('.cart-item-remove').forEach(button => {
      button.addEventListener('click', () => {
        const itemIdToRemove = button.dataset.id;

        const newCartItems = items.filter(item => item.id !== itemIdToRemove);
        

        localStorage.setItem('maisonDuCafeCart', JSON.stringify(newCartItems));
        

        renderCart(); 
      });
    });
  }


  renderCart();
});