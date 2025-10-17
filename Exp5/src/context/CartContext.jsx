import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : [
      {
        id: 1,
        name: "Premium Wireless Headphones",
        category: "Electronics",
        price: 299.99,
        description: "High-quality wireless headphones with active noise cancellation",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        stock: 15
      },
      {
        id: 2,
        name: "Smart Watch Pro",
        category: "Electronics",
        price: 399.99,
        description: "Advanced smartwatch with health tracking and GPS",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
        stock: 8
      },
      {
        id: 3,
        name: "Laptop Stand",
        category: "Accessories",
        price: 49.99,
        description: "Ergonomic aluminum laptop stand",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
        stock: 25
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now()
    };
    setProducts(prev => [...prev, newProduct]);
    return newProduct;
  };

  const getProduct = (id) => {
    return products.find(p => p.id === parseInt(id));
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        products,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addProduct,
        getProduct,
        cartTotal,
        cartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
