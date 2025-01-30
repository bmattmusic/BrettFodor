'use client'

import { useEffect, useState } from 'react'
import { ProductCard } from '@/components/shop/ProductCard'

interface Variant {
  id: number
  name: string
  size: string
  color: string
  retail_price: string
  files: Array<{
    preview_url: string
    type: string
  }>
}

interface Product {
  id: number
  name: string
  thumbnailUrl: string
  variants: Variant[]
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/printful/products')
        const data = await res.json()
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        Shop
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.thumbnailUrl}
            price={product.variants[0]?.retail_price}
            variants={product.variants.map(variant => ({
              id: variant.id.toString(),
              name: variant.name,
              size: variant.size,
              color: variant.color,
              price: parseFloat(variant.retail_price)
            }))}
          />
        ))}
      </div>
    </div>
  )
}