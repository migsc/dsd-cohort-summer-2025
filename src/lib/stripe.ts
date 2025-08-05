import Stripe from "stripe";
import { kv } from "./kv";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error(
    "Missing STRIPE_SECRET_KEY environment variable. Please check your .env.local file."
  );
}

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-06-30.basil",
  typescript: true,
});

export type StripeOneTimeChargeCache =
  | {
      paymentIntentId: string;
      status: Stripe.PaymentIntent.Status;
      amountCaptured: number;
      currency: string;
      customerEmail?: string | null;
      receiptUrl?: string | null;
    }
  | {
      status: "none" | "error";
    };

export async function syncStripeDataToKV(customerId: string) {
  try {
    // Fetch latest payment data from Stripe
    const customer = await stripe.customers.retrieve(customerId);

    if (!customer || customer.deleted) {
      console.log("Customer not found or deleted.");
      const chargeData: StripeOneTimeChargeCache = { status: "none" };
      await kv.set(`stripe:customer:${customerId}`, JSON.stringify(chargeData));
      return chargeData;
    }

    const paymentIntents = await stripe.paymentIntents.list({
      customer: customerId,
      limit: 1,
      expand: ["data.latest_charge"],
    });

    if (paymentIntents.data.length === 0) {
      console.log("No recent payment intents found for customer.");
      const chargeData: StripeOneTimeChargeCache = { status: "none" };
      await kv.set(`stripe:customer:${customerId}`, JSON.stringify(chargeData));
      return chargeData;
    }

    const latestPaymentIntent = paymentIntents.data[0];

    const latestCharge =
      latestPaymentIntent.latest_charge &&
      typeof latestPaymentIntent.latest_charge !== "string"
        ? latestPaymentIntent.latest_charge
        : null;

    const chargeData: StripeOneTimeChargeCache = {
      paymentIntentId: latestPaymentIntent.id,
      status: latestPaymentIntent.status,
      amountCaptured: latestPaymentIntent.amount_received,
      currency: latestPaymentIntent.currency,
      customerEmail: customer.email,
      receiptUrl: latestCharge?.receipt_url ?? null,
    };

    await kv.set(`stripe:customer:${customerId}`, JSON.stringify(chargeData));
    console.log("Synced data for customer.");
    return chargeData;
  } catch (err) {
    console.log("Error syncing data for customer.");
    const errorData: StripeOneTimeChargeCache = { status: "error" };
    await kv.set(`stripe:customer:${customerId}`, JSON.stringify(errorData));
    return errorData;
  }
}
