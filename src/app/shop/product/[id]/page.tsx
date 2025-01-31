import { ProductDetails } from '@/components/shop/ProductDetails'
import { use } from 'react'
import { Metadata } from 'next'

interface Props {
  params: { id: string }
  searchParams: { image?: string }
}

export default function ProductPage({ params, searchParams }: Props) {
  const productId = use(Promise.resolve(params.id))
  const imageUrl = use(Promise.resolve(searchParams.image))

  return (
    <div className="container mx-auto px-4 py-12">
      <ProductDetails id={productId} />
    </div>
  )
}

async function fetchProduct(id: string) {
  const res = await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/printful/products/${id}`)
  if (!res.ok) throw new Error('Failed to fetch product')
  return res.json()
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // Fetch product data
  const product = await fetchProduct(params.id) // You'll need to implement this

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  }
}

