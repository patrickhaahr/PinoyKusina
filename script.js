'use strict';



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const menuToggleBtn = document.querySelector("[data-menu-toggle-btn]");

menuToggleBtn.addEventListener("click", function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
});

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    menuToggleBtn.classList.toggle("active");
  });
}



/**
 * header sticky & back to top
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

// ToggleMenu
function toggleMenu() {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  hamburgerMenu.classList.toggle("active");
  updateOrderDetails();
}

// Function to update the displayed food items based on the filter
function updateMenuDisplay(filter) {
  const foodMenuList = document.querySelector('.food-menu-list');
  foodMenuList.innerHTML = ''; // Clear the current list

  // Append items that match the filter or all items if filter is 'All'
  menuItems.forEach(item => {
    if (filter === 'All' || item.category === filter) {
      foodMenuList.appendChild(createMenuItem(item));
    }
  });
}

// Add event listeners to the filter buttons
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
  button.addEventListener('click', function() {
    // Remove 'active' class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    // Add 'active' class to the clicked button
    this.classList.add('active');

    // Update the menu display with the selected filter
    const selectedFilter = this.getAttribute('data-filter');
    updateMenuDisplay(selectedFilter);
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Initialize the menu with 'All' filter applied
  updateMenuDisplay('All');
});


/**
 * Food Menu Items
 */

const menuItems = [
  {
    name: 'Chicken Adobo',
    price: 120,
    imageSrc: './images/ChickenAdobo.png',
    imageAlt: 'Chicken Adobo',
    category: 'Main Dishes'
  },
  {
    name: 'Pancit',
    price: 120,
    imageSrc: './images/Pancit.png',
    imageAlt: 'Pancit',
    category: 'Main Dishes'
  },
  {
    name: 'Lumpia',
    price: 30,
    imageSrc: './images/Lumpia.png',
    imageAlt: 'Lumpia',
    category: 'Snacks'
  },
  {
    name: 'Siopao',
    price: 30,
    imageSrc: './images/Siopao.png',
    imageAlt: 'Siopao',
    category: 'Snacks'
  },
  {
    name: 'Ube Ice Cream',
    price: 30,
    imageSrc: './images/UbeIceCream.png',
    imageAlt: 'Ube Ice Cream',
    category: 'Desserts'
  },
  {
    name: 'Halo-Halo',
    price: 40,
    imageSrc: './images/Halo-Halo.png',
    imageAlt: 'Halo-Halo',
    category: 'Desserts'
  },
  {
    name: 'C2 Apple Green Tea',
    price: 20,
    imageSrc: './images/C2.png',
    imageAlt: 'C2 Apple Green Tea',
    category: 'Drinks'
  },
  {
    name: 'Red Horse Beer',
    price: 20,
    imageSrc: './images/RedHorseBeer.png',
    imageAlt: 'Red Horse Beer',
    category: 'Drinks'
  },
];

function createMenuItem(item) {
  const li = document.createElement('li');
  li.className = item.category;

  li.innerHTML = `
    <div class="food-menu-card">
      <div class="card-banner">
        <img
          src="${item.imageSrc}"
          width="300"
          height="300"
          loading="lazy"
          alt="${item.imageAlt}"
          class="w-100"
        />
        <button
          class="btn food-menu-btn"
          onclick="addItem('${item.name}', ${item.price})"
        >
          Order Now
        </button>
      </div>
      <h3 class="h3 card-title">${item.name}</h3>
      <div class="price-wrapper">
        <p class="price-text">Price:</p>
        <data class="price">${item.price}kr</data>
      </div>
    </div>
  `;

  return li;
}

const foodMenuList = document.querySelector('.food-menu-list');
menuItems.forEach(item => {
  foodMenuList.appendChild(createMenuItem(item));
});

/**
 * Order Details
 */
let orderNumber = 1;
let totalSales = 0;
let currentTotal = 0;

function addItem(itemName, price) {
    const orderList = document.getElementById('order-details-list');
    const item = document.createElement('li');
    item.textContent = `${itemName} - $${price}`;
    orderList.appendChild(item);
    currentTotal += price;
    updateTotal();
    updateOrderDetails();
}

function getOrderQuantity() {
  // Implement the logic to get the quantity of the items in the order
  // For example, if you store each item as an object in an array, you might do:
  return menuItems.length; // If menuItems is an array of ordered items
}
function updateOrderDetails() {
  const itemCountElement = document.getElementById('item-count');
  const orderTotalElement = document.getElementById('order-total');
  const menuItemCountElement = document.getElementById('menu-item-count');
  const menuOrderTotalElement = document.getElementById('menu-order-total');

  // Assuming you have a function or a way to get the quantity of items
  const quantity = getOrderQuantity(); // You need to implement this function
  const total = getOrderTotal(); // You need to implement this function

  if (quantity > 0) {
    // Show dynamic elements with updated details
    itemCountElement.textContent = `${quantity} Items`;
    orderTotalElement.textContent = ` - $${total.toFixed(2)}`;
    menuItemCountElement.textContent = `${quantity} Items`;
    menuOrderTotalElement.textContent = `Total: $${total.toFixed(2)}`;

    // Make sure they are visible
    itemCountElement.style.display = 'inline';
    orderTotalElement.style.display = 'inline';
    document.getElementById('show-order').style.display = 'block';
  } else {
    // Hide dynamic elements if no items are selected
    itemCountElement.style.display = 'none';
    orderTotalElement.style.display = 'none';
    document.getElementById('show-order').style.display = 'none';
  }
}

// Call updateOrderDetails to initialize the state on page load
updateOrderDetails();

function updateTotal() {
    const totalElement = document.getElementById('total');
    totalElement.textContent = currentTotal;
}

function submitOrder() {
    totalSales += currentTotal;
    alert(`Order #${orderNumber} placed. Total: $${currentTotal}`);
    orderNumber++;
    resetOrder();
}

function cancelOrder() {
    if (confirm('Are you sure you want to cancel this order?')) {
        resetOrder();
    }
}

function resetOrder() {
    const orderList = document.getElementById('order-details-list');
    orderList.innerHTML = '';
    currentTotal = 0;
    updateTotal();
}

document.querySelector('.search-btn').addEventListener('click', function() {
    document.querySelector('.search-container').classList.toggle('active');
});

document.querySelector('.search-close-btn').addEventListener('click', function() {
    document.querySelector('.search-container').classList.remove('active');
});
