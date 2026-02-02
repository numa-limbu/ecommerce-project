import React, { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext'
import { AuthContext } from '../context/AuthContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/Checkout.css'

export default function CheckoutPage({ onNavigate }) {
  const { cartItems, totalPrice, clearCart } = useContext(CartContext)
  const { user, addOrder } = useContext(AuthContext)
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  })

  const [paymentInfo, setPaymentInfo] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  })

  const taxRate = 0.07
  const shippingCost = totalPrice > 50 ? 0 : 9.99
  const tax = totalPrice * taxRate
  const total = totalPrice + tax + shippingCost

  const handleShippingChange = (e) => {
    const { name, value } = e.target
    setShippingInfo(prev => ({ ...prev, [name]: value }))
  }

  const handlePaymentChange = (e) => {
    const { name, value } = e.target
    setPaymentInfo(prev => ({ ...prev, [name]: value }))
  }

  const validateShipping = () => {
    return Object.values(shippingInfo).every(val => val.trim() !== '')
  }

  const validatePayment = () => {
    return (
      paymentInfo.cardName.trim() !== '' &&
      paymentInfo.cardNumber.replace(/\s/g, '').length === 16 &&
      paymentInfo.expiry.match(/^\d{2}\/\d{2}$/) &&
      paymentInfo.cvv.length === 3
    )
  }

  const handlePlaceOrder = async () => {
    if (!user) {
      onNavigate('login')
      return
    }

    if (!validateShipping() || !validatePayment()) {
      alert('Please fill in all fields correctly')
      return
    }

    setLoading(true)

    // Simulate payment processing
    setTimeout(() => {
      const newOrder = {
        id: `ORD-${Date.now()}`,
        date: new Date().toISOString(),
        items: cartItems,
        subtotal: totalPrice,
        tax,
        shipping: shippingCost,
        total,
        status: 'pending',
        shippingInfo,
        paymentMethod: `****${paymentInfo.cardNumber.slice(-4)}`
      }

      addOrder(newOrder)
      clearCart()
      setOrderPlaced(true)
      setLoading(false)
    }, 2000)
  }

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="app">
        <Header onNavigate={onNavigate} />
        <main className="main-content">
          <div className="container">
            <div className="empty-checkout">
              <p>Your cart is empty</p>
              <button onClick={() => onNavigate('products')} className="primary-btn">
                Continue Shopping
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (orderPlaced) {
    return (
      <div className="app">
        <Header onNavigate={onNavigate} />
        <main className="main-content">
          <div className="container">
            <div className="order-success">
              <div className="success-icon">✓</div>
              <h1>Order Placed Successfully!</h1>
              <p>Thank you for your purchase</p>
              <div className="order-details">
                <p>Order ID: <strong>ORD-{Date.now()}</strong></p>
                <p>Total Amount: <strong>${total.toFixed(2)}</strong></p>
                <p>A confirmation email has been sent to {shippingInfo.email}</p>
              </div>
              <div className="success-actions">
                <button onClick={() => onNavigate('orders')} className="primary-btn">
                  View Order History
                </button>
                <button onClick={() => onNavigate('home')} className="secondary-btn">
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="app">
      <Header onNavigate={onNavigate} />
      
      <main className="main-content">
        <div className="container">
          <div className="checkout-wrapper">
            {/* Steps */}
            <div className="checkout-steps">
              <div className={`step ${step === 1 ? 'active' : step > 1 ? 'completed' : ''}`}>
                <span className="step-number">1</span>
                <span className="step-label">Shipping</span>
              </div>
              <div className={`step ${step === 2 ? 'active' : step > 2 ? 'completed' : ''}`}>
                <span className="step-number">2</span>
                <span className="step-label">Payment</span>
              </div>
              <div className={`step ${step === 3 ? 'active' : ''}`}>
                <span className="step-number">3</span>
                <span className="step-label">Review</span>
              </div>
            </div>

            {/* Checkout Content */}
            <div className="checkout-content">
              {/* Shipping Step */}
              {step === 1 && (
                <div className="checkout-step">
                  <h2>Shipping Address</h2>
                  <form className="form-grid">
                    <div className="form-group">
                      <label>First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={shippingInfo.firstName}
                        onChange={handleShippingChange}
                        placeholder="John"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={shippingInfo.lastName}
                        onChange={handleShippingChange}
                        placeholder="Doe"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group full">
                      <label>Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={shippingInfo.email}
                        onChange={handleShippingChange}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group full">
                      <label>Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleShippingChange}
                        placeholder="+1 (555) 000-0000"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group full">
                      <label>Address *</label>
                      <input
                        type="text"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleShippingChange}
                        placeholder="123 Main Street"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>City *</label>
                      <input
                        type="text"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleShippingChange}
                        placeholder="New York"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>State *</label>
                      <input
                        type="text"
                        name="state"
                        value={shippingInfo.state}
                        onChange={handleShippingChange}
                        placeholder="NY"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>ZIP Code *</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={handleShippingChange}
                        placeholder="10001"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group full">
                      <label>Country *</label>
                      <input
                        type="text"
                        name="country"
                        value={shippingInfo.country}
                        onChange={handleShippingChange}
                        placeholder="United States"
                        className="form-input"
                      />
                    </div>
                  </form>
                </div>
              )}

              {/* Payment Step */}
              {step === 2 && (
                <div className="checkout-step">
                  <h2>Payment Information</h2>
                  <form className="form-grid">
                    <div className="form-group full">
                      <label>Cardholder Name *</label>
                      <input
                        type="text"
                        name="cardName"
                        value={paymentInfo.cardName}
                        onChange={handlePaymentChange}
                        placeholder="John Doe"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group full">
                      <label>Card Number *</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => {
                          let val = e.target.value.replace(/\s/g, '')
                          val = val.replace(/(\d{4})/g, '$1 ').trim()
                          handlePaymentChange({ target: { name: 'cardNumber', value: val } })
                        }}
                        placeholder="4532 1234 5678 9010"
                        maxLength="19"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Expiry Date (MM/YY) *</label>
                      <input
                        type="text"
                        name="expiry"
                        value={paymentInfo.expiry}
                        onChange={(e) => {
                          let val = e.target.value.replace(/\D/g, '')
                          if (val.length >= 2) {
                            val = val.slice(0, 2) + '/' + val.slice(2, 4)
                          }
                          handlePaymentChange({ target: { name: 'expiry', value: val } })
                        }}
                        placeholder="12/25"
                        maxLength="5"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>CVV *</label>
                      <input
                        type="text"
                        name="cvv"
                        value={paymentInfo.cvv}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 3)
                          handlePaymentChange({ target: { name: 'cvv', value: val } })
                        }}
                        placeholder="123"
                        maxLength="3"
                        className="form-input"
                      />
                    </div>
                  </form>
                </div>
              )}

              {/* Review Step */}
              {step === 3 && (
                <div className="checkout-step">
                  <h2>Order Review</h2>
                  
                  <div className="review-section">
                    <h3>Shipping Address</h3>
                    <p>{shippingInfo.firstName} {shippingInfo.lastName}</p>
                    <p>{shippingInfo.address}</p>
                    <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                    <p>{shippingInfo.country}</p>
                  </div>

                  <div className="review-section">
                    <h3>Items</h3>
                    {cartItems.map(item => (
                      <div key={item.id} className="review-item">
                        <span>{item.name}</span>
                        <span>Qty: {item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="checkout-summary">
              <h3>Order Summary</h3>
              <div className="summary-items">
                {cartItems.map(item => (
                  <div key={item.id} className="summary-item">
                    <span>{item.name} x{item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="summary-totals">
                <div className="total-row">
                  <span>Subtotal:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span>Shipping:</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                <div className="total-row grand-total">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {shippingCost === 0 && (
                <div className="free-shipping">✓ Free Shipping</div>
              )}

              <div className="checkout-buttons">
                {step > 1 && (
                  <button
                    className="secondary-btn"
                    onClick={() => setStep(step - 1)}
                  >
                    ← Back
                  </button>
                )}
                {step < 3 && (
                  <button
                    className="primary-btn"
                    onClick={() => {
                      if (step === 1 && validateShipping()) setStep(2)
                      else if (step === 2 && validatePayment()) setStep(3)
                    }}
                  >
                    Next →
                  </button>
                )}
                {step === 3 && (
                  <button
                    className="primary-btn"
                    onClick={handlePlaceOrder}
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : 'Place Order'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
