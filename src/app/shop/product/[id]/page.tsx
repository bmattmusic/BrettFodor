import { ProductDetails } from '@/components/shop/ProductDetails'
import { use } from 'react'

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

