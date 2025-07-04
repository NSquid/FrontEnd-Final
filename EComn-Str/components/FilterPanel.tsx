'use client'
import { useState, useEffect } from 'react'

export default function FilterPanel({
  onSearch,
  onCategory,
  onRating,
  onAvailability,
}: {
  onSearch: (term: string) => void
  onCategory: (category: string) => void
  onRating: (rating: number) => void
  onAvailability: (inStockOnly: boolean) => void
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(setCategories)
  }, [])

  return (
    <div className="mb-4 space-y-2">
      <input
        type="text"
        placeholder="Search product name..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value)
          onSearch(e.target.value)
        }}
        className="border p-2 w-full rounded"
      />

      <select onChange={(e) => onCategory(e.target.value)} className="border p-2 w-full rounded">
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>


      <select onChange={(e) => onRating(Number(e.target.value))} className="border p-2 w-full rounded">
        <option value={0}>All Ratings</option>
        <option value={4}>4★ & above</option>
        <option value={3}>3★ & above</option>
      </select>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          onChange={(e) => onAvailability(e.target.checked)}
        />
        In stock only
      </label>
    </div>
  )
}
