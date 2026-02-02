import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/AuthPages.css'

export default function LoginPage({ onNavigate }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useContext(AuthContext)

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      login(email, password)
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
              <h1>Welcome Back</h1>
              <p>Login to your ShopHub account</p>
            </div>

            <form onSubmit={handleLogin} className="auth-form">
              {error && <div className="error-message">❌ {error}</div>}

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

              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="auth-divider">
              <span>Don't have an account?</span>
            </div>

            <button
              className="auth-link-btn"
              onClick={() => onNavigate('signup')}
            >
              Create Account
            </button>

            <div className="demo-hint">
              <p>Demo credentials:</p>
              <p>📧 Email: demo@example.com</p>
              <p>🔑 Password: demo123</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
