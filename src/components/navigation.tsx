'use client'

import Link from 'next/link'
import { useCart } from '@/hooks/useCart'
import { useState, useEffect, useRef } from 'react'
import { ShoppingCart, Home, User, Code, ShoppingBag } from 'lucide-react'
import { motion } from 'framer-motion'
import { MiniCart } from '@/components/shop/MiniCart'

export default function Navigation() {
  const [isMiniCartVisible, setIsMiniCartVisible] = useState(false)
  const cart = useCart()
  const [mounted, setMounted] = useState(false)
  const miniCartTimer = useRef<NodeJS.Timeout>()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleCartMouseEnter = () => {
    if (miniCartTimer.current) {
      clearTimeout(miniCartTimer.current)
    }
    setIsMiniCartVisible(true)
  }

  const handleCartMouseLeave = () => {
    miniCartTimer.current = setTimeout(() => {
      setIsMiniCartVisible(false)
    }, 300)
  }

  const navItems = [
    { href: '/', icon: <Home className="w-4 h-4" />, label: 'Home' },
    { href: '/portfolio', icon: <Code className="w-4 h-4" />, label: 'Portfolio' },
    { href: '/shop', icon: <ShoppingBag className="w-4 h-4" />, label: 'Shop' },
    { href: '/about', icon: <User className="w-4 h-4" />, label: 'About' },
  ]

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex-shrink-0 flex items-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            >
              Brett Fodor
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center px-3 py-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center">
            <div 
              className="relative"
              onMouseEnter={handleCartMouseEnter}
              onMouseLeave={handleCartMouseLeave}
            >
              <Link 
                href="/cart" 
                className="p-2 text-gray-900 dark:text-gray-100 flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {mounted && cart && typeof cart.itemCount === 'function' && cart.itemCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {cart.itemCount()}
                    </span>
                  )}
                </motion.div>
                <span className="ml-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  Cart
                </span>
              </Link>
              
              <MiniCart isVisible={isMiniCartVisible} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}