// // src/components/shop/ProductCard.tsx
// 'use client'

// import Image from 'next/image'
// import Link from 'next/link'
// import { useCart } from '@/hooks/useCart'

// interface ProductCardProps {
//   id: number
//   name: string
//   image: string
//   price: string
// }

// export function ProductCard({ id, name, image, price }: ProductCardProps) {
//   const cart = useCart()

//   return (
//     <div className="group overflow-hidden rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow">
//       <Link href={`/shop/product/${id}`}>
//         <div className="aspect-square relative">
//           <Image
//             src={image}
//             alt={name}
//             fill
//             className="object-cover transition-transform duration-300 group-hover:scale-105"
//           />
//         </div>
//         <div className="p-4">
//           <h3 className="font-medium text-gray-900">{name}</h3>
//           <p className="mt-1 text-sm text-gray-500">${price}</p>
//         </div>
//       </Link>
//     </div>
//   )
// }

// src/components/shop/ProductCard.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/hooks/useCart'

interface ProductCardProps {
  id: number
  name: string
  image: string
  price: string
}

export function ProductCard({ id, name, image, price }: ProductCardProps) {
  const cart = useCart()

  return (
    <Link 
      href={{
        pathname: `/shop/product/${id}`,
        query: { image }
      }}
      className="group overflow-hidden rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="aspect-square relative">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900">{name}</h3>
        <p className="mt-1 text-sm text-gray-500">${price}</p>
      </div>
    </Link>
  )
}