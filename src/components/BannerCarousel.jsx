import React, { useState, useEffect } from 'react';
import Banner from './Banner';
import '../styles/BannerCarousel.css';

export default function BannerCarousel({ banners }) {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const goToBanner = (index) => {
    setCurrentBanner(index);
  };

  return (
    <div className="banner-carousel">
      <div className="carousel-wrapper">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`carousel-slide ${index === currentBanner ? 'active' : ''}`}
          >
            <Banner banner={banner} />
          </div>
        ))}
      </div>

      <div className="carousel-indicators">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentBanner ? 'active' : ''}`}
            onClick={() => goToBanner(index)}
          />
        ))}
      </div>
    </div>
  );
}
