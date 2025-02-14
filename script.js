// Function to handle tab switching
function showTab(tabId) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Show the selected tab
    document.getElementById(tabId).classList.add('active');

    // Update active tab styling
    document.querySelectorAll('.tabs a').forEach(tab => {
        tab.classList.remove('active');
    });

    // Add active class to clicked tab
    document.querySelector(`[href="#${tabId}"]`).classList.add('active');
}

// Ensure "Spoofer" is the default active tab
document.addEventListener("DOMContentLoaded", () => {
    showTab('spoofer');
});
