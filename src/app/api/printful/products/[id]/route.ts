import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { type RouteParams, type PrintfulAPIResponse, type MappedProduct } from '@/types/printful'

const PRINTFUL_API = "https://api.printful.com"
const PRINTFUL_TOKEN = process.env.PRINTFUL_TOKEN
const PRINTFUL_STORE_ID = process.env.PRINTFUL_STORE_ID

export async function GET(
  _request: NextRequest,
  { params }: RouteParams
) {
  try {
    const response = await fetch(`${PRINTFUL_API}/store/products/${params.id}`, {
      headers: {
        'Authorization': `Bearer ${PRINTFUL_TOKEN}`,
        'X-PF-Store-Id': `${PRINTFUL_STORE_ID}`
      }
    })

    const data = await response.json() as PrintfulAPIResponse
    
    if (data.result) {
      const baseName = data.result.sync_variants[0].name.split(' / ')[0]
      
      const product: MappedProduct = {
        id: data.result.sync_product.id,
        name: baseName,
        description: data.result.sync_product.description || '',
        variants: data.result.sync_variants.map((variant) => {
          const previewFile = variant.files.find(f => f.type === 'preview') || variant.files[0]
          
          return {
            id: variant.id,
            name: variant.name,
            size: variant.size,
            color: variant.color,
            price: parseFloat(variant.retail_price),
            imageUrl: previewFile?.preview_url || null
          }
        }),
      }
      
      return NextResponse.json(product)
    }
    
    throw new Error('Product not found')
  } catch {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}