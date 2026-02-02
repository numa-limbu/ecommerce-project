import { useState, useEffect } from 'react'
import HomePage from './pages/HomePage'
import ProductListingPage from './pages/ProductListingPage'
import ProductDetailPage from './pages/ProductDetailPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import WishlistPage from './pages/WishlistPage'
import OrderHistoryPage from './pages/OrderHistoryPage'
import CheckoutPage from './pages/CheckoutPage'
import './App.css'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import ShoppingCart from './components/ShoppingCart'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [productId, setProductId] = useState(null)

  // Create demo user on first load
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    if (users.length === 0) {
      const demoUsers = [{
        id: 1,
        email: 'demo@example.com',
        password: 'demo123',
        name: 'Demo User',
        createdAt: new Date().toISOString(),
        wishlist: [],
        orders: [],
        reviews: []
      }]
      localStorage.setItem('users', JSON.stringify(demoUsers))
    }
  }, [])

  const handleNavigation = (page) => {
    if (page.includes('product/')) {
      const id = page.split('/')[1]
      setProductId(id)
      setCurrentPage('product')
    } else {
      setCurrentPage(page)
      setProductId(null)
    }
    window.scrollTo(0, 0)
  }

  return (
    <AuthProvider>
      <CartProvider>
        {currentPage === 'home' && <HomePage onNavigate={handleNavigation} />}
        {currentPage === 'products' && <ProductListingPage onNavigate={handleNavigation} />}
        {currentPage === 'product' && <ProductDetailPage productId={productId} onNavigate={handleNavigation} />}
        {currentPage === 'cart' && <ShoppingCart onNavigate={handleNavigation} />}
        {currentPage === 'login' && <LoginPage onNavigate={handleNavigation} />}
        {currentPage === 'signup' && <SignupPage onNavigate={handleNavigation} />}
        {currentPage === 'wishlist' && <WishlistPage onNavigate={handleNavigation} />}
        {currentPage === 'orders' && <OrderHistoryPage onNavigate={handleNavigation} />}
        {currentPage === 'checkout' && <CheckoutPage onNavigate={handleNavigation} />}
      </CartProvider>
    </AuthProvider>
  )
}

export default App
