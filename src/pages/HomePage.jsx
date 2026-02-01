import React, { useState } from 'react';
import Header from '../components/Header';
import BannerCarousel from '../components/BannerCarousel';
import FeaturedProducts from '../components/FeaturedProducts';
import CategoryFilter from '../components/CategoryFilter';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import { categories, products, promotionalBanners } from '../data/products';
import '../styles/HomePage.css';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState([]);

  const filteredProducts =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <div className="container">
          {/* Banner Carousel */}
          <BannerCarousel banners={promotionalBanners} />

          {/* Featured Products Section */}
          <FeaturedProducts products={products} onAddToCart={handleAddToCart} />

          {/* Category Filter and Products Section */}
          <div className="shop-section">
            <aside className="sidebar">
              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </aside>

            <section className="products-section">
              <div className="section-header">
                <h2>{activeCategory === 'All' ? 'All Products' : activeCategory}</h2>
                <p>{filteredProducts.length} products available</p>
              </div>
              <ProductGrid
                products={filteredProducts}
                onAddToCart={handleAddToCart}
              />
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
