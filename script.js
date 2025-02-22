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

    console.log("Product details:", product); // Debugging log

    // Populate the purchase window with product details
    document.getElementById('purchase-image').src = product.image;
    document.getElementById('purchase-name').textContent = product.name;

    // Set the product ID on the purchase window
    document.getElementById('purchase-window').setAttribute('data-product-id', productId);

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

    // Get the product ID from the purchase window
    const productId = document.getElementById('purchase-window').getAttribute('data-product-id');

    console.log("Adding to cart:", productId, duration, price); // Debugging log

    // Add the product to the cart
    addToCart(productId, duration, price);

    // Close the purchase window
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
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add an item to the cart
function addToCart(productId, duration, price) {
    const product = getProductDetails(productId);
    if (!product) {
        console.error("Product not found:", productId);
        return;
    }

    // Check if the product is already in the cart
    const existingItem = cart.find(item => item.id === productId && item.duration === duration);
    if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if the item already exists
    } else {
        const cartItem = {
            id: productId,
            name: product.name,
            duration: duration,
            price: price,
            quantity: 1 // Default quantity is 1
        };
        cart.push(cartItem); // Add the item to the cart array
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage

    console.log("Cart after adding item:", cart); // Debugging log

    updateCartCount(); // Update the cart count
    updateCartModal(); // Update the cart modal
}

// Function to update the cart count in the header
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (!cartCount) {
        console.error("Cart count element not found!");
        return;
    }
    cartCount.textContent = cart.length; // Update the cart count
    console.log("Cart count updated to:", cart.length); // Debugging log
}

// Function to update the cart modal with items
function updateCartModal() {
    const cartItems = document.getElementById('cart-items');
    if (!cartItems) {
        console.error("Cart items element not found!");
        return;
    }
    cartItems.innerHTML = ''; // Clear existing items

    console.log("Updating cart modal with items:", cart); // Debugging log

    // Update total price
    const totalPrice = cart.reduce((total, item) => {
        const price = parseFloat(item.price.replace('€', ''));
        return total + price * item.quantity;
    }, 0);

    // Display total price
    const totalElement = document.createElement('div');
    totalElement.className = 'cart-total';
    totalElement.innerHTML = `<strong>Total: ${totalPrice.toFixed(2)}€</strong>`;
    cartItems.appendChild(totalElement);

    // Add Proceed to Checkout button
    const checkoutButton = document.createElement('button');
    checkoutButton.className = 'checkout-button';
    checkoutButton.textContent = 'Proceed to Checkout';
    checkoutButton.onclick = () => window.location.href = 'checkout.html';
    cartItems.appendChild(checkoutButton);
}

// Function to remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove the item from the cart array
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    displayCheckoutItems(); // Refresh the checkout items display
    updateCartCount(); // Update the cart count in the header
}

// Function to open the cart modal
function openCart() {
    const cartModal = document.getElementById('cart-modal');
    if (!cartModal) {
        console.error("Cart modal element not found!");
        return;
    }
    cartModal.style.display = 'flex';
    console.log("Cart modal opened"); // Debugging log
}

// Function to close the cart modal
function closeCart() {
    const cartModal = document.getElementById('cart-modal');
    if (!cartModal) {
        console.error("Cart modal element not found!");
        return;
    }
    cartModal.style.display = 'none';
    console.log("Cart modal closed"); // Debugging log
}

// Add event listeners to all product cards
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('csgo-card')?.addEventListener('click', () => showPurchaseWindow('csgo'));
    document.getElementById('fortnite-card')?.addEventListener('click', () => showPurchaseWindow('fortnite'));
    document.getElementById('rust-card')?.addEventListener('click', () => showPurchaseWindow('rust'));
    document.getElementById('spoofer-card')?.addEventListener('click', () => showPurchaseWindow('spoofer'));

    // Add event listener to the cart icon
    document.getElementById('cart-icon')?.addEventListener('click', openCart);

    // Ensure "Home" is the default active tab
    showTab('home');
    updateCartCount(); // Update cart count on page load
    updateCartModal(); // Update cart modal on page load
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

document.getElementById('back-to-top')?.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Function to display cart items on the checkout page
function displayCheckoutItems() {
    const checkoutItems = document.querySelector('#checkout-items tbody');
    const checkoutTotal = document.getElementById('checkout-total');

    if (!checkoutItems || !checkoutTotal) return; // Exit if not on the checkout page

    // Read cart data from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log("Cart data:", cart); // Debugging log

    checkoutItems.innerHTML = ''; // Clear existing items

    // Add each item in the cart to the checkout page
    cart.forEach((item, index) => {
        const product = getProductDetails(item.id); // Get product details (including icon)

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${product.image}" alt="${product.name}" class="checkout-product-icon"></td>
            <td>
                <div class="product-name-duration">
                    <div class="product-name">${item.name}</div>
                    <div class="duration">${item.duration}</div>
                </div>
            </td>
            <td>
                <div class="price-label">Price</div>
                <div class="price-value">${item.price}</div>
            </td>
            <td>
                <div class="quantity-label">Quantity</div>
                <div class="quantity-value">${item.quantity}</div>
            </td>
            <td><button class="remove-item" onclick="removeFromCart(${index})">X</button></td> <!-- Remove button -->
        `;
        checkoutItems.appendChild(row);
    });

    // Calculate and display the total price
    const totalPrice = cart.reduce((total, item) => {
        const price = parseFloat(item.price.replace('€', ''));
        return total + price * item.quantity;
    }, 0);

    checkoutTotal.innerHTML = `<strong>Total: ${totalPrice.toFixed(2)}€</strong>`;
}

// Call this function when the checkout page loads
document.addEventListener("DOMContentLoaded", () => {
    displayCheckoutItems();
});
