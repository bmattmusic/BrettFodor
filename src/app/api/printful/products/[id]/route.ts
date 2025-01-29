// src/app/api/printful/products/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";

const PRINTFUL_API = "https://api.printful.com";
const PRINTFUL_TOKEN = process.env.PRINTFUL_TOKEN;
const PRINTFUL_STORE_ID = process.env.PRINTFUL_STORE_ID;

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    
    const response = await fetch(`${PRINTFUL_API}/store/products/${id}`, {
      headers: {
        'Authorization': `Bearer ${PRINTFUL_TOKEN}`,
        'X-PF-Store-Id': `${PRINTFUL_STORE_ID}`
      }
    });

    const data = await response.json();
    
    if (data.result) {
      // Get the base product name by removing size and color from any variant
      const baseName = data.result.sync_variants[0].name.split(' / ')[0];
      
      const product = {
        id: data.result.sync_product.id,
        name: baseName,
        description: data.result.sync_product.description || '',
        variants: data.result.sync_variants?.map((variant: any) => {
          // Find the preview image for this variant
          const previewFile = variant.files.find((f: any) => f.type === 'preview') || variant.files[0];
          
          return {
            id: variant.id,
            name: variant.name,
            size: variant.size,
            color: variant.color,
            price: parseFloat(variant.retail_price),
            imageUrl: previewFile?.preview_url || null
          }
        }) || [],
      };
      
      return NextResponse.json(product);
    }
    
    throw new Error('Product not found');
  } catch (error: any) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}