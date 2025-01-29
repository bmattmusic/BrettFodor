'use client'

import { useEffect, useState } from 'react'
import { ProductCard } from '@/components/shop/ProductCard'

export default function ShopPage() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch('/api/printful/products')
      if (!res.ok) throw new Error('Failed to fetch products')
      const data = await res.json()
      setProducts(data)
    }
    fetchProducts()
  }, [])

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">Shop</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.thumbnailUrl}
            price={product.retailPrice}
          />
        ))}
      </div>
    </div>
  )
}