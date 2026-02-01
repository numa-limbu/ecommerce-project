import React from 'react';
import '../styles/PriceFilter.css';

export default function PriceFilter({ priceRange, onPriceChange }) {
  const handleMinChange = (e) => {
    const newMin = parseInt(e.target.value);
    if (newMin <= priceRange.max) {
      onPriceChange({ ...priceRange, min: newMin });
    }
  };

  const handleMaxChange = (e) => {
    const newMax = parseInt(e.target.value);
    if (newMax >= priceRange.min) {
      onPriceChange({ ...priceRange, max: newMax });
    }
  };

  return (
    <div className="price-filter">
      <h4>💰 Price Range</h4>
      <div className="price-inputs">
        <div className="price-input-group">
          <label>Min</label>
          <input
            type="range"
            min="0"
            max="300"
            value={priceRange.min}
            onChange={handleMinChange}
            className="price-slider"
          />
          <span className="price-value">${priceRange.min}</span>
        </div>

        <div className="price-input-group">
          <label>Max</label>
          <input
            type="range"
            min="0"
            max="300"
            value={priceRange.max}
            onChange={handleMaxChange}
            className="price-slider"
          />
          <span className="price-value">${priceRange.max}</span>
        </div>
      </div>

      <div className="price-display">
        <strong>${priceRange.min} - ${priceRange.max}</strong>
      </div>
    </div>
  );
}
