console.log('='.repeat(60));
console.log('E-COMMERCE ASYNC WORKFLOW DEMONSTRATION');
console.log('='.repeat(60));
console.log('\nThis project demonstrates three async patterns in Node.js:\n');
console.log('1. Callbacks (Traditional pattern)');
console.log('2. Promises (ES6 pattern)');
console.log('3. Async/Await (Modern pattern)\n');
console.log('='.repeat(60));
console.log('\nRun individual demos:');
console.log('  npm run callbacks     - Callback-based implementation');
console.log('  npm run promises      - Promise-based implementation');
console.log('  npm run async-await   - Async/Await implementation');
console.log('\n' + '='.repeat(60) + '\n');

// Run all demos sequentially
const runAllDemos = async () => {
    console.log('\n🚀 Running all demos...\n');
    
    // Import and run each demo
    console.log('\n' + '═'.repeat(60));
    console.log('DEMO 1: CALLBACKS');
    console.log('═'.repeat(60));
    require('./demos/callbacks-demo.js');
    
    // Wait before next demo
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    console.log('\n' + '═'.repeat(60));
    console.log('DEMO 2: PROMISES');
    console.log('═'.repeat(60));
    require('./demos/promises-demo.js');
    
    // Wait before next demo
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    console.log('\n' + '═'.repeat(60));
    console.log('DEMO 3: ASYNC/AWAIT');
    console.log('═'.repeat(60));
    require('./demos/async-await-demo.js');
};

// Run all demos
runAllDemos().catch(console.error);
