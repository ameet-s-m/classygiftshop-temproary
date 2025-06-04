
function addToCart(productName) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingItem = cart.find(item => item.name === productName);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name: productName, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(productName + " added to cart!");
}

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContainer = document.getElementById('cart-items');
  if (!cartItems.length) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  const listHtml = cartItems.map((item, index) => `
    <li>
      ${item.name} - Quantity: 
      <button onclick="updateQuantity(${index}, -1)">-</button>
      ${item.quantity}
      <button onclick="updateQuantity(${index}, 1)">+</button>
      <button onclick="removeItem(${index})">Remove</button>
    </li>`).join("");

  cartContainer.innerHTML = "<ul>" + listHtml + "</ul>";
}

function updateQuantity(index, delta) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart[index]) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
  }
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

function checkout(platform) {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  if (!cartItems.length) {
    alert("Your cart is empty!");
    return;
  }

  let message = "Hello! I would like to place the following order from Classy Gift Shop:%0A";
  cartItems.forEach(item => {
    message += `- ${item.name} x ${item.quantity}%0A`;
  });

  if (platform === 'whatsapp') {
    window.open("https://wa.me/919480191392?text=" + message, "_blank");
  } else if (platform === 'instagram') {
    window.open("https://www.instagram.com/classy_gift_shop/", "_blank");
  }
}

if (window.location.pathname.includes('cart.html')) {
  document.addEventListener('DOMContentLoaded', loadCart);
}
