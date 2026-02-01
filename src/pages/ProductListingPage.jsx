import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import PriceFilter from '../components/PriceFilter';
import RatingFilter from '../components/RatingFilter';
import SortingOptions from '../components/SortingOptions';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import { categories, products } from '../data/products';
import '../styles/ProductListingPage.css';

export default function ProductListingPage({ onNavigate }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 300 });
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState('newest');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filtering and sorting logic
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        activeCategory === 'All' || product.category === activeCategory;

      const matchesPrice =
        product.price >= priceRange.min && product.price <= priceRange.max;

      const matchesRating =
        selectedRating === 0 || (product.rating && product.rating >= selectedRating);

      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'popular':
        filtered.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => b.id - a.id);
        break;
    }

    return filtered;
  }, [searchTerm, activeCategory, priceRange, selectedRating, sortBy]);

  const handleAddToCart = (product) => {
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="app">
      <Header onNavigate={onNavigate} />

      <main className="main-content">
        <div className="container">
          {/* Search Bar */}
          <div className="search-section">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          </div>

          {/* Sorting */}
          <div className="sorting-section">
            <SortingOptions sortBy={sortBy} onSortChange={setSortBy} />
            <button
              className="mobile-filter-btn"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              ⚙️ Filters
            </button>
          </div>

          <div className="shop-section">
            {/* Sidebar Filters */}
            <aside className={`sidebar ${showMobileFilters ? 'active' : ''}`}>
              <div className="filters-header">
                <h3>Filters</h3>
                <button
                  className="close-filters"
                  onClick={() => setShowMobileFilters(false)}
                >
                  ✕
                </button>
              </div>

              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />

              <PriceFilter priceRange={priceRange} onPriceChange={setPriceRange} />

              <RatingFilter selectedRating={selectedRating} onRatingChange={setSelectedRating} />

              {/* Clear Filters Button */}
              <button
                className="clear-filters-btn"
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('All');
                  setPriceRange({ min: 0, max: 300 });
                  setSelectedRating(0);
                  setSortBy('newest');
                }}
              >
                🔄 Clear All Filters
              </button>
            </aside>

            {/* Products Section */}
            <section className="products-section">
              <div className="section-header">
                <h2>
                  {activeCategory === 'All'
                    ? 'All Products'
                    : activeCategory}
                </h2>
                <p>
                  {filteredProducts.length} product
                  {filteredProducts.length !== 1 ? 's' : ''} found
                </p>
              </div>

              {filteredProducts.length > 0 ? (
                <ProductGrid
                  products={filteredProducts}
                  onAddToCart={handleAddToCart}
                />
              ) : (
                <div className="no-products">
                  <p>😕 No products found matching your filters.</p>
                  <button
                    className="reset-btn"
                    onClick={() => {
                      setSearchTerm('');
                      setActiveCategory('All');
                      setPriceRange({ min: 0, max: 300 });
                      setSelectedRating(0);
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
