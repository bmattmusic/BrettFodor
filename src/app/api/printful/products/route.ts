import { NextResponse } from "next/server";

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

    const data = await response.json();
    
    if (data.result) {
      console.log("Raw Result:", data.result[0]); // Log first product raw data
      
      const products = data.result.map((item: any) => {
        console.log("Item before mapping:", item);
        
        // Extract data from result object
        const mappedProduct = {
          id: item.id,
          name: item.name,
          thumbnailUrl: item.thumbnail_url,
          retailPrice: item.sync_variants?.[0]?.retail_price ? 
            parseFloat(item.sync_variants[0].retail_price) : 26.50 // Default price for testing
        };
        
        console.log("Mapped product:", mappedProduct);
        return mappedProduct;
      });

      console.log("Final products array:", products);
      return NextResponse.json(products);
    }
    
    throw new Error('Invalid API response structure');
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
// import { NextRequest, NextResponse } from 'next/server';

// const PRINTFUL_API = 'https://api.printful.com';
// const PRINTFUL_TOKEN = process.env.PRINTFUL_TOKEN;
// const PRINTFUL_STORE_ID = process.env.PRINTFUL_STORE_ID;

// export async function GET() {
//   try {
//     const res = await fetch(`${PRINTFUL_API}/store/products`, {
//       headers: {
//         Authorization: `Bearer ${PRINTFUL_TOKEN}`,
//         'X-PF-Store-Id': PRINTFUL_STORE_ID, // Include store ID here
//       },
//     });

//     if (!res.ok) {
//       throw new Error('Failed to fetch products from Printful');
//     }

//     const data = await res.json();

//     const products = data.result.map((product: any) => ({
//       id: product.id,
//       name: product.name,
//       thumbnailUrl: product.thumbnail_url,
//       retailPrice: product.sync_variants?.[0]?.retail_price
//         ? parseFloat(product.sync_variants[0].retail_price)
//         : 0.0, // Fallback price if not available
//     }));

//     return NextResponse.json(products);
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
