// src/app/shop/product/[id]/page.tsx
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
      <ProductDetails id={productId} imageUrl={imageUrl} />
    </div>
  )
}

// 'use client'

// import { useEffect, useState, use } from 'react'
// import Image from 'next/image'
// import { useCart } from '@/hooks/useCart'
// import { useSearchParams } from 'next/navigation'

// interface ProductVariant {
//   id: number
//   name: string
//   size: string
//   color: string
//   price: number
// }

// interface Product {
//   id: number
//   name: string
//   description: string
//   variants: ProductVariant[]
// }

// export default function ProductPage({ params }: { params: { id: string } }) {
//   const productId = use(Promise.resolve(params.id))
//   const searchParams = useSearchParams()
//   const imageUrl = searchParams.get('image')
//   const [product, setProduct] = useState<Product | null>(null)
//   const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
//   const cart = useCart()

//   useEffect(() => {
//     async function fetchProduct() {
//       const res = await fetch(`/api/printful/products/${productId}`)
//       const data = await res.json()
//       setProduct(data)
//       if (data.variants.length > 0) {
//         setSelectedVariant(data.variants[0])
//       }
//     }
//     fetchProduct()
//   }, [productId])

//   if (!product) return <div>Loading...</div>

//   const sizes = Array.from(new Set(product.variants.map(v => v.size))).sort()
//   const colors = Array.from(new Set(product.variants.map(v => v.color))).sort()

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <div className="grid md:grid-cols-2 gap-8">
//         <div className="relative aspect-square">
//           <Image
//             src={imageUrl || '/placeholder.jpg'}
//             alt={product.name || 'Product Image'}
//             fill
//             className="object-cover rounded-lg"
//           />
//         </div>

//         <div>
//           <h1 className="text-3xl font-bold">{product.name}</h1>
//           <p className="mt-4 text-gray-600">{product.description}</p>

//           <div className="mt-8">
//             <h3 className="text-sm font-medium mb-4">Size</h3>
//             <div className="grid grid-cols-4 gap-2">
//               {sizes.map((size) => (
//                 <button
//                   key={size}
//                   onClick={() => {
//                     const variant = product.variants.find(v => 
//                       v.size === size && v.color === selectedVariant?.color
//                     )
//                     if (variant) setSelectedVariant(variant)
//                   }}
//                   className={`py-2 px-4 rounded border ${
//                     selectedVariant?.size === size
//                       ? 'border-blue-500 bg-blue-50'
//                       : 'border-gray-200 hover:border-gray-300'
//                   }`}
//                 >
//                   {size}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="mt-6">
//             <h3 className="text-sm font-medium mb-4">Color</h3>
//             <div className="grid grid-cols-4 gap-2">
//               {colors.map((color) => (
//                 <button
//                   key={color}
//                   onClick={() => {
//                     const variant = product.variants.find(v => 
//                       v.color === color && v.size === selectedVariant?.size
//                     )
//                     if (variant) setSelectedVariant(variant)
//                   }}
//                   className={`py-2 px-4 rounded border ${
//                     selectedVariant?.color === color
//                       ? 'border-blue-500 bg-blue-50'
//                       : 'border-gray-200 hover:border-gray-300'
//                   }`}
//                 >
//                   {color}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {selectedVariant && (
//             <div className="mt-8">
//               <p className="text-2xl font-bold">${selectedVariant.price.toFixed(2)}</p>
//               <button
//                 onClick={() => {
//                   cart.addItem({
//                     id: selectedVariant.id.toString(),
//                     name: `${product.name} - ${selectedVariant.size} ${selectedVariant.color}`,
//                     price: selectedVariant.price,
//                     quantity: 1,
//                     image: imageUrl || '/placeholder.jpg'
//                   })
//                 }}
//                 className="mt-4 w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
//               >
//                 Add to Cart
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// 'use client'

// import { useEffect, useState } from 'react'
// import Image from 'next/image'
// import { useCart } from '@/hooks/useCart'
// import { useSearchParams } from 'next/navigation'

// interface ProductVariant {
//   id: number
//   name: string
//   size: string
//   color: string
//   price: number
// }

// interface Product {
//   id: number
//   name: string
//   description: string
//   variants: ProductVariant[]
// }

