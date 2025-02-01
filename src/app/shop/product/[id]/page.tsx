import { ProductDetails } from '@/components/shop/ProductDetails'
import { use } from 'react'
import { Metadata } from 'next'

interface Props {
  params: { id: string }
  searchParams: { image?: string }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const productId = params.id
  
  return (
    <div className="container mx-auto px-4 py-12">
      <ProductDetails id={productId} />
    </div>
  )
}

async function fetchProduct(id: string) {
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'http://localhost:3000';
    
  const res = await fetch(`${baseUrl}/api/printful/products/${id}`)
  if (!res.ok) throw new Error('Failed to fetch product')
  return res.json()
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await fetchProduct(params.id)

  return {
    title: product.name || 'Product Details',
    description: product.description || 'View product details and options',
    openGraph: {
      title: product.name || 'Product Details',
      description: product.description || 'View product details and options',
      images: [
        {
          url: product.image || '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: product.name || 'Product Image',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name || 'Product Details',
      description: product.description || 'View product details and options',
      images: [product.image || '/og-image.jpg'],
    },
  }
}

