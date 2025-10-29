// menu.js
document.addEventListener('DOMContentLoaded', function () {
  // Load descriptions for hover dropdowns
  fetch('menu.json')
    .then(res => res.json())
    .then(data => {
      document.querySelectorAll('.item').forEach(card => {
        const id = card.dataset.id;
        const text = data[id] || 'No description available.';
        const drop = document.createElement('div');
        drop.className = 'drop';
        drop.textContent = text;
        card.appendChild(drop);
      });
    });

  // + / − buttons
  document.addEventListener('click', function (e) {
    if (!e.target.classList.contains('qbtn')) return;
    const input = e.target.parentElement.querySelector('.qin');
    const step = parseInt(e.target.dataset.step, 10);
    let v = parseInt(input.value, 10) || 0;
    v += step; if (v < 0) v = 0;
    input.value = v;
    updateCart();
  });

  // Manual typing
  document.addEventListener('input', function (e) {
    if (!e.target.classList.contains('qin')) return;
    let v = parseInt(e.target.value, 10) || 0;
    if (v < 0) v = 0;
    e.target.value = v;
    updateCart();
  });

  // Clear all
  const clearBtn = document.getElementById('cartClear');
  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      document.querySelectorAll('.qin').forEach(i => i.value = 0);
      updateCart();
    });
  }
  
  // NEW: Make 'Proceed to Pay' button go to the cart page
  const payBtn = document.querySelector('.cart .pay');
  if (payBtn) {
    payBtn.addEventListener('click', function() {
      // We just need to go to the page. The data is already saved by updateCart().
      // IMPORTANT: Adjust this path if your menu.html is not in the same folder as cart.html
      // Based on your cart.html file, the path from menu/menu.html to cart/cart.html is:
      window.location.href = '../cart/cart.html'; 
    });
  }

  // Totals + show/hide popup
  function updateCart() {
    let totalItems = 0;
    let totalPrice = 0;
    
    // NEW: Create an array to hold all cart items
    let cartItems = [];

    document.querySelectorAll('.item').forEach(card => {
      const qty = parseInt(card.querySelector('.qin').value, 10) || 0;
      const priceString = card.querySelector('.price').textContent;
      const price = parseInt(priceString.replace(/[^\d]/g, ''), 10) || 0;
      
      totalItems += qty;
      totalPrice += qty * price;

      // NEW: If item has quantity > 0, add its details to our array
      if (qty > 0) {
        const id = card.dataset.id;
        const name = card.querySelector('.row strong').textContent;
        cartItems.push({
          id: id,
          name: name,
          price: price,
          priceDisplay: priceString, // e.g., "₹220"
          quantity: qty
        });
      }
    });
    
    // NEW: Save the entire cart array to localStorage
    // We use JSON.stringify to convert the array into a string for storage
    localStorage.setItem('maisonDuCafeCart', JSON.stringify(cartItems));

    const bar = document.getElementById('cartBar');
    const summary = document.getElementById('cartSummary');
    summary.innerHTML = `<strong>${totalItems}</strong> items • <strong>₹${totalPrice}</strong>`;
    if (totalItems > 0) bar.classList.add('cart--show'); else bar.classList.remove('cart--show');
  }

  updateCart(); // initialize
});