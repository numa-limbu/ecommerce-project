import React from 'react';
import '../styles/SortingOptions.css';

export default function SortingOptions({ sortBy, onSortChange }) {
  const sortOptions = [
    { value: 'newest', label: '🆕 Newest' },
    { value: 'price-low', label: '💵 Price: Low to High' },
    { value: 'price-high', label: '💰 Price: High to Low' },
    { value: 'rating', label: '⭐ Highest Rated' },
    { value: 'popular', label: '🔥 Most Popular' },
  ];

  return (
    <div className="sorting-options">
      <label htmlFor="sort">Sort by:</label>
      <select
        id="sort"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="sort-select"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
