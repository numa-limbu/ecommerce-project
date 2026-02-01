import React from 'react';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About ShopHub</h4>
          <p>Your one-stop shop for quality products at great prices.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="#facebook">👍 Facebook</a>
            <a href="#twitter">🐦 Twitter</a>
            <a href="#instagram">📷 Instagram</a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Newsletter</h4>
          <div className="newsletter">
            <input type="email" placeholder="Your email" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 ShopHub. All rights reserved.</p>
      </div>
    </footer>
  );
}
