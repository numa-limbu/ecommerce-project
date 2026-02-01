import { useState } from 'react'
import HomePage from './pages/HomePage'
import ProductListingPage from './pages/ProductListingPage'
import ProductDetailPage from './pages/ProductDetailPage'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [productId, setProductId] = useState(null)

  const handleNavigation = (page) => {
    // Check if page contains a product ID (format: 'product/123')
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
    <>
      {currentPage === 'home' && <HomePage onNavigate={handleNavigation} />}
      {currentPage === 'products' && <ProductListingPage onNavigate={handleNavigation} />}
      {currentPage === 'product' && <ProductDetailPage productId={productId} onNavigate={handleNavigation} />}
    </>
  )
}

export default App
