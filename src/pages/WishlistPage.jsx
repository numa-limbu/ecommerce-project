import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { CartContext } from '../context/CartContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import RatingDisplay from '../components/RatingDisplay'
import { products } from '../data/products'
import '../styles/Wishlist.css'

export default function WishlistPage({ onNavigate }) {
  const { user, updateUserWishlist } = useContext(AuthContext)
  const { addItem } = useContext(CartContext)

  if (!user) {
    return (
      <div className="app">
        <Header onNavigate={onNavigate} />
        <main className="main-content">
          <div className="container">
            <div className="not-authenticated">
              <h2>🔐 Please Login</h2>
              <p>You need to login to view your wishlist</p>
              <button onClick={() => onNavigate('login')} className="primary-btn">
                Go to Login
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const wishlistProducts = products.filter(p => user.wishlist?.includes(p.id))

  return (
    <div className="app">
      <Header onNavigate={onNavigate} />
      
      <main className="main-content">
        <div className="container">
          <div className="wishlist-header">
            <h1>❤️ My Wishlist</h1>
            <p>{wishlistProducts.length} item(s) in your wishlist</p>
          </div>

          {wishlistProducts.length === 0 ? (
            <div className="empty-wishlist">
              <p>Your wishlist is empty</p>
              <button 
                onClick={() => onNavigate('products')}
                className="primary-btn"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="wishlist-grid">
              {wishlistProducts.map(product => (
                <div key={product.id} className="wishlist-item">
                  <div className="wishlist-image">
                    <span className="product-icon">{product.image}</span>
                    <button
                      className="remove-btn"
                      onClick={() => updateUserWishlist(product.id)}
                      title="Remove from wishlist"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="wishlist-info">
                    <h3>{product.name}</h3>
                    <p className="category">{product.category}</p>
                    <RatingDisplay rating={product.rating} reviews={product.reviews} />
                    <p className="description">{product.description}</p>

                    <div className="wishlist-footer">
                      <span className="price">${product.price.toFixed(2)}</span>
                      <button
                        className="add-to-cart-btn"
                        onClick={() => addItem(product, 1)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
