'use client'
import { useStore } from '@/context/StoreContext'
import ProductCard from '@/components/ProductCard'
import FilterPanel from '@/components/FilterPanel'
import { useState } from 'react'

export default function Home() {
  const { products } = useStore()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [minRating, setMinRating] = useState(0)
  const [inStockOnly, setInStockOnly] = useState(false)

  const filtered = products.filter((product: any) => {
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
        {filtered.map((product: any) => (
          <ProductCard key={`${product.id}-${product.title}`} product={product} />
        ))}
      </div>
    </div>
  )
}
