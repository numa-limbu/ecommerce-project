import React from 'react';
import '../styles/Banner.css';

export default function Banner({ banner }) {
  return (
    <div className="banner" style={{ backgroundColor: banner.color }}>
      <div className="banner-content">
        <h2>{banner.title}</h2>
        <p>{banner.subtitle}</p>
        <button className="banner-btn">Shop Now</button>
      </div>
    </div>
  );
}
