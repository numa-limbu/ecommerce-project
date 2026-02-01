import React from 'react';
import ProductCard from './ProductCard';
import '../styles/FeaturedProducts.css';

export default function FeaturedProducts({ products, onAddToCart }) {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="featured-products">
      <div className="section-header">
        <h2>Featured Products</h2>
        <p>Check out our hand-picked selection of popular items</p>
      </div>

      <div className="featured-grid">
        {featuredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}
