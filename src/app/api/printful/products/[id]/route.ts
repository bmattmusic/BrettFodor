import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

interface RouteSegment {
  params: { id: string }
}

export async function GET(
  _request: NextRequest,
  { params }: RouteSegment
) {
  try {
    const response = await fetch(`${process.env.PRINTFUL_API}/store/products/${params.id}`, {
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