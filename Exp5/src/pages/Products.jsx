import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Products.css';

function Products() {
  const { products, addToCart } = useCart();
  const [filter, setFilter] = useState('all');

  const categories = ['all', ...new Set(products.map(p => p.category))];
  
  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter);

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="products-page">
      <h1>Our Products</h1>
      
      <div className="filter-section">
        <label>Filter by Category: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          <p>No products found. <Link to="/add-product">Add a product</Link></p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-footer">
                  <span className="product-price">${product.price}</span>
                  <span className="product-stock">Stock: {product.stock}</span>
                </div>
                <div className="product-actions">
                  <Link to={`/product/${product.id}`} className="btn btn-secondary">
                    View Details
                  </Link>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="btn btn-primary"
                    disabled={product.stock === 0}
                  >
                    {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
