'use client'
import { useEffect, useState } from 'react'

interface Item {
  id: string
  title: string
  price: number
}

interface Order {
  id: string
  date: string
  items: Item[]
}

export default function HistoryPage() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('history')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        // Optional: basic type guard
        if (Array.isArray(parsed)) {
          setOrders(parsed)
        }
      } catch (err) {
        console.error('Failed to parse history from localStorage:', err)
      }
    }
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Purchase History</h1>
      {orders.length === 0 ? (
        <p>No purchase history yet.</p>
      ) : (
        orders.map((order) => {
          const total = order.items.reduce((sum, item) => sum + item.price, 0)
          return (
            <div key={order.id} className="border p-4 mb-4 rounded shadow bg-white dark:bg-gray-900">
              <div className="font-semibold mb-2">🕒 Order at: {order.date}</div>
              <ul className="ml-4 list-disc text-sm">
                {order.items.map((item) => (
                  <li key={`${order.id}-${item.id}`}>
                    {item.title} - ${item.price}
                  </li>
                ))}
              </ul>
              <div className="mt-2 text-right font-bold">Total: ${total}</div>
            </div>
          )
        })
      )}
    </div>
  )
}
