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
    document.getElementById('cart-btn').textContent = `${quantity} Items - $${total.toFixed(2)}`;
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
                <data class="price">${item.price}kr</data>
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
    orderedItems.push({ name: itemName, price });
    const orderList = document.getElementById('order-details-list');
    const item = document.createElement('li');
    item.textContent = `${itemName} - $${price}`;
    orderList.appendChild(item);
    currentTotal += price;
    updateTotal();
    updateCartButtons();
}


function getOrderQuantity() {
    return orderedItems.length;
}

function getOrderTotal() {
    return orderedItems.reduce((acc, item) => acc + item.price, 0);
}

function updateOrderDetails() {
    const itemCountElement = document.getElementById('item-count');
    const orderTotalElement = document.getElementById('order-total');
    const menuItemCountElement = document.getElementById('menu-item-count');
    const menuOrderTotalElement = document.getElementById('menu-order-total');
    const quantity = getOrderQuantity();
    const total = getOrderTotal();
    if (quantity > 0) {
        itemCountElement.textContent = `${quantity} Items`;
        orderTotalElement.textContent = ` - $${total.toFixed(2)}`;
        menuItemCountElement.textContent = `${quantity} Items`;
        menuOrderTotalElement.textContent = `Total: $${total.toFixed(2)}`;
        itemCountElement.style.display = 'inline';
        orderTotalElement.style.display = 'inline';
        document.getElementById('show-order').style.display = 'block';
    } else {
        itemCountElement.style.display = 'none';
        orderTotalElement.style.display = 'none';
        document.getElementById('show-order').style.display = 'none';
    }
    getOrderTotal();
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
}

function cancelOrder() {
    if (confirm('Are you sure you want to cancel this order?')) {
        resetOrder();
    }
}

function resetOrder() {
    orderedItems = [];
    const orderList = document.getElementById('order-details-list');
    orderList.innerHTML = '';
    currentTotal = 0;
    updateTotal();
    updateCartButtons();
}

document.querySelector('.search-btn').addEventListener('click', function () {
    document.querySelector('.search-container').classList.toggle('active');
});

document.querySelector('.search-close-btn').addEventListener('click', function () {
    document.querySelector('.search-container').classList.remove('active');
});