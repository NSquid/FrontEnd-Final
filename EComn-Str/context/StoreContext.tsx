'use client'
import { createContext, useContext, useEffect, useState } from 'react'

export const StoreContext = createContext<any>(null)

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<any[]>([])
  const [cart, setCart] = useState<any[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('https://dummyjson.com/products')
      const data = await res.json()
      setProducts(data.products)
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) setCart(JSON.parse(storedCart))
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: any) => {
    setCart(prev => [...prev, product])
  }

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const saveHistory = () => {
  const prev = JSON.parse(localStorage.getItem('history') || '[]')
  const newEntry = {
    id: Date.now(),
    items: cart,
    date: new Date().toLocaleString(),
  }
  localStorage.setItem('history', JSON.stringify([...prev, newEntry]))
}


  return (
    <StoreContext.Provider value={{
  products,
  cart,
  addToCart,
  removeFromCart,
  setCart,
  saveHistory
}}>

      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext)
