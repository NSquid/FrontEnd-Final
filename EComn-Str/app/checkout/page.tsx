'use client'
import { useStore } from '@/context/StoreContext'
import { useRouter } from 'next/navigation'

interface CartItem {
  id: string
  title: string
  price: number
}

export default function CheckoutPage() {
  const { cart, saveHistory, setCart } = useStore()
  const typedCart = cart as CartItem[] // type assertion
  const total = typedCart.reduce((sum, item) => sum + item.price, 0)
  const router = useRouter()

  const handleCheckout = () => {
    if (typedCart.length === 0) return alert("Your cart is empty.")
    saveHistory()
    setCart([])
    alert('Checkout successful! 🧾')
    router.push('/')
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <ul>
        {typedCart.map((item) => (
          <li key={item.id}>{item.title} - ${item.price}</li>
        ))}
      </ul>
      <p className="mt-4 font-semibold">Total: ${total}</p>
      <button
        onClick={handleCheckout}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Confirm Dummy Payment
      </button>
    </div>
  )
}
