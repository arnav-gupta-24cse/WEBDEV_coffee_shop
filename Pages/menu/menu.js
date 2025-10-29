// Beginner-friendly: JSON dropdowns + qty controls + cart totals (no action on Pay)
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

  // Totals + show/hide popup
  function updateCart() {
    let totalItems = 0, totalPrice = 0;
    document.querySelectorAll('.item').forEach(card => {
      const qty = parseInt(card.querySelector('.qin').value, 10) || 0;
      const price = parseInt(card.querySelector('.price').textContent.replace(/[^\d]/g, ''), 10) || 0;
      totalItems += qty;
      totalPrice += qty * price;
    });

    const bar = document.getElementById('cartBar');
    const summary = document.getElementById('cartSummary');
    summary.innerHTML = `<strong>${totalItems}</strong> items • <strong>₹${totalPrice}</strong>`;
    if (totalItems > 0) bar.classList.add('cart--show'); else bar.classList.remove('cart--show');
  }

  updateCart(); // initialize
});
