"use strict"; // enforces strict mode for this script, meaning it can't access variables that aren't declared, etc.

// Toggle the navigation menu
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

// Activate the header and back-to-top button when scrolling
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  const shouldBeActive = window.scrollY >= 100;
  header.classList.toggle("active", shouldBeActive);
  backTopBtn.classList.toggle("active", shouldBeActive);
});

// Filter food items
const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");
    const selectedFilter = this.getAttribute("data-filter");
    updateMenuDisplay(selectedFilter);
  });
});

// Display all menu items by default
document.addEventListener("DOMContentLoaded", (event) => {
  updateMenuDisplay("All");
});

// Toggle the shopping cart dropdown
function toggleCartDropdown() {
  const dropdown = document.getElementById("shopping-cart-dropdown");
  dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
}

document
  .getElementById("cart-btn")
  .addEventListener("click", toggleCartDropdown);

// Update the shopping cart buttons
function updateCartButtons() {
  const quantity = getOrderQuantity();
  const total = getOrderTotal();
  document.getElementById(
    "cart-btn"
  ).textContent = `(${quantity}) Show order ${total.toFixed(2)}kr.`;
  document.getElementById("total").textContent = `${total.toFixed(2)}`;
}

document.getElementById("shopping-cart-dropdown").style.display = "none";

// Define the menu items
const menuItems = [
  {
    name: "Chicken Adobo",
    price: 120,
    imageSrc: "./images/ChickenAdobo.png",
    imageAlt: "Chicken Adobo",
    category: "Main Dishes",
  },
  {
    name: "Pancit",
    price: 120,
    imageSrc: "./images/Pancit.png",
    imageAlt: "Pancit",
    category: "Main Dishes",
  },
  {
    name: "Chicken Sopas",
    price: 80,
    imageSrc: "./images/sopas.png",
    imageAlt: "Chicken sopas",
    category: "Main Dishes",
  },
  {
    name: "Lumpia",
    price: 30,
    imageSrc: "./images/Lumpia.png",
    imageAlt: "Lumpia",
    category: "Snacks",
  },
  {
    name: "Siopao",
    price: 30,
    imageSrc: "./images/Siopao.png",
    imageAlt: "Siopao",
    category: "Snacks",
  },
  {
    name: "Ube Ice Cream",
    price: 30,
    imageSrc: "./images/UbeIceCream.png",
    imageAlt: "Ube Ice Cream",
    category: "Desserts",
  },
  {
    name: "Halo-Halo",
    price: 40,
    imageSrc: "./images/Halo-Halo.png",
    imageAlt: "Halo-Halo",
    category: "Desserts",
  },
  {
    name: "C2 Apple Green Tea",
    price: 20,
    imageSrc: "./images/C2.png",
    imageAlt: "C2 Apple Green Tea",
    category: "Drinks",
  },
  {
    name: "Red Horse Beer",
    price: 20,
    imageSrc: "./images/RedHorseBeer.png",
    imageAlt: "Red Horse Beer",
    category: "Drinks",
  },
];

// Create menu item elements
function createMenuItem(item) {
  const li = document.createElement("li");
  li.className = item.category;
  li.innerHTML = `
        <div class="food-menu-card">
            <div class="card-banner">
                <img src="${item.imageSrc}" width="300" height="300" loading="lazy" alt="${item.imageAlt}" class="w-100">
                <button class="btn food-menu-btn" onclick="addItem('${item.name}', ${item.price})">Order Now</button>
            </div>
            <h3 class="h3 card-title">${item.name}</h3>
            <div class="price-wrapper">
                <p class="price-text">Price:</p>
                <data class="price">${item.price}kr.</data>
            </div>
        </div>`;
  return li;
}

// Update the menu display based on the filter
function updateMenuDisplay(filter) {
  const foodMenuList = document.querySelector(".food-menu-list");
  foodMenuList.innerHTML = ""; // Clear the current list

  // Append items that match the filter or all items if filter is 'All'
  menuItems.forEach((item) => {
    if (filter === "All" || item.category === filter) {
      foodMenuList.appendChild(createMenuItem(item));
    }
  });
}

// Initialize the menu display
const foodMenuList = document.querySelector(".food-menu-list");
menuItems.forEach((item) => {
  foodMenuList.appendChild(createMenuItem(item));
});

let orderNumber = 1;
let totalSales = 0;
let currentTotal = 0;
let orderedItems = [];

// Add an item to the order
function addItem(itemName, price) {
  if (orderedItems[itemName]) {
    orderedItems[itemName].quantity += 1;
  } else {
    orderedItems[itemName] = { price, quantity: 1 };
  }
  currentTotal += price;
  updateOrderDetails();
  updateCartButtons();
}

// Get the total quantity of items ordered
function getOrderQuantity() {
  return Object.values(orderedItems).reduce(
    (acc, item) => acc + item.quantity,
    0
  );
}

// Get the total cost of items ordered
function getOrderTotal() {
  return Object.values(orderedItems).reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
}

// Update the order details in the dropdown
function updateOrderDetails() {
  document.getElementById("order-number").textContent = orderNumber;
  const orderList = document.getElementById("order-details-list");
  orderList.innerHTML = "";

  for (const itemName in orderedItems) {
    const item = orderedItems[itemName];
    const listItem = document.createElement("li");
    listItem.innerHTML = `
            <button class="modify-btn" onclick="addItem('${itemName}', ${item.price
      })">+</button>
            x<span>${item.quantity
      }</span><button class="modify-btn" onclick="removeItem('${itemName}')">-</button>${itemName} ${item.price * item.quantity
      }kr.
        `;
    orderList.appendChild(listItem);
  }
  updateCartButtons();

  const total = getOrderTotal();
  document.getElementById("total").textContent = `${total.toFixed(2)}`;
  document.getElementById(
    "cart-btn"
  ).textContent = `(${getOrderQuantity()}) Show order ${total.toFixed(2)}kr.`;
  // If the cart is empty, hide the dropdown
  if (total === 0) {
    document.getElementById("shopping-cart-dropdown").style.display = "none";
  }
}
updateOrderDetails();

// Remove an item from the order
function removeItem(itemName) {
  if (orderedItems[itemName].quantity > 1) {
    orderedItems[itemName].quantity -= 1;
    currentTotal -= orderedItems[itemName].price;
  } else {
    currentTotal -= orderedItems[itemName].price;
    delete orderedItems[itemName];
  }
  updateOrderDetails();
}

// Submit the order
function submitOrder() {
  let orderDetails = "Order #" + orderNumber + ":\n";
  for (const itemName in orderedItems) {
    const item = orderedItems[itemName];
    orderDetails += `x${item.quantity} ${itemName} - ${item.price * item.quantity
      }kr.\n`;
  }
  orderDetails += `Total: ${currentTotal} kr.`;
  alert(orderDetails);
  // Reset order after showing details
  totalSales += currentTotal;
  document.getElementById("total-revenue").textContent = totalSales.toFixed(2);
  orderNumber++;
  resetOrder();
}

// Cancel the order
function cancelOrder() {
  if (confirm("Are you sure you want to cancel this order?")) {
    resetOrder();
  }
}

// Reset the order details
function resetOrder() {
  orderedItems = {};
  currentTotal = 0;
  updateOrderDetails();
  updateTotal();
  updateCartButtons();
  document.getElementById("shopping-cart-dropdown").style.display = "none";
}
