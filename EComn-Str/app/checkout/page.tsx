'use client'
import { useStore } from '@/context/StoreContext'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const { cart, saveHistory, setCart } = useStore()
  const total = cart.reduce((sum: number, item: any) => sum + item.price, 0)
  const router = useRouter()

  const handleCheckout = () => {
    if (cart.length === 0) return alert("Your cart is empty.")
    saveHistory()
    setCart([])
    alert('Checkout successful! 🧾')
    router.push('/')
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <ul>
        {cart.map((item: any) => (
          <li key={item.id + '-' + Math.random()}>{item.title} - ${item.price}</li>
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