// Function to handle tab switching with a simple fade animation
function showTab(tabId) {
    // Hide all tab contents with a fade-out effect
    document.querySelectorAll('.tab-content').forEach(tab => {
        if (tab.classList.contains('active')) {
            tab.style.opacity = 0; // Fade out
            setTimeout(() => {
                tab.classList.remove('active');
            }, 200); // Match the transition duration
        }
    });

    // Show the selected tab with a fade-in effect
    const activeTab = document.getElementById(tabId);
    setTimeout(() => {
        activeTab.classList.add('active');
        activeTab.style.opacity = 1; // Fade in
    }, 200);

    // Update active tab styling
    document.querySelectorAll('.tabs a').forEach(tab => {
        tab.classList.remove('active');
    });

    // Add active class to clicked tab
    document.querySelector(`[href="#${tabId}"]`).classList.add('active');
}

// Toggle TOS sections
function toggleSection(header) {
    const content = header.nextElementSibling;
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
    header.classList.toggle('active');
}

// Function to show the purchase window
function showPurchaseWindow(productId) {
    // Hide all product cards and the "Choose a game" text
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.display = 'none';
    });
    document.querySelector('.choose-game-text').style.display = 'none';

    // Get the product details based on the productId
    const product = getProductDetails(productId);

    // Populate the purchase window with product details
    document.getElementById('purchase-image').src = product.image;
    document.getElementById('purchase-name').textContent = product.name;

    // Generate dropdown options based on the product
    const dropdown = document.getElementById('duration-dropdown');
    dropdown.innerHTML = ''; // Clear existing options

    const options = getProductOptions(productId);
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.text;
        dropdown.appendChild(optionElement);
    });

    // Show the purchase window
    document.getElementById('purchase-window').style.display = 'flex';
}

// Function to close the purchase window
function closePurchaseWindow() {
    // Hide the purchase window
    document.getElementById('purchase-window').style.display = 'none';

    // Clear the dropdown
    const dropdown = document.getElementById('duration-dropdown');
    dropdown.innerHTML = '';

    // Show all product cards and the "Choose a game" text
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.display = 'block';
    });
    document.querySelector('.choose-game-text').style.display = 'block';
}

// Function to handle the purchase
function handlePurchase() {
    const dropdown = document.getElementById('duration-dropdown');
    const selectedOption = dropdown.options[dropdown.selectedIndex];
    const duration = selectedOption.value;
    const price = selectedOption.text.split(' - ')[1]; // Extract price from the option text
    const productId = document.getElementById('purchase-name').textContent.toLowerCase().replace(' ', '-');
    addToCart(productId, duration, price);
    closePurchaseWindow();
}

// Helper function to get product details
function getProductDetails(productId) {
    const products = {
        'csgo': {
            image: 'images/cs-icon.png',
            name: 'CS2 Cheat Software',
            description: '<span class="undetected-label"><i class="fas fa-check"></i> Undetected</span>'
        },
        'fortnite': {
            image: 'images/fortnite-icon.png',
            name: 'Fortnite Cheat Software',
            description: '<span class="undetected-label"><i class="fas fa-check"></i> Undetected</span>'
        },
        'rust': {
            image: 'images/rust-icon.png',
            name: 'Rust Cheat Software',
            description: '<span class="undetected-label"><i class="fas fa-check"></i> Undetected</span>'
        },
        'spoofer': {
            image: 'images/spoofer-icon.png',
            name: 'Spoofer Software',
            description: '<span class="undetected-label"><i class="fas fa-check"></i> Undetected</span>'
        }
    };
    return products[productId];
}

// Helper function to get product options
function getProductOptions(productId) {
    const options = {
        'csgo': [
            { value: '1month', text: '1 Month - 20€' },
            { value: '3months', text: '3 Months - 50€' },
            { value: '6months', text: '6 Months - 80€' },
            { value: '1year', text: '1 Year - 140€' }
        ],
        'fortnite': [
            { value: '1day', text: '1 Day - 9€' },
            { value: '3days', text: '3 Days - 18€' },
            { value: '1week', text: '1 Week - 35€' },
            { value: '1month', text: '1 Month - 65€' }
        ],
        'rust': [
            { value: '1day', text: '1 Day - 8€' },
            { value: '3days', text: '3 Days - 16€' },
            { value: '1week', text: '1 Week - 30€' },
            { value: '1month', text: '1 Month - 60€' }
        ],
        'spoofer': [
            { value: '1time', text: '1 Time - 15€' },
            { value: 'lifetime', text: 'Lifetime - 45€' }
        ]
    };
    return options[productId];
}

// Cart functionality
let cart = [];

function addToCart(productId, duration, price) {
    const product = getProductDetails(productId);
    const cartItem = {
        id: productId,
        name: product.name,
        duration: duration,
        price: price
    };
    cart.push(cartItem);
    updateCartCount();
    updateCartModal();
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}

function updateCartModal() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span>${item.name} (${item.duration})</span>
            <span>${item.price}</span>
        `;
        cartItems.appendChild(cartItem);
    });
}

function openCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = 'flex';
}

function closeCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = 'none';
}

// Add event listeners to all product cards
document.getElementById('csgo-card').addEventListener('click', () => showPurchaseWindow('csgo'));
document.getElementById('fortnite-card').addEventListener('click', () => showPurchaseWindow('fortnite'));
document.getElementById('rust-card').addEventListener('click', () => showPurchaseWindow('rust'));
document.getElementById('spoofer-card').addEventListener('click', () => showPurchaseWindow('spoofer'));

// Add event listener to the cart icon
document.getElementById('cart-icon').addEventListener('click', openCart);

// Ensure "Home" is the default active tab
document.addEventListener("DOMContentLoaded", () => {
    showTab('home');

    // Animate stats numbers immediately
    const rating = new CountUp('rating-number', 4.99, { duration: 2 });
    const productsSold = new CountUp('products-sold-number', 7905, { duration: 2 });
    const customers = new CountUp('customers-number', 1203, { duration: 2 });

    // Start animations only if the home tab is active
    if (document.getElementById('home').classList.contains('active')) {
        rating.start();
        productsSold.start();
        customers.start();
    }
});

// Particles.js background
particlesJS.load('particles-js', 'particles.json', function () {
    console.log('Particles loaded!');
});

// Back to Top Button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("back-to-top").style.display = "block";
    } else {
        document.getElementById("back-to-top").style.display = "none";
    }
}

document.getElementById('back-to-top').addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
