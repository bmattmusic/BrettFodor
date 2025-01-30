import { type NextRequest, NextResponse } from "next/server";

type RouteSegment = {
  params: {
    id: string;
  };
};

// ✅ Printful API Constants
const PRINTFUL_API = "https://api.printful.com";
const PRINTFUL_TOKEN = process.env.PRINTFUL_TOKEN;
const PRINTFUL_STORE_ID = process.env.PRINTFUL_STORE_ID;

// ✅ Interfaces for API response structure
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

// ✅ API Route Handler
export async function GET(
  request: NextRequest, 
  context: RouteSegment
) {
  try {
    // Extract product ID from route params
    const productId = context.params.id;

    if (!productId) {
      return NextResponse.json({ error: "Missing product ID" }, { status: 400 });
    }

    // Fetch product details from Printful
    const response = await fetch(`${PRINTFUL_API}/store/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${PRINTFUL_TOKEN}`,
        "X-PF-Store-Id": `${PRINTFUL_STORE_ID}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Printful API request failed with status: ${response.status}`);
    }

    const data = await response.json() as PrintfulAPIResponse;

    if (!data.result) {
      throw new Error("Invalid API response structure");
    }

    // Extract base product details
    const baseName = data.result.sync_variants[0]?.name.split(" / ")[0] || "Unknown Product";

    // Map API response to cleaner structure
    const product: MappedProduct = {
      id: data.result.sync_product.id,
      name: baseName,
      description: data.result.sync_product.description || "",
      variants: data.result.sync_variants.map((variant) => {
        const previewFile = variant.files.find(f => f.type === "preview") || variant.files[0];

        return {
          id: variant.id,
          name: variant.name,
          size: variant.size,
          color: variant.color,
          price: parseFloat(variant.retail_price),
          imageUrl: previewFile?.preview_url || null,
        };
      }),
    };

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error occurred" },
      { status: 500 }
    );
  }
}
