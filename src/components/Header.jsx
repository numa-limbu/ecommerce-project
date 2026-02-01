import React, { useState } from 'react';
import '../styles/Header.css';

export default function Header({ onNavigate }) {
  const [cartCount, setCartCount] = useState(3);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <div 
          className="logo"
          onClick={() => {
            onNavigate('home');
            setIsMenuOpen(false);
          }}
        >
          <span className="logo-icon">🛍️</span>
          <h1>ShopHub</h1>
        </div>

        <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
          <a 
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
              setIsMenuOpen(false);
            }}
          >
            Home
          </a>
          <a 
            href="#products"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('products');
              setIsMenuOpen(false);
            }}
          >
            All Products
          </a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="header-right">
          <button className="search-btn">🔍</button>
          <button className="cart-btn">
            🛒 <span className="cart-count">{cartCount}</span>
          </button>
          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
