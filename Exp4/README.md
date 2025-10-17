# Experiment 4 - E-Commerce Application with React (JSX, Components, Props)

## Aim
Create an e-commerce application to demonstrate JSX, Components, and Props in React, showcasing fundamental React concepts through a product listing and detail view interface.

## Method
1. **React Setup**: Used React via CDN (React 18 + Babel standalone) for easy setup without build tools
2. **Component Architecture**: Created multiple reusable components
3. **JSX Implementation**: Used JSX syntax for declarative UI rendering
4. **Props Passing**: Demonstrated prop passing between parent and child components
5. **State Management**: Used React hooks (useState) for managing application state
6. **Data Flow**: Implemented unidirectional data flow from parent to child components

## Component Structure

### Main Components

#### 1. **App Component** (Parent)
- Root component managing global state
- Handles product filtering and sorting logic
- Passes data and callbacks to child components
- **State**: 
  - `products`: Original product list
  - `filteredProducts`: Filtered/sorted product list
  - `selectedCategory`: Current filter category
  - `selectedProduct`: Product selected for detail view

#### 2. **ProductList Component**
- **Props**: `products`, `onViewDetails`
- Renders grid of product cards
- Maps over products array to generate ProductCard components
- Handles empty state when no products match filters

#### 3. **ProductCard Component**
- **Props**: `product`, `onViewDetails`
- Displays individual product information
- Shows image, name, category, price, rating, stock status
- Triggers detail view on button click

#### 4. **ProductDetailModal Component**
- **Props**: `product`, `onClose`
- Modal overlay showing detailed product information
- Closes on outside click or close button
- Prevents propagation on modal content click

#### 5. **FilterSection Component**
- **Props**: `categories`, `selectedCategory`, `onCategoryChange`, `onSortChange`
- Provides category filtering dropdown
- Provides sorting options
- Triggers callbacks on selection changes

#### 6. **Stats Component**
- **Props**: `products`
- Calculates and displays statistics
- Shows total products, in-stock count, average price, average rating

## Key React Concepts Demonstrated

### JSX Features
```jsx
// Embedding expressions
<span className="product-price">${product.price}</span>

// Conditional rendering
{!product.inStock && <span className="product-badge">Out of Stock</span>}

// List rendering with keys
{products.map(product => (
    <ProductCard key={product.id} product={product} />
))}

// Event handling
<button onClick={() => onViewDetails(product)}>View Details</button>
```

### Component Props
- **Data Props**: Passing objects, arrays, primitives
- **Function Props**: Passing callbacks for event handling
- **Prop Destructuring**: Clean access to props
- **Default Props**: Handling undefined/null props

### Component Composition
- Nesting components within components
- Reusable component pattern
- Separation of concerns (display vs logic)

## Features Implemented

### Product Catalog
- ✅ Display product grid with images
- ✅ Show product details (name, price, description, rating, stock)
- ✅ Visual indicators for stock status
- ✅ Category badges

### Filtering & Sorting
- 🔍 Filter by category
- 📊 Sort by price (low to high, high to low)
- ⭐ Sort by rating
- 🔤 Sort by name

### Product Details
- 🔍 Modal view with full product information
- 🖼️ Large product image
- 📋 Detailed specifications
- ❌ Close modal functionality

### Statistics
- 📈 Total products count
- ✅ In-stock products count
- 💰 Average price calculation
- ⭐ Average rating

## Technologies Used
- **React 18**: JavaScript library for building UI
- **Babel Standalone**: For JSX transformation in browser
- **HTML5**: Structure
- **CSS3**: Styling with modern features
- **JavaScript ES6+**: Arrow functions, destructuring, spread operator

## How to Run
1. Open `index.html` in a modern web browser
2. The React app will load automatically
3. Interact with filters, sort options, and product cards
4. Click "View Details" to see product modal

## React Hooks Used
- `React.useState()`: Managing component state
- Functional components throughout (no class components)

## Props Flow Diagram
```
App (Root)
├── FilterSection (categories, selectedCategory, callbacks)
├── ProductList (filteredProducts, onViewDetails)
│   └── ProductCard (product, onViewDetails) [multiple instances]
├── Stats (products)
└── ProductDetailModal (selectedProduct, onClose)
```

## Observations
- **JSX Simplicity**: JSX makes component templates readable and maintainable
- **Component Reusability**: ProductCard component reused for each product
- **Unidirectional Data Flow**: Props flow from parent to child, making data flow predictable
- **State Management**: Centralized state in App component simplifies state management
- **Event Handling**: Callback props enable child-to-parent communication
- **Declarative UI**: React's declarative nature makes UI updates automatic on state changes

## Advantages of React Approach
1. **Component Reusability**: Same ProductCard used for all products
2. **Maintainability**: Each component has a single responsibility
3. **Scalability**: Easy to add new features or components
4. **Performance**: React's virtual DOM efficiently updates only changed elements
5. **Developer Experience**: JSX syntax is intuitive and easy to read

## Conclusion
This e-commerce demo successfully demonstrates React's fundamental concepts:
- **JSX** for declarative UI rendering
- **Components** for modular, reusable code
- **Props** for data flow and component communication

The component-based architecture promotes code reusability, maintainability, and scalability. React's props system enables clean parent-child communication, while JSX provides an intuitive syntax for building complex UIs. This foundation prepares for more advanced React patterns including state management, routing, and side effects.
