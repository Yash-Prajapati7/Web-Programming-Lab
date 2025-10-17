/**
 * E-COMMERCE WORKFLOW USING PROMISES
 * Demonstrates Promise-based async programming
 */

console.log('\n📦 E-Commerce Order Processing - PROMISES Pattern\n');

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

// 1. Fetch product list (returns Promise)
function fetchProducts() {
    console.log('⏳ Fetching products from database...');
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('✅ Products fetched successfully');
            resolve(products);
        }, 1000);
    });
}

// 2. Validate product availability (returns Promise)
function checkInventory(productId, quantity) {
    console.log(`⏳ Checking inventory for product ID: ${productId}...`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const product = products.find(p => p.id === productId);
            if (!product) {
                reject(new Error('Product not found'));
                return;
            }
            if (product.stock < quantity) {
                reject(new Error(`Insufficient stock. Available: ${product.stock}`));
                return;
            }
            console.log('✅ Inventory check passed');
            resolve(product);
        }, 800);
    });
}

// 3. Process payment (returns Promise)
function processPayment(userId, amount) {
    console.log(`⏳ Processing payment of $${amount}...`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = users.find(u => u.id === userId);
            if (!user) {
                reject(new Error('User not found'));
                return;
            }
            if (user.balance < amount) {
                reject(new Error(`Insufficient funds. Balance: $${user.balance}`));
                return;
            }
            user.balance -= amount;
            console.log(`✅ Payment processed. Remaining balance: $${user.balance}`);
            resolve({ transactionId: Date.now(), amount });
        }, 1200);
    });
}

// 4. Update inventory (returns Promise)
function updateInventory(productId, quantity) {
    console.log(`⏳ Updating inventory for product ID: ${productId}...`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const product = products.find(p => p.id === productId);
            if (!product) {
                reject(new Error('Product not found'));
                return;
            }
            product.stock -= quantity;
            console.log(`✅ Inventory updated. New stock: ${product.stock}`);
            resolve(product);
        }, 600);
    });
}

// 5. Generate order confirmation (returns Promise)
function generateConfirmation(orderId, product, transaction) {
    console.log('⏳ Generating order confirmation...');
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const confirmation = {
                orderId,
                productName: product.name,
                price: product.price,
                transactionId: transaction.transactionId,
                timestamp: new Date().toISOString()
            };
            console.log('✅ Order confirmation generated');
            resolve(confirmation);
        }, 500);
    });
}

// Main order processing function - PROMISE CHAIN
function processOrder(userId, productId, quantity) {
    console.log('\n🛒 Starting order processing...\n');
    
    let product, transaction;
    
    // Promise chain - much cleaner than callbacks!
    return fetchProducts()
        .then(() => checkInventory(productId, quantity))
        .then(foundProduct => {
            product = foundProduct;
            return processPayment(userId, product.price * quantity);
        })
        .then(trans => {
            transaction = trans;
            return updateInventory(productId, quantity);
        })
        .then(() => generateConfirmation(Date.now(), product, transaction))
        .then(confirmation => {
            // Success!
            console.log('\n' + '='.repeat(50));
            console.log('🎉 ORDER COMPLETED SUCCESSFULLY');
            console.log('='.repeat(50));
            console.log('Order Details:');
            console.log(JSON.stringify(confirmation, null, 2));
            console.log('='.repeat(50) + '\n');
            return confirmation;
        })
        .catch(error => {
            console.error('\n' + '='.repeat(50));
            console.error('❌ ORDER FAILED');
            console.error('='.repeat(50));
            console.error('Error:', error.message);
            console.error('='.repeat(50) + '\n');
        });
}

// Execute order
processOrder(1, 1, 1);

// Demonstrate Promise advantages
setTimeout(() => {
    console.log('\n✅ PROMISE ADVANTAGES:');
    console.log('  • Flat chain structure (no nesting)');
    console.log('  • Single .catch() for all errors');
    console.log('  • Much more readable');
    console.log('  • Easier to maintain');
    console.log('  • Can use .then() chaining');
    console.log('  • Better error propagation\n');
}, 5000);
