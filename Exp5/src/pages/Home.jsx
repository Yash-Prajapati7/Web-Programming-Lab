import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to E-Shop</h1>
          <p>Discover amazing products at unbeatable prices</p>
          <div className="hero-buttons">
            <Link to="/products" className="btn btn-primary">
              Shop Now
            </Link>
            <Link to="/add-product" className="btn btn-secondary">
              Add Product
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Fast Shipping</h3>
            <p>Get your products delivered quickly and safely</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💯</div>
            <h3>Quality Products</h3>
            <p>We offer only the best quality products</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Payment</h3>
            <p>Your transactions are safe and secure</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Easy Returns</h3>
            <p>30-day return policy on all products</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
