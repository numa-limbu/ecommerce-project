import React, { createContext, useState, useEffect } from 'react'

export const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const raw = localStorage.getItem('cart')
      return raw ? JSON.parse(raw) : []
    } catch (e) {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems))
    } catch (e) {}
  }, [cartItems])

  const addItem = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === product.id)
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: Math.min(99, p.quantity + quantity) } : p
        )
      }
      return [...prev, { ...product, quantity }]
    })
  }

  const updateQuantity = (productId, quantity) => {
    setCartItems((prev) => prev.map((p) => (p.id === productId ? { ...p, quantity } : p)))
  }

  const removeItem = (productId) => {
    setCartItems((prev) => prev.filter((p) => p.id !== productId))
  }

  const clearCart = () => setCartItems([])

  const totalCount = cartItems.reduce((s, p) => s + (p.quantity || 0), 0)
  const totalPrice = cartItems.reduce((s, p) => s + (p.quantity || 0) * (p.price || 0), 0)

  return (
    <CartContext.Provider
      value={{ cartItems, addItem, updateQuantity, removeItem, clearCart, totalCount, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
