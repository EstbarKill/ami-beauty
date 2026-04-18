"use client"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

const Store = createContext()

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([])
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"))
    setFavorites(JSON.parse(localStorage.getItem("fav") || "[]"))
  }, [])

  const addToCart = (p) => {
    const next = [...cart, p]
    setCart(next)
    localStorage.setItem("cart", JSON.stringify(next))
  }

  const toggleFav = (p) => {
    let next
    if (favorites.find(f => f.id === p.id)) {
      next = favorites.filter(f => f.id !== p.id)
    } else {
      next = [...favorites, p]
    }
    setFavorites(next)
    localStorage.setItem("fav", JSON.stringify(next))
  }

  const isFav = (id) => favorites.some(f => f.id === id)

  const value = useMemo(() => ({
    cart,
    favorites,
    addToCart,
    toggleFav,
    isFav
  }), [cart, favorites])

  return <Store.Provider value={value}>{children}</Store.Provider>
}

export const useStore = () => useContext(Store)