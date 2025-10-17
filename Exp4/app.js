// Product data
const productsData = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        category: "Electronics",
        price: 299.99,
        description: "High-quality wireless headphones with active noise cancellation and 30-hour battery life.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
        rating: 4.5,
        stock: 15,
        inStock: true
    },
    {
        id: 2,
        name: "Smart Watch Pro",
        category: "Electronics",
        price: 399.99,
        description: "Advanced smartwatch with health tracking, GPS, and 7-day battery life.",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
        rating: 4.8,
        stock: 8,
        inStock: true
    },
    {
        id: 3,
        name: "Designer Backpack",
        category: "Fashion",
        price: 89.99,
        description: "Stylish and durable backpack perfect for daily use and travel.",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
        rating: 4.3,
        stock: 0,
        inStock: false
    },
    {
        id: 4,
        name: "Laptop Stand",
        category: "Accessories",
        price: 49.99,
        description: "Ergonomic aluminum laptop stand for better posture and cooling.",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
        rating: 4.6,
        stock: 25,
        inStock: true
    },
    {
        id: 5,
        name: "Mechanical Keyboard",
        category: "Electronics",
        price: 129.99,
        description: "RGB mechanical keyboard with customizable keys and smooth typing experience.",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop",
        rating: 4.7,
        stock: 12,
        inStock: true
    },
    {
        id: 6,
        name: "Running Shoes",
        category: "Fashion",
        price: 119.99,
        description: "Comfortable running shoes with excellent cushioning and support.",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
        rating: 4.4,
        stock: 20,
        inStock: true
    }
];

// ProductCard Component
function ProductCard({ product, onViewDetails }) {
    return (
        <div className="product-card">
            <div style={{ position: 'relative' }}>
                <img src={product.image} alt={product.name} className="product-image" />
                {!product.inStock && <span className="product-badge">Out of Stock</span>}
            </div>
            <div className="product-info">
                <div className="product-category">{product.category}</div>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-footer">
                    <span className="product-price">${product.price}</span>
                    <div className="product-rating">
                        <span>⭐</span>
                        <span>{product.rating}</span>
                    </div>
                </div>
                <div className="product-stock">
                    <span className={product.inStock ? 'in-stock' : 'out-of-stock'}>
                        {product.inStock ? `${product.stock} in stock` : 'Out of stock'}
                    </span>
                </div>
                <button 
                    className="view-details-btn"
                    onClick={() => onViewDetails(product)}
                    disabled={!product.inStock}
                >
                    {product.inStock ? 'View Details' : 'Unavailable'}
                </button>
            </div>
        </div>
    );
}

// ProductList Component
function ProductList({ products, onViewDetails }) {
    if (products.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-state-icon">📦</div>
                <h3>No Products Found</h3>
                <p>Try adjusting your filters</p>
            </div>
        );
    }

    return (
        <div className="product-grid">
            {products.map(product => (
                <ProductCard 
                    key={product.id} 
                    product={product}
                    onViewDetails={onViewDetails}
                />
            ))}
        </div>
    );
}

// ProductDetailModal Component
function ProductDetailModal({ product, onClose }) {
    if (!product) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                <img src={product.image} alt={product.name} className="modal-image" />
                <div className="modal-body">
                    <div className="product-category">{product.category}</div>
                    <h2>{product.name}</h2>
                    <div className="product-price">${product.price}</div>
                    <div className="product-rating">
                        <span>⭐</span>
                        <span>{product.rating} / 5.0</span>
                    </div>
                    <p className="product-description">{product.description}</p>
                    <div className="product-details">
                        <p><strong>Product ID:</strong> #{product.id}</p>
                        <p><strong>Category:</strong> {product.category}</p>
                        <p><strong>Availability:</strong> 
                            <span className={product.inStock ? 'in-stock' : 'out-of-stock'}>
                                {product.inStock ? ` ${product.stock} units available` : ' Out of stock'}
                            </span>
                        </p>
                        <p><strong>Rating:</strong> {product.rating} stars</p>
                    </div>
                    <button className="view-details-btn">Add to Cart</button>
                </div>
            </div>
        </div>
    );
}

// Filter Component
function FilterSection({ categories, selectedCategory, onCategoryChange, onSortChange }) {
    return (
        <div className="filter-section">
            <label>Category:</label>
            <select value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)}>
                <option value="all">All Categories</option>
                {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>

            <label>Sort by:</label>
            <select onChange={(e) => onSortChange(e.target.value)}>
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="name">Name</option>
            </select>
        </div>
    );
}

// Stats Component
function Stats({ products }) {
    const totalProducts = products.length;
    const inStockProducts = products.filter(p => p.inStock).length;
    const averagePrice = (products.reduce((sum, p) => sum + p.price, 0) / totalProducts).toFixed(2);
    const averageRating = (products.reduce((sum, p) => sum + p.rating, 0) / totalProducts).toFixed(1);

    return (
        <div className="stats-section">
            <h3>Product Statistics</h3>
            <div className="stats-grid">
                <div className="stat-item">
                    <div className="stat-value">{totalProducts}</div>
                    <div className="stat-label">Total Products</div>
                </div>
                <div className="stat-item">
                    <div className="stat-value">{inStockProducts}</div>
                    <div className="stat-label">In Stock</div>
                </div>
                <div className="stat-item">
                    <div className="stat-value">${averagePrice}</div>
                    <div className="stat-label">Avg Price</div>
                </div>
                <div className="stat-item">
                    <div className="stat-value">⭐ {averageRating}</div>
                    <div className="stat-label">Avg Rating</div>
                </div>
            </div>
        </div>
    );
}

// Main App Component
function App() {
    const [products, setProducts] = React.useState(productsData);
    const [filteredProducts, setFilteredProducts] = React.useState(productsData);
    const [selectedCategory, setSelectedCategory] = React.useState('all');
    const [selectedProduct, setSelectedProduct] = React.useState(null);

    // Get unique categories
    const categories = [...new Set(products.map(p => p.category))];

    // Filter products by category
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        if (category === 'all') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(p => p.category === category));
        }
    };

    // Sort products
    const handleSortChange = (sortType) => {
        let sorted = [...filteredProducts];
        switch (sortType) {
            case 'price-low':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                sorted.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                sorted.sort((a, b) => b.rating - a.rating);
                break;
            case 'name':
                sorted.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                sorted = selectedCategory === 'all' ? products : products.filter(p => p.category === selectedCategory);
        }
        setFilteredProducts(sorted);
    };

    return (
        <div>
            <header className="header">
                <div className="header-content">
                    <h1>🛒 E-Commerce Store</h1>
                    <p>Discover amazing products at great prices</p>
                </div>
            </header>

            <div className="container">
                <FilterSection 
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={handleCategoryChange}
                    onSortChange={handleSortChange}
                />

                <ProductList 
                    products={filteredProducts}
                    onViewDetails={setSelectedProduct}
                />

                <Stats products={products} />
            </div>

            {selectedProduct && (
                <ProductDetailModal 
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </div>
    );
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
