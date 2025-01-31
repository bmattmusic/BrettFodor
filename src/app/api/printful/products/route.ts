import { NextRequest, NextResponse } from "next/server";

const PRINTFUL_API = "https://api.printful.com";
const PRINTFUL_TOKEN = process.env.PRINTFUL_TOKEN;
const PRINTFUL_STORE_ID = process.env.PRINTFUL_STORE_ID;

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(`${PRINTFUL_API}/store/products`, {
      headers: {
        "Authorization": `Bearer ${PRINTFUL_TOKEN}`,
        "X-PF-Store-Id": `${PRINTFUL_STORE_ID}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Printful API responded with status ${response.status}`);
    }

    const data = await response.json();

    if (data.result) {
      const products = data.result.map((item: any) => ({
        id: item.id,
        name: item.name,
        thumbnailUrl: item.thumbnail_url || "/assets/placeholder.png",
        variants: item.sync_variants.map((variant: any) => ({
          id: variant.id,
          name: variant.name,
          size: variant.size,
          color: variant.color,
          retail_price: variant.retail_price
        }))
      }));

      return NextResponse.json(products);
    }

    throw new Error("Invalid API response structure");
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products from Printful" },
      { status: 500 }
    );
  }
}
