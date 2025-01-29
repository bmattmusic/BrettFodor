'use client'

import { useState } from 'react'
import { useCart } from '@/hooks/useCart'
import { motion } from 'framer-motion'

export function CheckoutButton() {
  const [isLoading, setIsLoading] = useState(false)
  const cart = useCart()

  const handleCheckout = async () => {
    console.log('Starting checkout process...')
    setIsLoading(true)
    try {
      console.log('Cart items:', cart.items)
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart.items,
        }),
      })

      console.log('Checkout response:', response)
      const data = await response.json()
      console.log('Checkout data:', data)

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (error) {
      console.error('Error in checkout process:', error)
      alert('There was an error processing your checkout. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCheckout}
      disabled={isLoading}
      className={`w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
        text-white py-4 px-6 rounded-lg font-medium hover:shadow-lg 
        transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {isLoading ? 'Redirecting...' : 'Proceed to Checkout'}
    </motion.button>
  )
}