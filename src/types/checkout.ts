// src/types/checkout.ts
export interface CartItem {
    id: string
    name: string
    price: number
    quantity: number
    image?: string
  }
  
  export interface CheckoutRequestBody {
    items: CartItem[]
  }