'use client'
import { useStore } from '@/context/StoreContext'
import ProductCard from '@/components/ProductCard'
import FilterPanel from '@/components/FilterPanel'
import { useState } from 'react'

interface Product {
  id: string
  title: string
  category: string
  rating: number
  stock: number
  thumbnail: string  
  price: number      
}

export default function Home() {
  const { products } = useStore()
  const typedProducts = products as Product[]

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [minRating, setMinRating] = useState(0)
  const [inStockOnly, setInStockOnly] = useState(false)

  const filtered = typedProducts.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === '' || product.category === category
    const matchesRating = product.rating >= minRating
    const matchesStock = !inStockOnly || product.stock > 0

    return matchesSearch && matchesCategory && matchesRating && matchesStock
  })

  return (
    <div className="p-6">
      <FilterPanel
        onSearch={setSearch}
        onCategory={setCategory}
        onRating={setMinRating}
        onAvailability={setInStockOnly}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filtered.map((product) => (
          <ProductCard key={`${product.id}-${product.title}`} product={product} />
        ))}
      </div>
    </div>
  )
}
