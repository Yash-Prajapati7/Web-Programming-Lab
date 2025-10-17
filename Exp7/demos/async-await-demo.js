/**
 * E-COMMERCE WORKFLOW USING ASYNC/AWAIT
 * Demonstrates modern async/await pattern
 */

console.log('\n📦 E-Commerce Order Processing - ASYNC/AWAIT Pattern\n');

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

// 1. Fetch product list
async function fetchProducts() {
    console.log('⏳ Fetching products from database...');
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('✅ Products fetched successfully');
            resolve(products);
        }, 1000);
    });
}

// 2. Validate product availability
async function checkInventory(productId, quantity) {
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

// 3. Process payment
async function processPayment(userId, amount) {
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

// 4. Update inventory
async function updateInventory(productId, quantity) {
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

// 5. Generate order confirmation
async function generateConfirmation(orderId, product, transaction) {
    console.log('⏳ Generating order confirmation...');
    return new Promise((resolve) => {
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

// Main order processing function - ASYNC/AWAIT (Cleanest!)
async function processOrder(userId, productId, quantity) {
    console.log('\n🛒 Starting order processing...\n');
    
    try {
        // Sequential async operations - looks synchronous!
        await fetchProducts();
        const product = await checkInventory(productId, quantity);
        const transaction = await processPayment(userId, product.price * quantity);
        await updateInventory(productId, quantity);
        const confirmation = await generateConfirmation(Date.now(), product, transaction);
        
        // Success!
        console.log('\n' + '='.repeat(50));
        console.log('🎉 ORDER COMPLETED SUCCESSFULLY');
        console.log('='.repeat(50));
        console.log('Order Details:');
        console.log(JSON.stringify(confirmation, null, 2));
        console.log('='.repeat(50) + '\n');
        
        return confirmation;
    } catch (error) {
        console.error('\n' + '='.repeat(50));
        console.error('❌ ORDER FAILED');
        console.error('='.repeat(50));
        console.error('Error:', error.message);
        console.error('='.repeat(50) + '\n');
        throw error;
    }
}

// Demonstrate parallel operations with Promise.all
async function processMultipleOrders() {
    console.log('\n📦 Processing multiple orders in parallel...\n');
    
    try {
        const orders = await Promise.all([
            processOrder(1, 2, 1),  // Order 1: Mouse
            // Add more orders if needed
        ]);
        
        console.log(`\n✅ All ${orders.length} order(s) processed successfully!\n`);
    } catch (error) {
        console.error('❌ One or more orders failed:', error.message);
    }
}

// Execute single order
processOrder(1, 1, 1);

// Demonstrate async/await advantages
setTimeout(() => {
    console.log('\n🌟 ASYNC/AWAIT ADVANTAGES:');
    console.log('  • Looks like synchronous code');
    console.log('  • Very readable and intuitive');
    console.log('  • Use standard try/catch for errors');
    console.log('  • Easy to debug');
    console.log('  • No chaining or nesting');
    console.log('  • Best practice for modern Node.js');
    console.log('  • Can use Promise.all() for parallel ops\n');
    
    console.log('💡 COMPARISON SUMMARY:');
    console.log('  Callbacks  → Nested, hard to read');
    console.log('  Promises   → Better, but still chains');
    console.log('  Async/Await → Clean, synchronous-looking\n');
}, 5000);
