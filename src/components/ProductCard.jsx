import React, { useContext } from 'react';
import RatingDisplay from './RatingDisplay';
import { AuthContext } from '../context/AuthContext';
import '../styles/ProductCard.css';

export default function ProductCard({ product, onAddToCart, onProductClick }) {
  const { user, updateUserWishlist } = useContext(AuthContext)
  const isWishlisted = user?.wishlist?.includes(product.id)

  return (
    <div 
      className="product-card"
      onClick={() => onProductClick && onProductClick(product.id)}
    >
      <div className="product-image">
        <span className="product-icon">{product.image}</span>
        {product.featured && <span className="featured-badge">⭐ Featured</span>}
        {user && (
          <button
            className={`wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              updateUserWishlist(product.id);
            }}
            title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {isWishlisted ? '❤️' : '🤍'}
          </button>
        )}
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
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
