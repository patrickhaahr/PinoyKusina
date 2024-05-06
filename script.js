'use strict';

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

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
    const shouldBeActive = window.scrollY >= 100;
    header.classList.toggle("active", shouldBeActive);
    backTopBtn.classList.toggle("active", shouldBeActive);
});

const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
    button.addEventListener('click', function () {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        const selectedFilter = this.getAttribute('data-filter');
        updateMenuDisplay(selectedFilter);
    });
});

document.addEventListener('DOMContentLoaded', (event) => {
    updateMenuDisplay('All');
});

function toggleCartDropdown() {
    const dropdown = document.getElementById('shopping-cart-dropdown');
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}

document.getElementById('cart-btn').addEventListener('click', toggleCartDropdown);

function updateCartButtons() {
    const quantity = getOrderQuantity();
    const total = getOrderTotal();
    document.getElementById('cart-btn').textContent = `(${quantity}) Show order ${total.toFixed(2)}kr.`;
    updateOrderDetails();
}

document.getElementById('shopping-cart-dropdown').style.display = 'none';

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
        name: 'Chicken Sopas',
        price: 80,
        imageSrc: './images/sopas.png',
        imageAlt: 'Chicken sopas',
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

const foodMenuList = document.querySelector('.food-menu-list');
menuItems.forEach(item => {
    foodMenuList.appendChild(createMenuItem(item));
});

let orderNumber = 1;
let totalSales = 0;
let currentTotal = 0;
let orderedItems = [];

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

function getOrderQuantity() {
    return Object.values(orderedItems).reduce((acc, item) => acc + item.quantity, 0);
}

function getOrderTotal() {
    return Object.values(orderedItems).reduce((acc, item) => acc + item.price * item.quantity, 0);
}

function updateOrderDetails() {
    const orderList = document.getElementById('order-details-list');
    orderList.innerHTML = '';

    for (const itemName in orderedItems) {
        const item = orderedItems[itemName];
        const listItem = document.createElement('li');
        listItem.textContent = `x${item.quantity} ${itemName} ${item.price * item.quantity}kr.`;
        orderList.appendChild(listItem);
    }

    const total = getOrderTotal();
    document.getElementById('total').textContent = `${total.toFixed(2)}`;
    document.getElementById('cart-btn').textContent = `(${getOrderQuantity()}) Show order ${total.toFixed(2)}kr.`;

    // If the cart is empty, hide the dropdown
    if (total === 0) {
        document.getElementById('shopping-cart-dropdown').style.display = 'none';
    }
}

updateOrderDetails();

function updateTotal() {
    const totalElement = document.getElementById('total');
    totalElement.textContent = currentTotal;
}

function submitOrder() {
    alert(`Order #${orderNumber} placed. Total: ${currentTotal} kr.`);
    totalSales += currentTotal;
    orderNumber++;
    resetOrder();
    updateCartButtons(); // Remove this line
}

function cancelOrder() {
    if (confirm('Are you sure you want to cancel this order?')) {
        resetOrder();
    }
}

function resetOrder() {
    orderedItems = {};
    currentTotal = 0;
    updateOrderDetails();
    updateTotal();
    updateCartButtons();
    document.getElementById('shopping-cart-dropdown').style.display = 'none';
}

document.querySelector('.search-btn').addEventListener('click', function () {
    document.querySelector('.search-container').classList.toggle('active');
});

document.querySelector('.search-close-btn').addEventListener('click', function () {
    document.querySelector('.search-container').classList.remove('active');
});