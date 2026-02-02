import React, { useState, useContext, useEffect } from 'react';
import '../styles/Header.css';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import SearchBar from './SearchBar';

export default function Header({ onNavigate }) {
  const { totalCount } = useContext(CartContext)
  const { user, logout } = useContext(AuthContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = '' };
  }, [isMenuOpen]);

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
    onNavigate('home')
  }

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
          <div className="mobile-search">
            <SearchBar
              searchTerm={localSearch}
              onSearchChange={(val) => {
                setLocalSearch(val);
                window.dispatchEvent(new CustomEvent('globalSearch', { detail: val }));
              }}
            />
          </div>
        </nav>

        <div className="header-right">
          <div className="header-search">
            <SearchBar
              searchTerm={localSearch}
              onSearchChange={(val) => {
                setLocalSearch(val);
                window.dispatchEvent(new CustomEvent('globalSearch', { detail: val }));
                if (val && onNavigate) onNavigate('products');
              }}
            />
          </div>
          <button className="search-btn" aria-label="Open search">🔍</button>
          
          {user && (
            <>
              <button
                className="wishlist-btn"
                onClick={() => {
                  onNavigate('wishlist')
                  setIsMenuOpen(false)
                }}
                title="Wishlist"
              >
                ❤️
              </button>
              <button
                className="orders-btn"
                onClick={() => {
                  onNavigate('orders')
                  setIsMenuOpen(false)
                }}
                title="Orders"
              >
                📦
              </button>
            </>
          )}
          
          <button
            className="cart-btn"
            onClick={() => onNavigate('cart')}
            title="View cart"
          >
            🛒 <span className="cart-count">{totalCount}</span>
          </button>
          
          {user ? (
            <div className="user-menu">
              <button className="user-btn" title="Account">👤 {user.name.split(' ')[0]}</button>
              <button
                className="logout-btn"
                onClick={handleLogout}
                title="Logout"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <button
                className="login-btn"
                onClick={() => {
                  onNavigate('login')
                  setIsMenuOpen(false)
                }}
              >
                Login
              </button>
              <button
                className="signup-btn"
                onClick={() => {
                  onNavigate('signup')
                  setIsMenuOpen(false)
                }}
              >
                Sign Up
              </button>
            </div>
          )}
          
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
