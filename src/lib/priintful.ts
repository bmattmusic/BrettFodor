// src/lib/printful.ts
interface PrintfulProduct {
    id: number
    name: string
    variants: PrintfulVariant[]
    files: PrintfulFile[]
    sync_product: {
      id: number
      name: string
      thumbnail_url: string
    }
  }
  
  interface PrintfulVariant {
    id: number
    product_id: number
    name: string
    size: string
    color: string
    price: string
    retail_price: string
    files: PrintfulFile[]
  }
  
  interface PrintfulFile {
    id: number
    type: string
    url: string
    options: string[]
    filename: string
    mime_type: string
    size: number
    width: number
    height: number
    dpi: number
    status: string
    created: string
    thumbnail_url: string
    preview_url: string
  }
  
  // src/lib/printful.ts
export class PrintfulClient {
    private readonly baseUrl = 'https://api.printful.com'
    private readonly headers: HeadersInit
  
    constructor() {
      if (!process.env.PRINTFUL_TOKEN || !process.env.PRINTFUL_STORE_ID) {
        throw new Error('Missing Printful configuration')
      }
  
      this.headers = {
        'Authorization': `Bearer ${process.env.PRINTFUL_TOKEN}`,
        'Content-Type': 'application/json',
        'X-PF-Store-Id': process.env.PRINTFUL_STORE_ID
      }
    }
  
    async getSyncProducts(): Promise<any[]> {
      const response = await fetch(`${this.baseUrl}/store/products`, {
        headers: this.headers,
        cache: 'no-store'
      })
  
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Failed to fetch products: ${response.statusText} - ${errorText}`)
      }
  
      const data = await response.json()
      return data.result
    }
  }