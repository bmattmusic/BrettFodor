'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useCart } from '@/hooks/useCart'
import { useToast } from '@/hooks/useToast'
import { motion } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

interface ProductVariant {
  id: number
  name: string
  size: string
  color: string
  price: number
  imageUrl: string
}

interface Product {
  id: number
  name: string
  description: string
  variants: ProductVariant[]
}

interface ProductDetailsProps {
  id: string | number
  initialProduct?: Product
}

export function ProductDetails({ id, initialProduct }: ProductDetailsProps) {
  const [product, setProduct] = useState<Product | null>(initialProduct || null)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
  const [quantity, setQuantity] = useState(1)
  const cart = useCart()
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!initialProduct) {
      async function fetchProduct() {
        try {
          setIsLoading(true)
          setError(null)
          const res = await fetch(`/api/printful/products/${id}`)
          if (!res.ok) throw new Error('Failed to fetch product')
          const data = await res.json()
          setProduct(data)
          if (data.variants.length > 0) {
            setSelectedVariant(data.variants[0])
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to load product')
        } finally {
          setIsLoading(false)
        }
      }
      fetchProduct()
    }
  }, [id, initialProduct])

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(Math.max(1, Math.min(10, newQuantity)))
  }

  const handleAddToCart = () => {
    if (selectedVariant) {
      cart.addItem({
        id: selectedVariant.id.toString(),
        name: `${product?.name} - ${selectedVariant.size} ${selectedVariant.color}`,
        price: selectedVariant.price,
        quantity,
        image: selectedVariant.imageUrl
      })
      toast.showToast(`${quantity} item${quantity > 1 ? 's' : ''} added to cart`)
      setQuantity(1)
    }
  }

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )

  if (error) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <p className="text-red-500">{error}</p>
    </div>
  )

  if (!product) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <p>No product found</p>
    </div>
  )

  const sizes = Array.from(new Set(product.variants.map(v => v.size))).sort()
  const colors = Array.from(new Set(product.variants.map(v => v.color))).sort()

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative aspect-square"
      >
        <Image
          src={selectedVariant?.imageUrl || '/placeholder.jpg'}
          alt={product.name}
          fill
          className="object-cover rounded-lg"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">{product.description}</p>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-4">Size</h3>
            <div className="grid grid-cols-4 gap-2">
              {sizes.map((size) => (
                <motion.button
                  key={size}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const variant = product.variants.find(v => 
                      v.size === size && v.color === selectedVariant?.color
                    )
                    if (variant) setSelectedVariant(variant)
                  }}
                  className={`py-2 px-4 rounded-lg border transition-all ${
                    selectedVariant?.size === size
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  {size}
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-4">Color</h3>
            <div className="grid grid-cols-4 gap-2">
              {colors.map((color) => (
                <motion.button
                  key={color}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const variant = product.variants.find(v => 
                      v.color === color && v.size === selectedVariant?.size
                    )
                    if (variant) setSelectedVariant(variant)
                  }}
                  className={`py-2 px-4 rounded-lg border transition-all ${
                    selectedVariant?.color === color
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  {color}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {selectedVariant && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 space-y-6"
          >
            <div>
              <h3 className="text-sm font-medium mb-4">Quantity</h3>
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Minus className="w-4 h-4" />
                </motion.button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            <div>
              <p className="text-3xl font-bold mb-4">
                ${(selectedVariant.price * quantity).toFixed(2)}
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                  text-white rounded-lg font-medium hover:shadow-lg transition-shadow"
              >
                Add to Cart
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}