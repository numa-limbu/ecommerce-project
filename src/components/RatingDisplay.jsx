import React from 'react';
import '../styles/RatingDisplay.css';

export default function RatingDisplay({ rating, reviews }) {
  const stars = Math.round(rating * 2) / 2; // Round to nearest 0.5
  const fullStars = Math.floor(stars);
  const hasHalfStar = stars % 1 !== 0;

  return (
    <div className="rating-display">
      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="star">
            {i < fullStars
              ? '⭐'
              : hasHalfStar && i === fullStars
              ? '⭐'
              : '☆'}
          </span>
        ))}
      </div>
      <span className="rating-value">{rating.toFixed(1)}</span>
      <span className="reviews">({reviews} reviews)</span>
    </div>
  );
}
