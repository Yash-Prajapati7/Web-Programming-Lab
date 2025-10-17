import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './AddProduct.css';

function AddProduct() {
  const navigate = useNavigate();
  const { addProduct } = useCart();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image: '',
    stock: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required';
    } else if (!formData.image.match(/^https?:\/\/.+/)) {
      newErrors.image = 'Please enter a valid URL';
    }

    if (!formData.stock || parseInt(formData.stock) < 0) {
      newErrors.stock = 'Stock must be 0 or greater';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const newProduct = {
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        description: formData.description,
        image: formData.image,
        stock: parseInt(formData.stock)
      };

      addProduct(newProduct);
      alert('Product added successfully!');
      navigate('/products');
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      category: '',
      price: '',
      description: '',
      image: '',
      stock: ''
    });
    setErrors({});
  };

  return (
    <div className="add-product-page">
      <h1>Add New Product</h1>
      
      <div className="form-container">
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name">Product Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-control ${errors.name ? 'error' : ''}`}
              placeholder="Enter product name"
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`form-control ${errors.category ? 'error' : ''}`}
              placeholder="e.g., Electronics, Fashion, Accessories"
            />
            {errors.category && <span className="form-error">{errors.category}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price ($) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={`form-control ${errors.price ? 'error' : ''}`}
                placeholder="0.00"
                step="0.01"
                min="0"
              />
              {errors.price && <span className="form-error">{errors.price}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="stock">Stock Quantity *</label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className={`form-control ${errors.stock ? 'error' : ''}`}
                placeholder="0"
                min="0"
              />
              {errors.stock && <span className="form-error">{errors.stock}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="image">Image URL *</label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className={`form-control ${errors.image ? 'error' : ''}`}
              placeholder="https://example.com/image.jpg"
            />
            {errors.image && <span className="form-error">{errors.image}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`form-control ${errors.description ? 'error' : ''}`}
              placeholder="Enter product description"
              rows="4"
            />
            {errors.description && <span className="form-error">{errors.description}</span>}
          </div>

          {formData.image && (
            <div className="image-preview">
              <label>Image Preview:</label>
              <img src={formData.image} alt="Preview" onError={(e) => e.target.style.display = 'none'} />
            </div>
          )}

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Add Product</button>
            <button type="button" onClick={handleReset} className="btn btn-secondary">Reset</button>
            <button type="button" onClick={() => navigate('/products')} className="btn btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
