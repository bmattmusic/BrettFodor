// src/app/api/webhook/route.ts
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    try {
      // Create Printful order
      const response = await fetch('https://api.printful.com/orders', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.PRINTFUL_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          recipient: {
            name: session.shipping_details?.name,
            address1: session.shipping_details?.address?.line1,
            city: session.shipping_details?.address?.city,
            state_code: session.shipping_details?.address?.state,
            country_code: session.shipping_details?.address?.country,
            zip: session.shipping_details?.address?.postal_code
          },
          items: session.metadata.items ? JSON.parse(session.metadata.items) : []
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create Printful order')
      }

      // You might want to store the order in your database here
      
    } catch (error) {
      console.error('Error creating Printful order:', error)
      // Note: We don't want to return an error response here as it would cause
      // Stripe to retry the webhook. Instead, log the error and handle it appropriately.
    }
  }

  return NextResponse.json({ received: true })
}