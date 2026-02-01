import React, { useState } from 'react';
import '../styles/ProductQuantitySelector.css';

export default function ProductQuantitySelector({ onQuantityChange }) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0 && newQuantity <= 99) {
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  return (
    <div className="quantity-selector">
      <label htmlFor="quantity">Quantity:</label>
      <div className="quantity-controls">
        <button
          className="qty-btn"
          onClick={() => handleQuantityChange(quantity - 1)}
          disabled={quantity <= 1}
        >
          −
        </button>
        <input
          id="quantity"
          type="number"
          min="1"
          max="99"
          value={quantity}
          onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
          className="qty-input"
        />
        <button
          className="qty-btn"
          onClick={() => handleQuantityChange(quantity + 1)}
          disabled={quantity >= 99}
        >
          +
        </button>
      </div>
    </div>
  );
}
