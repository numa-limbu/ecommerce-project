import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/OrderHistory.css'

export default function OrderHistoryPage({ onNavigate }) {
  const { user } = useContext(AuthContext)

  if (!user) {
    return (
      <div className="app">
        <Header onNavigate={onNavigate} />
        <main className="main-content">
          <div className="container">
            <div className="not-authenticated">
              <h2>🔐 Please Login</h2>
              <p>You need to login to view your orders</p>
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

  const orders = user.orders || []

  return (
    <div className="app">
      <Header onNavigate={onNavigate} />
      
      <main className="main-content">
        <div className="container">
          <div className="orders-header">
            <h1>📦 Order History</h1>
            <p>View your past orders and track delivery status</p>
          </div>

          {orders.length === 0 ? (
            <div className="empty-orders">
              <p>You haven't placed any orders yet</p>
              <button 
                onClick={() => onNavigate('products')}
                className="primary-btn"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order, index) => (
                <div key={index} className="order-card">
                  <div className="order-header">
                    <div className="order-info">
                      <h3>Order #{order.id}</h3>
                      <p className="order-date">📅 {new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div className="order-status">
                      <span className={`status-badge ${order.status}`}>
                        {order.status === 'delivered' && '✓ Delivered'}
                        {order.status === 'processing' && '⏳ Processing'}
                        {order.status === 'shipped' && '📤 Shipped'}
                        {order.status === 'pending' && '⏸ Pending'}
                      </span>
                    </div>
                  </div>

                  <div className="order-items">
                    <h4>Items</h4>
                    <div className="items-list">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="order-item">
                          <span className="item-icon">{item.image}</span>
                          <div className="item-details">
                            <p className="item-name">{item.name}</p>
                            <p className="item-qty">Qty: {item.quantity}</p>
                          </div>
                          <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="order-summary">
                    <div className="summary-row">
                      <span>Subtotal:</span>
                      <span>${order.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                      <span>Tax:</span>
                      <span>${order.tax.toFixed(2)}</span>
                    </div>
                    <div className="summary-row total">
                      <span>Total:</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="order-actions">
                    <button className="secondary-btn">Download Invoice</button>
                    <button className="secondary-btn">Track Order</button>
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
