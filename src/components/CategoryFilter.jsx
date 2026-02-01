import React from 'react';
import '../styles/CategoryFilter.css';

export default function CategoryFilter({ categories, activeCategory, onCategoryChange }) {
  return (
    <div className="category-filter">
      <h3>Categories</h3>
      <div className="category-list">
        <button
          className={`category-btn ${activeCategory === 'All' ? 'active' : ''}`}
          onClick={() => onCategoryChange('All')}
        >
          All Products
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-btn ${activeCategory === category.name ? 'active' : ''}`}
            onClick={() => onCategoryChange(category.name)}
          >
            <span className="category-icon">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
