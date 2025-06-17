'use client'
import { useStore } from '@/context/StoreContext'
import Link from 'next/link'

export default function ProductCard({ product }: { product: any }) {
  const { addToCart } = useStore()

  return (
    <div className="border p-4 rounded shadow">
      <Link href={`/product/${product.id}`}>
        <img src={product.thumbnail} alt={product.title} className="w-full h-40 object-cover rounded" />
        <h2 className="font-bold text-lg mt-2">{product.title}</h2>
      </Link>
      <p>${product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-2 px-4 py-1 bg-blue-600 text-white rounded"
      >
        Add to Cart
      </button>
    </div>
  )
}
