function getCart() {
  const cart = JSON.parse(localStorage.getItem('cart'));
  return cart ? cart : [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

let cart = getCart();

function addToCart(productId, productName, productPrice) {
  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
      existingItem.quantity++;
  } else {
      cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
  }
  saveCart(cart);
  updateCartDisplay();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartElement = document.getElementById('cart');
  cartElement.innerHTML = '';
  if (cart.length === 0) {
      const emptyMessage = document.createElement('li');
      emptyMessage.textContent = 'Your cart is empty.';
      cartElement.appendChild(emptyMessage);
  } else {
      cart.forEach(item => {
          const listItem = document.createElement('li');
          listItem.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
          const removeButton = document.createElement('button');
          removeButton.textContent = 'Remove';
          removeButton.addEventListener('click', () => {
              removeFromCart(item.id);
          });
          listItem.appendChild(removeButton);
          cartElement.appendChild(listItem);
      });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
  addToCartButtons.forEach(button => {
      button.addEventListener('click', () => {
          const productElement = button.parentElement;
          const productId = parseInt(productElement.dataset.id, 10);
          const productName = productElement.dataset.name;
          const productPrice = parseFloat(productElement.dataset.price);
          addToCart(productId, productName, productPrice);
      });
  });
  removeFromCartButtons.forEach(button => {
      button.addEventListener('click', () => {
          const productElement = button.parentElement;
          const productId = parseInt(productElement.dataset.id, 10);
          removeFromCart(productId);
      });
  });
  if (window.location.pathname.includes("cart.html")) {
      updateCartDisplay();
  }
});
