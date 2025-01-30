// src/app/api/printful/products/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";

interface PrintfulFile {
  type: string;
  preview_url: string;
}

interface PrintfulVariant {
  id: number;
  name: string;
  size: string;
  color: string;
  retail_price: string;
  files: PrintfulFile[];
}

interface PrintfulSyncProduct {
  id: number;
  name: string;
  description?: string;
}

interface PrintfulAPIResponse {
  result: {
    sync_product: PrintfulSyncProduct;
    sync_variants: PrintfulVariant[];
  };
}

interface MappedVariant {
  id: number;
  name: string;
  size: string;
  color: string;
  price: number;
  imageUrl: string | null;
}

interface MappedProduct {
  id: number;
  name: string;
  description: string;
  variants: MappedVariant[];
}

const PRINTFUL_API = "https://api.printful.com";
const PRINTFUL_TOKEN = process.env.PRINTFUL_TOKEN;
const PRINTFUL_STORE_ID = process.env.PRINTFUL_STORE_ID;

interface RouteContext {
  params: {
    id: string;
  };
}

export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const response = await fetch(`${PRINTFUL_API}/store/products/${params.id}`, {
      headers: {
        'Authorization': `Bearer ${PRINTFUL_TOKEN}`,
        'X-PF-Store-Id': `${PRINTFUL_STORE_ID}`
      }
    });

    const data = await response.json() as PrintfulAPIResponse;
    
    if (data.result) {
      const baseName = data.result.sync_variants[0].name.split(' / ')[0];
      
      const product: MappedProduct = {
        id: data.result.sync_product.id,
        name: baseName,
        description: data.result.sync_product.description || '',
        variants: data.result.sync_variants.map((variant) => {
          const previewFile = variant.files.find(f => f.type === 'preview') || variant.files[0];
          
          return {
            id: variant.id,
            name: variant.name,
            size: variant.size,
            color: variant.color,
            price: parseFloat(variant.retail_price),
            imageUrl: previewFile?.preview_url || null
          };
        }),
      };
      
      return NextResponse.json(product);
    }
    
    throw new Error('Product not found');
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
  }
}