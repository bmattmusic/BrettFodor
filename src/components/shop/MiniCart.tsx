// src/components/shop/MiniCart.tsx
'use client'

import { useCart } from '@/hooks/useCart'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'

interface MiniCartProps {
  isVisible: boolean
}

export function MiniCart({ isVisible }: MiniCartProps) {
  const cart = useCart()

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute top-full right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50"
        >
          {cart.items.length === 0 ? (
            <div className="p-4 text-center">
              <ShoppingBag className="w-6 h-6 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-500 dark:text-gray-400">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="max-h-64 overflow-auto">
                {cart.items.map((item) => (
                  <div 
                    key={item.id}
                    className="p-3 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="relative w-12 h-12 flex-shrink-0">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                          <ShoppingBag className="w-4 h-4 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-sm text-blue-600 dark:text-blue-400">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700/50">
                <Link
                  href="/cart"
                  className="block w-full py-2 px-4 text-center text-sm bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-md hover:shadow-lg transition-shadow"
                >
                  View Cart (${cart.total().toFixed(2)})
                </Link>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}