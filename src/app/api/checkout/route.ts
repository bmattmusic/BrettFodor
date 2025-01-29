// // src/app/api/checkout/route.ts
// import { NextResponse } from 'next/server'
// import Stripe from 'stripe'

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2023-10-16'
// })

// export async function POST(req: Request) {
//   try {
//     const { items } = await req.json()

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: items.map((item: any) => ({
//         price_data: {
//           currency: 'usd',
//           product_data: {
//             name: item.name,
//             images: item.image ? [item.image] : [],
//           },
//           unit_amount: Math.round(item.price * 100), // Stripe uses cents
//         },
//         quantity: item.quantity,
//       })),
//       mode: 'payment',
//       success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
//       shipping_address_collection: {
//         allowed_countries: ['US'], // Add other countries as needed
//       },
//       shipping_options: [
//         {
//           shipping_rate_data: {
//             type: 'fixed_amount',
//             fixed_amount: {
//               amount: 500, // $5.00
//               currency: 'usd',
//             },
//             display_name: 'Standard Shipping',
//             delivery_estimate: {
//               minimum: {
//                 unit: 'business_day',
//                 value: 5,
//               },
//               maximum: {
//                 unit: 'business_day',
//                 value: 7,
//               },
//             },
//           },
//         },
//       ],
//     })

//     return NextResponse.json({ url: session.url })
//   } catch (err) {
//     console.error('Stripe checkout error:', err)
//     return NextResponse.json(
//       { error: 'Error creating checkout session' },
//       { status: 500 }
//     )
//   }
// }

// src/app/api/checkout/route.ts
// src/app/api/checkout/route.ts
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined')
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16' // Fixed API version
})

export async function POST(request: Request) {
  try {
    const { items } = await request.json()
    
    console.log('Received items:', items)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 500,
              currency: 'usd',
            },
            display_name: 'Standard Shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 5,
              },
              maximum: {
                unit: 'business_day',
                value: 7,
              },
            },
          },
        },
      ],
    })

    console.log('Session created:', session.url)
    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    )
  }
}