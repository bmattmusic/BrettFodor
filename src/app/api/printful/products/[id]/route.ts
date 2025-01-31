import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const response = await fetch(`${process.env.PRINTFUL_API}/store/products/${context.params.id}`, {
      headers: {
        'Authorization': `Bearer ${process.env.PRINTFUL_TOKEN}`,
        'X-PF-Store-Id': `${process.env.PRINTFUL_STORE_ID}`
      }
    })

    const data = await response.json()
    return NextResponse.json(data.result)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}