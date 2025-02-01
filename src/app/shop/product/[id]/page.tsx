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
      <ProductDetails 
        id={params.id}
        initialProduct={product} 
      />
    </div>
  )
}

async function fetchProduct(id: string) {
  const baseUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://brettfodor.com';  // Use your actual domain
      
  try {
    const res = await fetch(`${baseUrl}/api/printful/products/${id}`, {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('API response:', {
        status: res.status,
        text: errorText.substring(0, 200) // Only log first 200 chars
      });
      throw new Error(`Failed to fetch product: ${res.status}`);
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

