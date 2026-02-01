import React from 'react';
import RatingDisplay from './RatingDisplay';
import '../styles/ProductCard.css';

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <div className="product-image">
        <span className="product-icon">{product.image}</span>
        {product.featured && <span className="featured-badge">⭐ Featured</span>}
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        
        {product.rating && (
          <RatingDisplay rating={product.rating} reviews={product.reviews} />
        )}

        <p className="product-description">{product.description}</p>

        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button
            className="add-to-cart-btn"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
