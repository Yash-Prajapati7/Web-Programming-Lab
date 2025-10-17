import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🛒 E-Shop
        </Link>
        <ul className="navbar-menu">
          <li>
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li>
            <Link to="/products" className="navbar-link">Products</Link>
          </li>
          <li>
            <Link to="/add-product" className="navbar-link">Add Product</Link>
          </li>
          <li>
            <Link to="/cart" className="navbar-link cart-link">
              Cart
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
