import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia'
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

const relevantEvents = new Set([
  'checkout.session.completed',     // Payment successful, fulfill order
  'checkout.session.expired',       // Session expired without payment
  'payment_intent.succeeded',       // Payment confirmed
  'payment_intent.payment_failed',  // Payment failed
  'charge.succeeded',              // Charge was successful
  'charge.failed',                 // Charge failed
  'charge.refunded',               // Refund was issued
  'customer.subscription.created',  // If you add subscriptions later
  'customer.subscription.updated',
  'customer.subscription.deleted'
]);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data.object as Stripe.Checkout.Session;
          // Handle successful checkout
          // Update order status
          // Trigger Printful fulfillment
          break;
        }
        case 'payment_intent.payment_failed': {
          const paymentIntent = event.data.object as Stripe.PaymentIntent;
          // Handle failed payment
          // Update order status
          // Notify customer
          break;
        }
        // ... handle other events
      }
    } catch (error) {
      console.error('Webhook handler failed:', error);
      return NextResponse.json(
        { error: 'Webhook handler failed' },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
} 