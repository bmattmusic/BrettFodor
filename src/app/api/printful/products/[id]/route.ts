import { NextResponse } from "next/server";

const PRINTFUL_API = "https://api.printful.com";
const PRINTFUL_TOKEN = process.env.PRINTFUL_TOKEN;
const PRINTFUL_STORE_ID = process.env.PRINTFUL_STORE_ID;

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(
      `${PRINTFUL_API}/store/products/${params.id}`,
      {
        headers: {
          'Authorization': `Bearer ${PRINTFUL_TOKEN}`,
          'X-PF-Store-Id': `${PRINTFUL_STORE_ID}`,
        },
        next: { revalidate: 0 }
      }
    );

    if (!response.ok) {
      throw new Error(`Printful API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.result?.sync_product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }
    
    // Transform the data to match ProductDetails interface
    const product = {
      id: data.result.sync_product.id,
      name: data.result.sync_product.name,
      description: data.result.sync_product.description || "No description available",
      variants: (data.result.sync_variants || []).map((variant: any) => ({
        id: variant.id,
        name: variant.name,
        size: variant.size || 'One Size',
        color: variant.color || 'Default',
        price: parseFloat(variant.retail_price || '0'),
        imageUrl: variant.files?.find((f: any) => f.type === "preview")?.preview_url 
          || variant.files?.[0]?.preview_url 
          || '/placeholder.jpg'
      }))
    };

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product details" },
      { status: 500 }
    );
  }
}