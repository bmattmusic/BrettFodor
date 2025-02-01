import { ProductDetails } from '@/components/shop/ProductDetails'
import { use } from 'react'
import { Metadata } from 'next'

interface Props {
  params: { id: string }
  searchParams: { image?: string }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await fetchProduct(params.id)
  
  return (
    <div className="container mx-auto px-4 py-12">
      <ProductDetails initialProduct={product} />
    </div>
  )
}

async function fetchProduct(id: string) {
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://brettfodor.com';
      
  try {
    const res = await fetch(`${baseUrl}/api/printful/products/${id}`, {
      headers: {
        'Cache-Control': 'no-cache',
        'Authorization': `Bearer ${process.env.PRINTFUL_TOKEN}`,
        'X-PF-Store-Id': `${process.env.PRINTFUL_STORE_ID}`,
      },
      next: { revalidate: 0 }
    });
    
    if (!res.ok) {
      console.error('Response status:', res.status);
      console.error('Response headers:', Object.fromEntries(res.headers.entries()));
      throw new Error(`Failed to fetch product: ${res.status} ${res.statusText}`);
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    throw new Error('Failed to fetch product');
  }
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

