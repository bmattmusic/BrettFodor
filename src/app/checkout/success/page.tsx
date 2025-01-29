// src/app/checkout/success/page.tsx
'use client'

import { useEffect, useRef } from 'react'
import { useCart } from '@/hooks/useCart'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function SuccessPage() {
  const cart = useCart()
  const hasCleared = useRef(false)

  useEffect(() => {
    if (!hasCleared.current) {
      cart.clearCart()
      hasCleared.current = true
    }
  }, [cart])

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto"
      >
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Order Confirmed!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Thank you for your purchase. You will receive an email confirmation shortly.
          </p>
          <Link 
            href="/shop"
            className="inline-block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
              text-white px-8 py-3 rounded-lg hover:shadow-lg 
              transition-all duration-300 transform hover:scale-105"
          >
            Continue Shopping
          </Link>
        </div>
      </motion.div>
    </div>
  )
}