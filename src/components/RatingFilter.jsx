import React from 'react';
import '../styles/RatingFilter.css';

export default function RatingFilter({ selectedRating, onRatingChange }) {
  const ratings = [
    { value: 0, label: 'All Ratings' },
    { value: 4.5, label: '⭐⭐⭐⭐⭐ 4.5 & up' },
    { value: 4, label: '⭐⭐⭐⭐ 4 & up' },
    { value: 3.5, label: '⭐⭐⭐ 3.5 & up' },
    { value: 3, label: '⭐⭐⭐ 3 & up' },
  ];

  return (
    <div className="rating-filter">
      <h4>⭐ Rating</h4>
      <div className="rating-options">
        {ratings.map((rating) => (
          <label key={rating.value} className="rating-option">
            <input
              type="radio"
              name="rating"
              value={rating.value}
              checked={selectedRating === rating.value}
              onChange={() => onRatingChange(rating.value)}
            />
            <span>{rating.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
