import { NextResponse } from 'next/server';

const PRINTFUL_API = 'https://api.printful.com';
const PRINTFUL_TOKEN = process.env.PRINTFUL_TOKEN;

// Add interface for the item structure
interface OrderItem {
  variant_id: number;
  quantity: number;
}

export async function POST(req: Request) {
  try {
    const { items, shippingInfo } = await req.json();

    const orderData = {
      recipient: shippingInfo, // Customer shipping details
      items: items.map((item: OrderItem) => ({
        sync_variant_id: item.variant_id, // Printful variant ID
        quantity: item.quantity,
      })),
    };

    const res = await fetch(`${PRINTFUL_API}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${PRINTFUL_TOKEN}`, // Use the token here
      },
      body: JSON.stringify(orderData),
    });

    if (!res.ok) {
      throw new Error('Failed to create order');
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
