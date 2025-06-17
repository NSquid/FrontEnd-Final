
'use client'
import { useTheme } from '@/context/ThemeContext'
import { useStore } from '@/context/StoreContext'
import Link from 'next/link'


export default function Navbar() {
  const { cart } = useStore()
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 text-black dark:text-white shadow">
      <div className="flex gap-4">
        <Link href="/" className="font-bold text-xl">Store</Link>
        

      </div>
      <div className="flex gap-4 items-center">
        <Link href="/checkout">🛒 ({cart.length}) Checkout</Link>
        <Link href="/history">📜 History</Link>
      </div>
    </nav>
  )
}
