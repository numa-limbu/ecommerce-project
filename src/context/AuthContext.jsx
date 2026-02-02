import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user')
      return saved ? JSON.parse(saved) : null
    } catch (e) {
      return null
    }
  })

  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('users')
      return saved ? JSON.parse(saved) : []
    } catch (e) {
      return []
    }
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users))
  }, [users])

  const signup = (email, password, name) => {
    const existingUser = users.find(u => u.email === email)
    if (existingUser) {
      throw new Error('Email already registered')
    }

    const newUser = {
      id: Date.now(),
      email,
      password, // Note: In production, never store passwords in plaintext!
      name,
      createdAt: new Date().toISOString(),
      wishlist: [],
      orders: [],
      reviews: []
    }

    setUsers([...users, newUser])
    setUser({ id: newUser.id, email: newUser.email, name: newUser.name, wishlist: [], orders: [] })
    return newUser
  }

  const login = (email, password) => {
    const foundUser = users.find(u => u.email === email && u.password === password)
    if (!foundUser) {
      throw new Error('Invalid email or password')
    }

    const userData = {
      id: foundUser.id,
      email: foundUser.email,
      name: foundUser.name,
      wishlist: foundUser.wishlist || [],
      orders: foundUser.orders || []
    }
    setUser(userData)
    return userData
  }

  const logout = () => {
    setUser(null)
  }

  const updateUserWishlist = (productId) => {
    if (!user) return

    const updatedUser = { ...user }
    if (updatedUser.wishlist.includes(productId)) {
      updatedUser.wishlist = updatedUser.wishlist.filter(id => id !== productId)
    } else {
      updatedUser.wishlist = [...(updatedUser.wishlist || []), productId]
    }

    setUser(updatedUser)

    // Update in users array
    const userIndex = users.findIndex(u => u.id === user.id)
    if (userIndex !== -1) {
      const updatedUsers = [...users]
      updatedUsers[userIndex].wishlist = updatedUser.wishlist
      setUsers(updatedUsers)
    }
  }

  const addOrder = (order) => {
    if (!user) return

    const updatedUser = { ...user }
    updatedUser.orders = [...(updatedUser.orders || []), order]
    setUser(updatedUser)

    const userIndex = users.findIndex(u => u.id === user.id)
    if (userIndex !== -1) {
      const updatedUsers = [...users]
      updatedUsers[userIndex].orders = updatedUser.orders
      setUsers(updatedUsers)
    }
  }

  const addReview = (productId, review) => {
    if (!user) return

    const updatedUser = { ...user }
    updatedUser.reviews = [...(updatedUser.reviews || []), { productId, ...review }]
    setUser(updatedUser)

    const userIndex = users.findIndex(u => u.id === user.id)
    if (userIndex !== -1) {
      const updatedUsers = [...users]
      updatedUsers[userIndex].reviews = updatedUser.reviews
      setUsers(updatedUsers)
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      signup,
      login,
      logout,
      updateUserWishlist,
      addOrder,
      addReview
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
