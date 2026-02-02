import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/AuthPages.css'

export default function SignupPage({ onNavigate }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signup } = useContext(AuthContext)

  const handleSignup = (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      signup(email, password, name)
      onNavigate('home')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <Header onNavigate={onNavigate} />
      
      <main className="main-content">
        <div className="auth-container">
          <div className="auth-form-wrapper">
            <div className="auth-header">
              <h1>Create Account</h1>
              <p>Join ShopHub and start shopping</p>
            </div>

            <form onSubmit={handleSignup} className="auth-form">
              {error && <div className="error-message">❌ {error}</div>}

              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="form-input"
                />
              </div>

              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>

            <div className="auth-divider">
              <span>Already have an account?</span>
            </div>

            <button
              className="auth-link-btn"
              onClick={() => onNavigate('login')}
            >
              Login Here
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
