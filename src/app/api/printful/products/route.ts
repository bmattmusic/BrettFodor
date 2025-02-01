import { NextRequest, NextResponse } from "next/server";

const PRINTFUL_API = "https://api.printful.com";
const PRINTFUL_TOKEN = process.env.PRINTFUL_TOKEN;
const PRINTFUL_STORE_ID = process.env.PRINTFUL_STORE_ID;

export const dynamic = 'force-dynamic'; // Disable caching
export const revalidate = 0; // Disable caching

export async function GET(request: NextRequest) {
  try {
    // Log environment variables (be careful with this in production)
    console.log('Checking env vars:', {
      hasToken: !!PRINTFUL_TOKEN,
      hasStoreId: !!PRINTFUL_STORE_ID
    });

    const response = await fetch(`${PRINTFUL_API}/store/products`, {
      headers: {
        "Authorization": `Bearer ${PRINTFUL_TOKEN}`,
        "X-PF-Store-Id": `${PRINTFUL_STORE_ID}`,
      },
      cache: 'no-store' // Disable caching
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Printful API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      throw new Error(`Printful API responded with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    
    // Log the shape of the data
    console.log('API response structure:', {
      hasResult: !!data.result,
      resultLength: data.result?.length,
      firstItem: data.result?.[0] ? Object.keys(data.result[0]) : null
    });

    if (!data.result || !Array.isArray(data.result)) {
      throw new Error(`Invalid API response structure: ${JSON.stringify(data)}`);
    }

    const products = data.result.map((item: any) => {
      // Get the sync product details which includes variants
      const syncProduct = item.sync_product || item;
      const variants = item.sync_variants || [];
      
      return {
        id: syncProduct.id,
        name: syncProduct.name,
        image: syncProduct.thumbnail_url || item.preview_url || "/assets/placeholder.png",
        variants: variants.map((variant: any) => ({
          id: variant.id,
          name: variant.name,
          size: variant.size,
          color: variant.color,
          price: parseFloat(variant.retail_price)
        })),
        price: variants[0]?.retail_price || "26.99" // Default price if no variant price available
      };
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch products from Printful",
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
