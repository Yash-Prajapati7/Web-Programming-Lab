import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useRef, useState } from 'react';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProduct, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const quantityRef = useRef(null);
  
  const product = getProduct(id);

  if (!product) {
    return (
      <div className="not-found">
        <h2>Product not found</h2>
        <button onClick={() => navigate('/products')} className="btn btn-primary">
          Back to Products
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    const qty = parseInt(quantityRef.current.value);
    if (qty > 0 && qty <= product.stock) {
      addToCart(product, qty);
      alert(`${qty} ${product.name}(s) added to cart!`);
    } else {
      alert('Invalid quantity!');
    }
  };

  return (
    <div className="product-detail">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back
      </button>

      <div className="detail-container">
        <div className="detail-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="detail-info">
          <span className="detail-category">{product.category}</span>
          <h1>{product.name}</h1>
          <div className="detail-price">${product.price}</div>
          <p className="detail-description">{product.description}</p>

          <div className="detail-specs">
            <h3>Product Details</h3>
            <div className="specs-grid">
              <div className="spec-item">
                <span className="spec-label">Product ID:</span>
                <span className="spec-value">#{product.id}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Category:</span>
                <span className="spec-value">{product.category}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Stock:</span>
                <span className="spec-value">{product.stock} units</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Price:</span>
                <span className="spec-value">${product.price}</span>
              </div>
            </div>
          </div>

          {product.stock > 0 ? (
            <div className="quantity-section">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                ref={quantityRef}
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="quantity-input"
              />
              <button onClick={handleAddToCart} className="btn btn-primary">
                Add to Cart
              </button>
            </div>
          ) : (
            <div className="out-of-stock-badge">Out of Stock</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
