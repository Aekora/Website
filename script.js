// Function to handle tab switching
function showTab(tabId) {
    // Hide all tab contents with a fade-out effect
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.opacity = 0;
        setTimeout(() => {
            tab.classList.remove('active');
        }, 300); // Match the transition duration
    });

    // Show the selected tab with a fade-in effect
    const activeTab = document.getElementById(tabId);
    setTimeout(() => {
        activeTab.classList.add('active');
        activeTab.style.opacity = 1;
    }, 300);

    // Update active tab styling
    document.querySelectorAll('.tabs a').forEach(tab => {
        tab.classList.remove('active');
    });

    // Add active class to clicked tab
    document.querySelector(`[href="#${tabId}"]`).classList.add('active');
}

// Ensure "Home" is the default active tab
document.addEventListener("DOMContentLoaded", () => {
    showTab('home');
});
