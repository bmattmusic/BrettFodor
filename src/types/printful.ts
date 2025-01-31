// src/types/printful.ts
export interface PrintfulFile {
    type: string;
    preview_url: string;
  }
  
  export interface PrintfulVariant {
    id: number;
    name: string;
    size: string;
    color: string;
    retail_price: string;
    files: PrintfulFile[];
  }
  
  export interface PrintfulSyncProduct {
    id: number;
    name: string;
    description?: string;
  }
  
  export interface PrintfulAPIResponse {
    result: {
      sync_product: PrintfulSyncProduct;
      sync_variants: PrintfulVariant[];
    };
  }
  
  export interface MappedVariant {
    id: number;
    name: string;
    size: string;
    color: string;
    price: number;
    imageUrl: string | null;
  }
  
  export interface MappedProduct {
    id: number;
    name: string;
    description: string;
    variants: MappedVariant[];
  }
  
  export interface RouteParams {
    params: { id: string }
  }