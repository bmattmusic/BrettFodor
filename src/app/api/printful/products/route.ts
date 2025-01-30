// src/app/api/printful/products/route.ts
import { NextResponse } from "next/server";

interface PrintfulSyncVariant {
  retail_price: string;
}

interface PrintfulProduct {
  id: number;
  name: string;
  thumbnail_url: string;
  sync_variants: PrintfulSyncVariant[];
}

interface PrintfulAPIResponse {
  result: PrintfulProduct[];
}

interface MappedProduct {
  id: number;
  name: string;
  thumbnailUrl: string;
  retailPrice: number;
}

const PRINTFUL_API = "https://api.printful.com";
const PRINTFUL_TOKEN = process.env.PRINTFUL_TOKEN;
const PRINTFUL_STORE_ID = process.env.PRINTFUL_STORE_ID;

export async function GET() {
  try {
    const response = await fetch(`${PRINTFUL_API}/store/products`, {
      headers: {
        'Authorization': `Bearer ${PRINTFUL_TOKEN}`,
        'X-PF-Store-Id': `${PRINTFUL_STORE_ID}`
      }
    });

    const data = await response.json() as PrintfulAPIResponse;
    
    if (data.result) {
      const products: MappedProduct[] = data.result.map((item) => ({
        id: item.id,
        name: item.name,
        thumbnailUrl: item.thumbnail_url,
        retailPrice: item.sync_variants?.[0]?.retail_price ? 
          parseFloat(item.sync_variants[0].retail_price) : 26.50
      }));

      return NextResponse.json(products);
    }
    
    throw new Error('Invalid API response structure');
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
  }
}