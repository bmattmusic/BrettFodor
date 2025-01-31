// src/app/page.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Code, ShoppingBag, User } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-24 flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            Brett Fodor
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300 mb-12">
            Leader of Software Development and Product Management Teams
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <Link href="/portfolio">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-8 rounded-lg bg-white dark:bg-gray-800 shadow-xl relative overflow-hidden group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Code className="w-12 h-12 mb-4 text-blue-500 mx-auto" />
                <h2 className="text-xl font-bold mb-4">Portfolio</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Explore my technical projects and achievements
                </p>
                <span className="inline-block text-blue-500 group-hover:text-blue-600 font-medium">
                  View Projects →
                </span>
              </motion.div>
            </Link>

            <Link href="/shop">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-8 rounded-lg bg-white dark:bg-gray-800 shadow-xl relative overflow-hidden group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <ShoppingBag className="w-12 h-12 mb-4 text-purple-500 mx-auto" />
                <h2 className="text-xl font-bold mb-4">Shop</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Browse my collection of custom designed products
                </p>
                <span className="inline-block text-purple-500 group-hover:text-purple-600 font-medium">
                  Visit Shop →
                </span>
              </motion.div>
            </Link>

            <Link href="/about">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-8 rounded-lg bg-white dark:bg-gray-800 shadow-xl relative overflow-hidden group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <User className="w-12 h-12 mb-4 text-pink-500 mx-auto" />
                <h2 className="text-xl font-bold mb-4">About</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Learn more about my background and expertise
                </p>
                <span className="inline-block text-pink-500 group-hover:text-pink-600 font-medium">
                  Read More →
                </span>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Always Visible Disclaimer */}
      <div className="w-full bg-gray-200 dark:bg-gray-900 text-center py-3 text-sm text-gray-700 dark:text-gray-400 fixed bottom-0 left-0 right-0">
        🚧 This site is a work in progress. Check back often for continuous updates! 🚀
      </div>
    </div>
  )
}
