import { useState } from 'react'
import HomePage from './pages/HomePage'
import ProductListingPage from './pages/ProductListingPage'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const handleNavigation = (page) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  return (
    <>
      {currentPage === 'home' && <HomePage onNavigate={handleNavigation} />}
      {currentPage === 'products' && <ProductListingPage onNavigate={handleNavigation} />}
    </>
  )
}

export default App
