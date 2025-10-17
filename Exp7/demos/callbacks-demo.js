/**
 * E-COMMERCE WORKFLOW USING CALLBACKS
 * Demonstrates traditional callback-based async programming
 */

console.log('\n📦 E-Commerce Order Processing - CALLBACKS Pattern\n');

// Simulated database of products
const products = [
    { id: 1, name: 'Laptop', price: 999, stock: 5 },
    { id: 2, name: 'Mouse', price: 25, stock: 10 },
    { id: 3, name: 'Keyboard', price: 75, stock: 0 }
];

// Simulated user data
const users = [
    { id: 1, name: 'John Doe', balance: 2000 }
];

// 1. Fetch product list (simulates database query)
function fetchProducts(callback) {
    console.log('⏳ Fetching products from database...');
    setTimeout(() => {
        console.log('✅ Products fetched successfully');
        callback(null, products);
    }, 1000);
}

// 2. Validate product availability
function checkInventory(productId, quantity, callback) {
    console.log(`⏳ Checking inventory for product ID: ${productId}...`);
    setTimeout(() => {
        const product = products.find(p => p.id === productId);
        if (!product) {
            return callback(new Error('Product not found'));
        }
        if (product.stock < quantity) {
            return callback(new Error(`Insufficient stock. Available: ${product.stock}`));
        }
        console.log('✅ Inventory check passed');
        callback(null, product);
    }, 800);
}

// 3. Process payment
function processPayment(userId, amount, callback) {
    console.log(`⏳ Processing payment of $${amount}...`);
    setTimeout(() => {
        const user = users.find(u => u.id === userId);
        if (!user) {
            return callback(new Error('User not found'));
        }
        if (user.balance < amount) {
            return callback(new Error(`Insufficient funds. Balance: $${user.balance}`));
        }
        user.balance -= amount;
        console.log(`✅ Payment processed. Remaining balance: $${user.balance}`);
        callback(null, { transactionId: Date.now(), amount });
    }, 1200);
}

// 4. Update inventory
function updateInventory(productId, quantity, callback) {
    console.log(`⏳ Updating inventory for product ID: ${productId}...`);
    setTimeout(() => {
        const product = products.find(p => p.id === productId);
        product.stock -= quantity;
        console.log(`✅ Inventory updated. New stock: ${product.stock}`);
        callback(null, product);
    }, 600);
}

// 5. Generate order confirmation
function generateConfirmation(orderId, product, transaction, callback) {
    console.log('⏳ Generating order confirmation...');
    setTimeout(() => {
        const confirmation = {
            orderId,
            productName: product.name,
            price: product.price,
            transactionId: transaction.transactionId,
            timestamp: new Date().toISOString()
        };
        console.log('✅ Order confirmation generated');
        callback(null, confirmation);
    }, 500);
}

// Main order processing function - CALLBACK HELL / PYRAMID OF DOOM
function processOrder(userId, productId, quantity) {
    console.log('\n🛒 Starting order processing...\n');
    
    // Callback hell begins here
    fetchProducts((err, products) => {
        if (err) return console.error('❌ Error:', err.message);
        
        checkInventory(productId, quantity, (err, product) => {
            if (err) return console.error('❌ Error:', err.message);
            
            processPayment(userId, product.price * quantity, (err, transaction) => {
                if (err) return console.error('❌ Error:', err.message);
                
                updateInventory(productId, quantity, (err, updatedProduct) => {
                    if (err) return console.error('❌ Error:', err.message);
                    
                    generateConfirmation(
                        Date.now(),
                        product,
                        transaction,
                        (err, confirmation) => {
                            if (err) return console.error('❌ Error:', err.message);
                            
                            // Success!
                            console.log('\n' + '='.repeat(50));
                            console.log('🎉 ORDER COMPLETED SUCCESSFULLY');
                            console.log('='.repeat(50));
                            console.log('Order Details:');
                            console.log(JSON.stringify(confirmation, null, 2));
                            console.log('='.repeat(50) + '\n');
                        }
                    );
                });
            });
        });
    });
}

// Execute order
processOrder(1, 1, 1);

// Demonstrate callback hell problem
setTimeout(() => {
    console.log('\n⚠️  CALLBACK ISSUES DEMONSTRATED:');
    console.log('  • Deep nesting (Pyramid of Doom)');
    console.log('  • Difficult to read and maintain');
    console.log('  • Error handling is repetitive');
    console.log('  • Hard to debug');
    console.log('  • Cannot use try/catch for errors\n');
}, 5000);