// export default function ProductPage({ params }: { params: { id: string } }) {
//   const searchParams = useSearchParams()
//   const imageUrl = searchParams.get('image')
//   const [product, setProduct] = useState<Product | null>(null)
//   const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
//   const cart = useCart()

//   useEffect(() => {
//     async function fetchProduct() {
//       const res = await fetch(`/api/printful/products/${params.id}`)
//       const data = await res.json()
//       setProduct(data)
//       if (data.variants.length > 0) {
//         setSelectedVariant(data.variants[0])
//       }
//     }
//     fetchProduct()
//   }, [params.id])

//   if (!product) return <div>Loading...</div>

//   const sizes = Array.from(new Set(product.variants.map(v => v.size)))
//   const colors = Array.from(new Set(product.variants.map(v => v.color)))

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <div className="grid md:grid-cols-2 gap-8">
//         <div className="relative aspect-square">
//           <Image
//             src={imageUrl || '/api/placeholder/400/400'}
//             alt={product.name || 'Product Image'}
//             fill
//             className="object-cover rounded-lg"
//           />
//         </div>

//         <div>
//           <h1 className="text-3xl font-bold">{product.name}</h1>
//           <p className="mt-4 text-gray-600">{product.description}</p>

//           <div className="mt-8">
//             <h3 className="text-sm font-medium mb-4">Size</h3>
//             <div className="grid grid-cols-4 gap-2">
//               {sizes.map((size) => (
//                 <button
//                   key={size}
//                   onClick={() => {
//                     const variant = product.variants.find(
//                       (v) => v.size === size && v.color === selectedVariant?.color
//                     );
//                     if (variant) setSelectedVariant(variant);
//                   }}
//                   className={`py-2 px-4 rounded border ${
//                     selectedVariant?.size === size
//                       ? 'border-blue-500 bg-blue-50'
//                       : 'border-gray-200 hover:border-gray-300'
//                   }`}
//                 >
//                   {size}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="mt-6">
//             <h3 className="text-sm font-medium mb-4">Color</h3>
//             <div className="grid grid-cols-4 gap-2">
//               {colors.map((color) => (
//                 <button
//                   key={color}
//                   onClick={() => {
//                     const variant = product.variants.find(
//                       (v) => v.color === color && v.size === selectedVariant?.size
//                     );
//                     if (variant) setSelectedVariant(variant);
//                   }}
//                   className={`py-2 px-4 rounded border ${
//                     selectedVariant?.color === color
//                       ? 'border-blue-500 bg-blue-50'
//                       : 'border-gray-200 hover:border-gray-300'
//                   }`}
//                 >
//                   {color}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {selectedVariant && (
//             <div className="mt-8">
//               <p className="text-2xl font-bold">${selectedVariant.price.toFixed(2)}</p>
//               <button
//                 onClick={() => {
//                   cart.addItem({
//                     id: selectedVariant.id.toString(),
//                     name: `${product.name} - ${selectedVariant.size} ${selectedVariant.color}`,
//                     price: selectedVariant.price,
//                     quantity: 1,
//                     image: product.thumbnailUrl,
//                   });
//                 }}
//                 className="mt-4 w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
//               >
//                 Add to Cart
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
// import Image from 'next/image';

// interface ProductVariant {
//   id: number;
//   name: string;
//   size: string;
//   color: string;
//   price: number;
// }

// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   thumbnailUrl: string;
//   variants: ProductVariant[];
// }

// export default async function ProductPage({ params }: { params: { id: string } }) {
//   // Fetch product data on the server
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/printful/products/${params.id}`, {
//     cache: 'no-store', // Always fetch fresh data
//   });

//   if (!res.ok) {
//     throw new Error('Failed to fetch product data');
//   }

//   const product: Product = await res.json();

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <div className="grid md:grid-cols-2 gap-8">
//         <div className="relative aspect-square">
//           <Image
//             src={product.thumbnailUrl}
//             alt={product.name}
//             fill
//             className="object-cover rounded-lg"
//           />
//         </div>
//         <div>
//           <h1 className="text-3xl font-bold">{product.name}</h1>
//           <p className="mt-4 text-gray-600">{product.description}</p>
//         </div>
//       </div>
//     </div>
//   );
// }
