import React from 'react';
import ProductCard from './ProductCard';
import '../styles/ProductGrid.css';

export default function ProductGrid({ products, onAddToCart, onProductClick }) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <p>No products found in this category.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onProductClick={onProductClick}
        />
      ))}
    </div>
  );
}
