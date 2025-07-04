'use client'
import { useState, useEffect } from 'react'

interface Category {
  slug: string
  name: string
  url: string
}

interface FilterPanelProps {
  onSearch: (term: string) => void
  onCategory: (category: string) => void
  onRating: (rating: number) => void
  onAvailability: (inStockOnly: boolean) => void
}

export default function FilterPanel({
  onSearch,
  onCategory,
  onRating,
  onAvailability,
}: FilterPanelProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then((data: Category[]) => {
        console.log("Fetched categories:", data)
        setCategories(data)
      })
      .catch((err) => console.error("Failed to fetch categories:", err))
  }, [])

  return (
    <div className="mb-4 space-y-2">
      {/* Search Input */}
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

      {/* Category Dropdown */}
      <select
        onChange={(e) => onCategory(e.target.value)}
        className="border p-2 w-full rounded"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* Rating Dropdown */}
      <select
        onChange={(e) => onRating(Number(e.target.value))}
        className="border p-2 w-full rounded"
      >
        <option value={0}>All Ratings</option>
        <option value={4}>4★ & above</option>
        <option value={3}>3★ & above</option>
      </select>

      {/* In Stock Checkbox */}
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
