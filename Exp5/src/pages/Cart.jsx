import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add some products to get started!</p>
        <button onClick={() => navigate('/products')} className="btn btn-primary">
          Shop Now
        </button>
      </div>
    );
  }

  const handleCheckout = () => {
    alert(`Checkout successful! Total: $${cartTotal.toFixed(2)}`);
    clearCart();
    navigate('/');
  };

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      <div className="cart-container">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p className="cart-item-category">{item.category}</p>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>
              </div>

              <div className="cart-item-quantity">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="quantity-btn"
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="quantity-value">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>

              <div className="cart-item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>

              <button
                onClick={() => {
                  if (confirm('Remove this item from cart?')) {
                    removeFromCart(item.id);
                  }
                }}
                className="remove-btn"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-row">
            <span>Items ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <div className="summary-row">
            <span>Tax</span>
            <span>${(cartTotal * 0.1).toFixed(2)}</span>
          </div>

          <hr />

          <div className="summary-total">
            <span>Total</span>
            <span>${(cartTotal * 1.1).toFixed(2)}</span>
          </div>

          <button onClick={handleCheckout} className="btn btn-primary checkout-btn">
            Proceed to Checkout
          </button>

          <button 
            onClick={() => {
              if (confirm('Clear all items from cart?')) {
                clearCart();
              }
            }}
            className="btn btn-danger"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
