<<<<<<< Updated upstream
document.addEventListener('DOMContentLoaded', function () {
=======

document.addEventListener('DOMContentLoaded', function () {

>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
  document.addEventListener('click', function (e) {
    if (!e.target.classList.contains('qbtn')) return;
    const input = e.target.parentElement.querySelector('.qin');
    const step = parseInt(e.target.dataset.step, 10);
    let v = parseInt(input.value, 10) || 0;
    v += step; if (v < 0) v = 0;
    input.value = v;
    updateCart();
  });

<<<<<<< Updated upstream
=======

  document.addEventListener('input', function (e) {
    if (!e.target.classList.contains('qin')) return;
    let v = parseInt(e.target.value, 10) || 0;
    if (v < 0) v = 0;
    e.target.value = v;
    updateCart();
  });


>>>>>>> Stashed changes
  const clearBtn = document.getElementById('cartClear');
  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      document.querySelectorAll('.qin').forEach(i => i.value = 0);
      updateCart();
    });
  }
<<<<<<< Updated upstream

  const payBtn = document.querySelector('.cart .pay');
  if (payBtn) {
    payBtn.addEventListener('click', function() {window.location.href = '../cart/cart.html'; 
    });
  }

  function updateCart() {
    let totalItems = 0;
    let totalPrice = 0;
=======
  

  const payBtn = document.querySelector('.cart .pay');
  if (payBtn) {
    payBtn.addEventListener('click', function() {



      window.location.href = '../cart/cart.html'; 
    });
  }


  function updateCart() {
    let totalItems = 0;
    let totalPrice = 0;
    

>>>>>>> Stashed changes
    let cartItems = [];

    document.querySelectorAll('.item').forEach(card => {
      const qty = parseInt(card.querySelector('.qin').value, 10) || 0;
      const priceString = card.querySelector('.price').textContent;
      const price = parseInt(priceString.replace(/[^\d]/g, ''), 10) || 0;
      
      totalItems += qty;
      totalPrice += qty * price;

<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
      if (qty > 0) {
        const id = card.dataset.id;
        const name = card.querySelector('.row strong').textContent;
        cartItems.push({
          id: id,
          name: name,
          price: price,
<<<<<<< Updated upstream
          priceDisplay: priceString, 
=======
          priceDisplay: priceString,
>>>>>>> Stashed changes
          quantity: qty
        });
      }
    });
<<<<<<< Updated upstream
=======
    

>>>>>>> Stashed changes

    localStorage.setItem('maisonDuCafeCart', JSON.stringify(cartItems));

    const bar = document.getElementById('cartBar');
    const summary = document.getElementById('cartSummary');
    summary.innerHTML = `<strong>${totalItems}</strong> items • <strong>₹${totalPrice}</strong>`;
    if (totalItems > 0) bar.classList.add('cart--show'); else bar.classList.remove('cart--show');
  }

  updateCart();
});