import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import '../styles/ProductCard.css'
import '../styles/ProductQuantitySelector.css'

export default function ShoppingCart({ onNavigate }) {
  const { cartItems, updateQuantity, removeItem, totalPrice, clearCart } = useContext(CartContext)

  const handleChange = (id, delta) => {
    const item = cartItems.find((c) => c.id === id)
    if (!item) return
    const next = Math.max(1, Math.min(99, item.quantity + delta))
    updateQuantity(id, next)
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h2>Your Cart</h2>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
            <button onClick={() => onNavigate('products')}>Browse Products</button>
          </div>
        ) : (
          <div className="cart-grid">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-left">
                    <div className="product-image small">{item.image}</div>
                    <div>
                      <h4>{item.name}</h4>
                      <p className="muted">{item.category}</p>
                    </div>
                  </div>

                  <div className="cart-item-right">
                    <div className="quantity-controls">
                      <button onClick={() => handleChange(item.id, -1)} disabled={item.quantity <= 1}>−</button>
                      <input value={item.quantity} readOnly className="qty-input" />
                      <button onClick={() => handleChange(item.id, 1)} disabled={item.quantity >= 99}>+</button>
                    </div>

                    <div className="item-price">${(item.price * item.quantity).toFixed(2)}</div>
                    <button className="remove-btn" onClick={() => removeItem(item.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>

            <aside className="cart-summary">
              <h3>Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Estimated Tax</span>
                <span>${(totalPrice * 0.07).toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${(totalPrice * 1.07).toFixed(2)}</span>
              </div>

              <button className="checkout-btn" onClick={() => onNavigate('checkout')}>Proceed to Checkout</button>
              <button className="clear-btn" onClick={clearCart}>Clear Cart</button>
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}
