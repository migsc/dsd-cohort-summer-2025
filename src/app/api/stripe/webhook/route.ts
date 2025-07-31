// app/api/stripe/webhook/route.ts
// This is a Next.js App Router API Route. It runs on the server.

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe, syncStripeDataToKV } from "@/lib/stripe";
import { headers } from "next/headers";

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

const allowedEvents: Stripe.Event.Type[] = [
  "checkout.session.completed",
  "payment_intent.succeeded",
  "payment_intent.payment_failed",
  "payment_intent.canceled",
  "charge.succeeded",
];

function getCustomerIdFromEvent(event: Stripe.Event): string | null {
  const dataObject: any = event.data.object;

  switch (event.type) {
    case "checkout.session.completed":
      return typeof dataObject.customer === "string"
        ? dataObject.customer
        : null;
    case "payment_intent.succeeded":
    case "payment_intent.payment_failed":
    case "payment_intent.canceled":
      return typeof dataObject.customer === "string"
        ? dataObject.customer
        : null;
    case "charge.succeeded":
      return typeof dataObject.customer === "string"
        ? dataObject.customer
        : null;
    default:
      return null;
  }
}

export async function POST(req: Request) {
  // console.log("************stripe-webhook-START************************");
  const body = await req.text(); // Stripe expects the raw body for signature verification
  const signature = (await headers()).get("Stripe-Signature");

  if (!signature) {
    console.error("Missing Stripe-Signature header.");
    return NextResponse.json(
      { message: "Missing Stripe-Signature header" },
      {
        status: 400,
      }
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      STRIPE_WEBHOOK_SECRET
    );
  } catch (err: any) {
    console.error(`Signature verification failed: ${err.message}`);
    return NextResponse.json(
      { message: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  if (!allowedEvents.includes(event.type)) {
    // console.log("Not an allowed event");
    return NextResponse.json(
      { message: "Event type not handled." },
      { status: 200 }
    );
  }

  const customerId = getCustomerIdFromEvent(event);

  if (!customerId) {
    console.log("Could not determine customerId from event.");
    return NextResponse.json(
      { message: "Customer Id not found." },
      { status: 400 }
    );
  }

  // console.log(
  //   `Webhook event received: ${event.type} for customer: ${customerId}`
  // );

  try {
    await syncStripeDataToKV(customerId);

    const eventData = event.data.object as any;

    // switch (event.type) {
    //   case "payment_intent.succeeded":
    //     console.log(
    //       `[WEBHOOK ACTION] PaymentIntent succeeded for ${customerId} (ID: ${eventData.id}).`
    //     );
    //     break;

    //   case "payment_intent.payment_failed":
    //     console.warn(
    //       `[WEBHOOK ACTION] PaymentIntent failed for ${customerId} (ID: ${eventData.id}).`
    //     );
    //     break;

    //   case "checkout.session.completed":
    //     console.log(
    //       `[WEBHOOK ACTION] Checkout session completed for ${customerId} (ID: ${eventData.id}).`
    //     );
    //     break;

    //   case "payment_intent.canceled":
    //     console.log(
    //       `[WEBHOOK ACTION] PaymentIntent canceled for ${customerId} (ID: ${eventData.id}).`
    //     );
    //     break;

    //   case "charge.succeeded":
    //     console.log(
    //       `[WEBHOOK ACTION] Charge succeeded for ${customerId} (ID: ${eventData.id}).`
    //     );
    //     break;

    //   default:
    //     console.log(
    //       `[WEBHOOK ACTION] Unhandled ALLOWED_WEBHOOK_EVENT: ${event.type}`
    //     );
    //     break;
    // }
    // console.log("************stripe-webhook-START************************");
    return NextResponse.json(
      { message: "Webhook received and processed." },
      { status: 200 }
    );
  } catch (error) {}
}
