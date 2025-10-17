# Experiment 7 - Node.js Asynchronous E-Commerce Workflow

## Aim
Create a Node.js application that simulates a basic e-commerce system to demonstrate the use of callbacks, asynchronous operations, promises, and async/await for handling product listing, order processing, and confirmation workflows.

## Prerequisites
- Node.js installed (v14 or higher)
- Understanding of JavaScript basics
- Familiarity with asynchronous programming concepts

## Setup Instructions

### Installation
```powershell
# Navigate to the Exp7 folder
cd Exp7

# No npm install needed - pure Node.js

# Run all demos
npm start

# Or run individual demos:
npm run callbacks     # Callback-based implementation
npm run promises      # Promise-based implementation
npm run async-await   # Async/Await implementation
```

## Project Structure
```
Exp7/
├── index.js                    # Main entry point
├── package.json                # NPM configuration
├── demos/
│   ├── callbacks-demo.js       # Callback pattern
│   ├── promises-demo.js        # Promise pattern
│   └── async-await-demo.js     # Async/Await pattern
└── README.md                   # Documentation
```

## E-Commerce Workflow Steps

Each implementation demonstrates the same workflow:

1. **Fetch Products** - Retrieve product list from database
2. **Check Inventory** - Validate product availability and stock
3. **Process Payment** - Charge customer and validate funds
4. **Update Inventory** - Reduce stock after successful payment
5. **Generate Confirmation** - Create order confirmation

## Implementation Patterns

### 1. Callbacks Pattern

#### Characteristics
- Traditional Node.js pattern
- Uses callback functions for async operations
- Results in "callback hell" or "pyramid of doom"

#### Example
```javascript
function processOrder(userId, productId, quantity) {
    fetchProducts((err, products) => {
        if (err) return handleError(err);
        
        checkInventory(productId, quantity, (err, product) => {
            if (err) return handleError(err);
            
            processPayment(userId, price, (err, transaction) => {
                if (err) return handleError(err);
                
                // More nesting...
            });
        });
    });
}
```

#### Advantages
- ✅ Simple to understand initially
- ✅ No special syntax required
- ✅ Compatible with older Node.js versions

#### Disadvantages
- ❌ Deep nesting (callback hell)
- ❌ Difficult to read and maintain
- ❌ Repetitive error handling
- ❌ Hard to debug
- ❌ Cannot use try/catch

### 2. Promises Pattern

#### Characteristics
- ES6 feature
- Returns Promise objects
- Uses `.then()` and `.catch()` chaining
- Flattens callback pyramid

#### Example
```javascript
function processOrder(userId, productId, quantity) {
    return fetchProducts()
        .then(() => checkInventory(productId, quantity))
        .then(product => processPayment(userId, product.price))
        .then(transaction => updateInventory(productId, quantity))
        .then(() => generateConfirmation())
        .catch(error => handleError(error));
}
```

#### Advantages
- ✅ Flat chain structure
- ✅ Single `.catch()` for all errors
- ✅ Much more readable than callbacks
- ✅ Easier to maintain
- ✅ Better error propagation
- ✅ Composable with `Promise.all()`, `Promise.race()`

#### Disadvantages
- ❌ Still involves chaining
- ❌ Can be verbose for complex flows
- ❌ Requires understanding of Promise API

### 3. Async/Await Pattern (Recommended)

#### Characteristics
- ES2017 feature
- Built on top of Promises
- Synchronous-looking code
- Uses `async` and `await` keywords

#### Example
```javascript
async function processOrder(userId, productId, quantity) {
    try {
        await fetchProducts();
        const product = await checkInventory(productId, quantity);
        const transaction = await processPayment(userId, product.price);
        await updateInventory(productId, quantity);
        const confirmation = await generateConfirmation();
        return confirmation;
    } catch (error) {
        handleError(error);
    }
}
```

#### Advantages
- ✅ Looks like synchronous code
- ✅ Very readable and intuitive
- ✅ Use standard try/catch for errors
- ✅ Easy to debug
- ✅ No chaining or nesting
- ✅ Best practice for modern Node.js
- ✅ Works with Promise.all() for parallel operations

#### Disadvantages
- ❌ Requires understanding of async/await
- ❌ Must use promises under the hood

## Comparison Table

| Feature | Callbacks | Promises | Async/Await |
|---------|-----------|----------|-------------|
| **Readability** | ❌ Poor | ✅ Good | ✅ Excellent |
| **Error Handling** | ❌ Repetitive | ✅ Single catch | ✅ Try/catch |
| **Nesting** | ❌ Deep | ✅ Flat | ✅ None |
| **Debugging** | ❌ Difficult | ✅ Moderate | ✅ Easy |
| **Maintenance** | ❌ Hard | ✅ Moderate | ✅ Easy |
| **Modern** | ❌ Legacy | ✅ Standard | ✅ Best Practice |
| **Browser Support** | ✅ All | ✅ Modern | ✅ Modern |

