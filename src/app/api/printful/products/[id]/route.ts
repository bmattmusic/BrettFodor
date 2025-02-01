import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(
      `https://api.printful.com/store/products/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PRINTFUL_TOKEN}`,
          "X-PF-Store-Id": `${process.env.PRINTFUL_STORE_ID}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch product");
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