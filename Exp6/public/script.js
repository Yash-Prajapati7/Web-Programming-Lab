// Simple JavaScript demonstration
console.log('✅ JavaScript file loaded successfully!');
console.log('🌐 This file is being served by our custom Node.js HTTP server');

// Add dynamic timestamp to page
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 Page loaded at:', new Date().toLocaleString());
    
    // Add some interactivity
    const cards = document.querySelectorAll('.card');
    console.log(`📦 Found ${cards.length} cards on the page`);

    // Log clicks on links
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            console.log(`🔗 Navigating to: ${link.href}`);
        });
    });

    // Show a welcome message
    setTimeout(() => {
        console.log('👋 Welcome! The server is working correctly.');
    }, 1000);
});
