import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RatingDisplay from '../components/RatingDisplay';
import ProductImageGallery from '../components/ProductImageGallery';
import ProductQuantitySelector from '../components/ProductQuantitySelector';
import { products } from '../data/products';
import '../styles/ProductDetailPage.css';

export default function ProductDetailPage({ productId, onNavigate }) {
  const product = products.find((p) => p.id === parseInt(productId));
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="app">
        <Header onNavigate={onNavigate} />
        <main className="main-content">
          <div className="container">
            <div className="product-not-found">
              <h2>😕 Product Not Found</h2>
              <p>Sorry, the product you're looking for doesn't exist.</p>
              <button
                className="back-btn"
                onClick={() => {
                  onNavigate('products');
                  window.scrollTo(0, 0);
                }}
              >
                ← Back to Products
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
    alert(`${quantity}x ${product.name} added to cart!`);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="app">
      <Header onNavigate={onNavigate} />

      <main className="main-content">
        <div className="container">
          {/* Breadcrumb Navigation */}
          <div className="breadcrumb">
            <a href="#products" onClick={() => {
              onNavigate('products');
              window.scrollTo(0, 0);
            }}>
              All Products
            </a>
            <span> / </span>
            <a href={`#category/${product.category}`}>{product.category}</a>
            <span> / </span>
            <span className="current">{product.name}</span>
          </div>

          {/* Product Detail Section */}
          <div className="product-detail">
            {/* Left: Image Gallery */}
            <div className="product-gallery-section">
              <ProductImageGallery images={product.images} />
            </div>

            {/* Right: Product Information */}
            <div className="product-info-section">
              {/* Category & Status */}
              <div className="product-meta">
                <span className="category-tag">{product.category}</span>
                {product.inStock ? (
                  <span className="stock-badge in-stock">✓ In Stock</span>
                ) : (
                  <span className="stock-badge out-of-stock">Out of Stock</span>
                )}
              </div>

              {/* Product Title */}
              <h1 className="product-title">{product.name}</h1>

              {/* Rating */}
              <div className="rating-section">
                <RatingDisplay rating={product.rating} reviews={product.reviews} />
              </div>

              {/* Price */}
              <div className="price-section">
                <span className="price">${product.price.toFixed(2)}</span>
                <span className="original-price">${(product.price * 1.2).toFixed(2)}</span>
              </div>

              {/* Description */}
              <p className="product-description">{product.fullDescription}</p>

              {/* Quantity Selector */}
              <ProductQuantitySelector onQuantityChange={setQuantity} />

              {/* Add to Cart Button */}
              <button
                className={`add-to-cart-btn ${addedToCart ? 'added' : ''}`}
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {addedToCart ? '✓ Added to Cart!' : '🛒 Add to Cart'}
              </button>

              {/* Additional Info */}
              <div className="product-features">
                <div className="feature">
                  <span className="feature-icon">🚚</span>
                  <div>
                    <strong>Free Shipping</strong>
                    <p>On orders over $50</p>
                  </div>
                </div>
                <div className="feature">
                  <span className="feature-icon">↩️</span>
                  <div>
                    <strong>Easy Returns</strong>
                    <p>30-day return policy</p>
                  </div>
                </div>
                <div className="feature">
                  <span className="feature-icon">🛡️</span>
                  <div>
                    <strong>Safe Payment</strong>
                    <p>Secure checkout</p>
                  </div>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="share-section">
                <p>Share this product:</p>
                <div className="share-buttons">
                  <button className="share-btn">📘 Facebook</button>
                  <button className="share-btn">𝕏 Twitter</button>
                  <button className="share-btn">📧 Email</button>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications Section */}
          <div className="specifications-section">
            <h2>Product Specifications</h2>
            <div className="specs-grid">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="spec-item">
                  <span className="spec-label">{key}</span>
                  <span className="spec-value">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="reviews-section">
            <h2>Customer Reviews</h2>
            <div className="review-summary">
              <div className="rating-large">
                <span className="rating-number">{product.rating}</span>
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="star">
                      {i < Math.round(product.rating) ? '⭐' : '☆'}
                    </span>
                  ))}
                </div>
                <p>{product.reviews} verified reviews</p>
              </div>
            </div>

            {/* Sample Reviews */}
            <div className="reviews-list">
              {[1, 2, 3].map((i) => (
                <div key={i} className="review-item">
                  <div className="review-header">
                    <span className="reviewer-name">Customer {i}</span>
                    <div className="review-stars">
                      {[...Array(5)].map((_, j) => (
                        <span key={j}>
                          {j < 4 + (i % 1) ? '⭐' : '☆'}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="review-text">
                    {i === 1
                      ? 'Great product! Exactly as described and arrived quickly.'
                      : i === 2
                      ? 'Very satisfied with this purchase. Good quality and great value.'
                      : 'Highly recommend! Perfect for my needs.'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="related-products">
              <h2>Related Products</h2>
              <div className="related-grid">
                {relatedProducts.map((p) => (
                  <div
                    key={p.id}
                    className="related-product-card"
                    onClick={() => {
                      onNavigate(`product/${p.id}`);
                      window.scrollTo(0, 0);
                    }}
                  >
                    <span className="product-icon">{p.image}</span>
                    <h3>{p.name}</h3>
                    <p className="price">${p.price.toFixed(2)}</p>
                    <RatingDisplay rating={p.rating} reviews={p.reviews} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
