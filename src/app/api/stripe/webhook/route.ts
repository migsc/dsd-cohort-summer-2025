// app/api/stripe/webhook/route.ts
// This is a Next.js App Router API Route. It runs on the server.

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  console.log("In the webhook");
  const body = await req.text(); // Stripe expects the raw body for signature verification
  const signature = (await headers()).get("Stripe-Signature");

  if (!signature) {
    console.error("Missing Stripe-Signature header.");
    return new NextResponse("Missing Stripe-Signature header", { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      STRIPE_WEBHOOK_SECRET
    );
  } catch (err: any) {
    console.error(`Signature verification failed: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  console.log("signature: ", signature);
}