## Key Concepts Demonstrated

### 1. Asynchronous Operations
All operations simulate I/O tasks (database queries, API calls) using `setTimeout()`:
```javascript
setTimeout(() => {
    // Simulate async operation
    callback(null, result);
}, 1000);
```

### 2. Error Handling

**Callbacks:**
```javascript
callback(error, null);  // Pass error as first argument
```

**Promises:**
```javascript
reject(new Error('Something went wrong'));
```

**Async/Await:**
```javascript
throw new Error('Something went wrong');
```

### 3. Sequential vs Parallel Execution

**Sequential (Async/Await):**
```javascript
const result1 = await operation1();
const result2 = await operation2();  // Waits for operation1
```

**Parallel (Promise.all):**
```javascript
const [result1, result2] = await Promise.all([
    operation1(),
    operation2()  // Runs in parallel
]);
```

## Output Examples

### Success Case
```
🛒 Starting order processing...
⏳ Fetching products from database...
✅ Products fetched successfully
⏳ Checking inventory for product ID: 1...
✅ Inventory check passed
⏳ Processing payment of $999...
✅ Payment processed. Remaining balance: $1001
⏳ Updating inventory for product ID: 1...
✅ Inventory updated. New stock: 4
⏳ Generating order confirmation...
✅ Order confirmation generated

🎉 ORDER COMPLETED SUCCESSFULLY
{
  "orderId": 1697534567890,
  "productName": "Laptop",
  "price": 999,
  "transactionId": 1697534567890,
  "timestamp": "2024-10-17T10:30:00.000Z"
}
```

### Failure Case (Insufficient Stock)
```
❌ ORDER FAILED
Error: Insufficient stock. Available: 0
```

## Running the Demos

### All Demos
```powershell
npm start
```
Runs all three demos sequentially with explanations.

### Individual Demos
```powershell
# Callbacks
npm run callbacks

# Promises
npm run promises

# Async/Await
npm run async-await
```

## Learning Outcomes

After completing this experiment, you should understand:

1. **Callbacks**: Traditional async pattern, callback hell problem
2. **Promises**: Modern async pattern, promise chaining
3. **Async/Await**: Cleanest async pattern, synchronous-looking code
4. **Error Handling**: Different approaches in each pattern
5. **Code Readability**: How async patterns affect maintainability
6. **Sequential Operations**: Executing async tasks in order
7. **Parallel Operations**: Using Promise.all() for concurrency

## Best Practices

### 1. Use Async/Await for New Code
```javascript
// ✅ Good
async function doSomething() {
    const result = await asyncOperation();
    return result;
}

// ❌ Avoid
function doSomething() {
    return asyncOperation().then(result => result);
}
```

### 2. Always Handle Errors
```javascript
async function safeFetch() {
    try {
        const data = await fetch();
        return data;
    } catch (error) {
        console.error('Fetch failed:', error);
        throw error;  // Re-throw if needed
    }
}
```

### 3. Use Promise.all() for Parallel Operations
```javascript
// ✅ Parallel (faster)
const [users, products] = await Promise.all([
    fetchUsers(),
    fetchProducts()
]);

// ❌ Sequential (slower)
const users = await fetchUsers();
const products = await fetchProducts();
```

## Common Pitfalls

### 1. Forgetting `await`
```javascript
// ❌ Wrong - returns Promise, not result
const data = asyncOperation();

// ✅ Correct
const data = await asyncOperation();
```

### 2. Unhandled Promise Rejections
```javascript
// ❌ Wrong - error not caught
async function bad() {
    await mightFail();
}

// ✅ Correct
async function good() {
    try {
        await mightFail();
    } catch (error) {
        handleError(error);
    }
}
```

### 3. Mixing Patterns
```javascript
// ❌ Don't mix
async function mixed() {
    return asyncOp().then(result => result);
}

// ✅ Stick to one
async function clean() {
    const result = await asyncOp();
    return result;
}
```

## Conclusion

This experiment successfully demonstrates three async programming patterns in Node.js:

1. **Callbacks**: Shows the traditional approach and its limitations (callback hell)
2. **Promises**: Demonstrates how Promises improve upon callbacks with cleaner syntax
3. **Async/Await**: Showcases the modern, recommended approach that makes async code look synchronous

**Key Takeaway**: Moving from callbacks → promises → async/await dramatically improves code clarity and maintainability. Async/await is the recommended pattern for modern Node.js development due to its readability, error handling, and debugging advantages.

## Next Steps
- Explore Promise.all() for concurrent operations
- Learn about Promise.race() and Promise.allSettled()
- Study async iterators and generators
- Implement real database operations
- Add transaction handling
- Implement retry logic
- Add logging and monitoring
