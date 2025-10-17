# Experiment 5 - Full React E-Commerce Application

## Aim
Develop an e-commerce application using React that includes features to Add Product, View Product, and Add to Cart, demonstrating the use of Forms, Events, Routers, Refs, Conditional Rendering, State management, and Keys.

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```powershell
# Navigate to the Exp5 folder
cd Exp5

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Method
1. **Project Setup**: Used Vite as build tool for fast development
2. **React Router**: Implemented client-side routing with React Router v6
3. **State Management**: Created Context API for global cart state
4. **Component Architecture**: Built reusable, modular components
5. **Form Handling**: Implemented controlled forms with validation
6. **Local Storage**: Persisted cart and products data
7. **Refs**: Used useRef for direct DOM access in quantity input
8. **Event Handling**: Comprehensive event handling throughout the app

## React Concepts Demonstrated

### 1. **React Router (Routing)**
- `BrowserRouter`: Provides routing context
- `Routes` & `Route`: Define application routes
- `Link`: Navigation between pages
- `useNavigate`: Programmatic navigation
- `useParams`: Extract URL parameters

**Routes Implemented:**
- `/` - Home page
- `/products` - Product listing
- `/product/:id` - Product detail page
- `/add-product` - Add new product form
- `/cart` - Shopping cart

### 2. **State Management (Context API)**
- Created `CartContext` for global state
- `useCart` custom hook for accessing cart state
- Manages:
  - Cart items
  - Products list
  - Cart operations (add, remove, update)
  - Total calculations

### 3. **Forms & Validation**
- Controlled form components
- Real-time validation
- Error messaging
- Form submission handling
- Reset functionality
- Validation rules for:
  - Required fields
  - Price validation (must be > 0)
  - Stock validation (>= 0)
  - URL validation for images

### 4. **Events**
- Form submission (`onSubmit`)
- Input changes (`onChange`)
- Button clicks (`onClick`)
- Navigation events
- Conditional event handlers

### 5. **Refs (useRef)**
- Direct DOM access for quantity input
- Reading input values without re-renders
- Focus management

### 6. **Conditional Rendering**
- Empty state displays
- Stock availability checks
- Cart item count badge
- Product availability buttons
- Loading states
- Error messages
- Modal displays

### 7. **Keys**
- Unique keys in product lists
- Cart item keys for efficient re-rendering
- Category filter option keys

## Component Structure

### Pages
1. **Home** - Landing page with features
2. **Products** - Product grid with filtering
3. **ProductDetail** - Detailed product view
4. **AddProduct** - Form to add new products
5. **Cart** - Shopping cart with checkout

### Components
1. **Navbar** - Navigation with cart badge
2. **CartContext** - Global state management

## Features Implemented

### Product Management
- ✅ View all products
- ✅ Filter products by category
- ✅ Add new products with validation
- ✅ View product details
- 🔑 Dynamic routing with product ID

### Shopping Cart
- ✅ Add products to cart
- ✅ Update quantities
- ✅ Remove items
- ✅ Clear cart
- ✅ Calculate totals
- 💾 Persist cart in localStorage

### Form Validation
- ✅ Required field validation
- ✅ Price validation
- ✅ Stock validation
- ✅ URL validation
- ✅ Real-time error feedback

### User Experience
- 🎨 Responsive design
- 🔔 Alert notifications
- ✅ Confirmation dialogs
- 🏷️ Cart badge with item count
- 📱 Mobile-friendly

## Technologies Used
- **React 18**: Core library
- **React Router DOM v6**: Client-side routing
- **Vite**: Build tool and dev server
- **Context API**: State management
- **CSS3**: Styling
- **LocalStorage**: Data persistence

## Key React Hooks Used
- `useState` - Component state
- `useContext` - Access context
- `useEffect` - Side effects & persistence
- `useNavigate` - Programmatic navigation
- `useParams` - URL parameters
- `useRef` - DOM references

## State Flow
```
CartContext (Global State)
├── Products Array
├── Cart Array
├── Add/Remove/Update Functions
└── Calculations (total, count)

Components consume via useCart() hook
```

## Form Validation Logic
```javascript
// Real-time validation
- Required fields check
- Type validation (number, URL)
- Range validation (price > 0, stock >= 0)
- Pattern matching (URL format)
- Error state management
```

## Conditional Rendering Examples
1. **Cart Badge**: Shows only when cart has items
2. **Empty States**: Display when no products/cart items
3. **Stock Status**: Different button states based on availability
4. **Form Errors**: Show only when validation fails
5. **Product Detail**: 404 page if product not found

## LocalStorage Persistence
- Cart items saved on every update
- Products list persisted
- Data loaded on app initialization
- Survives page refreshes

## Observations
- **Router Integration**: React Router provides seamless navigation
- **Context API**: Excellent for medium-complexity state management
- **Form Handling**: Controlled components give full control over form state
- **Refs Usage**: Useful for accessing DOM directly without triggering re-renders
- **Conditional Rendering**: Makes UI dynamic and responsive to state changes
- **Keys**: Essential for React's reconciliation and list performance
- **State Persistence**: LocalStorage integration maintains state across sessions

## Advantages
1. **Modular Code**: Separation of concerns with pages and components
2. **Reusable Logic**: Custom hooks encapsulate business logic
3. **Type Safety**: Prop destructuring and validation
4. **Performance**: Efficient re-renders with proper key usage
5. **User Experience**: Smooth navigation without page reloads
6. **Maintainability**: Clear file structure and component hierarchy

## Possible Enhancements
- Product search functionality
- Advanced filters (price range, rating)
- User authentication
- Order history
- Payment integration
- Product reviews and ratings
- Wishlist feature
- Product image upload
- Admin dashboard
- API integration

## Conclusion
This full-featured React e-commerce application successfully demonstrates advanced React concepts including routing, global state management with Context API, form handling with validation, refs for DOM access, conditional rendering, and proper use of keys for list rendering. The application showcases production-ready patterns like data persistence, user feedback, and responsive design. The implementation provides a solid foundation for building complex, real-world React applications with proper state management, routing, and user interaction handling.
