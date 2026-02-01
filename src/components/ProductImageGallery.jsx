import React, { useState } from 'react';
import '../styles/ProductImageGallery.css';

export default function ProductImageGallery({ images = [] }) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="product-image-gallery">
      {/* Main Image Display */}
      <div className="main-image">
        <div className="image-container">
          <span className="large-image">{images[selectedImage]}</span>
        </div>
      </div>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="thumbnail-gallery">
          {images.map((image, index) => (
            <button
              key={index}
              className={`thumbnail ${index === selectedImage ? 'active' : ''}`}
              onClick={() => setSelectedImage(index)}
              aria-label={`View image ${index + 1}`}
            >
              <span>{image}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
