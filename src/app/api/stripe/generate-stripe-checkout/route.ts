import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { kv } from "@/lib/kv";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session || !session.user || !session.user.id) {
    console.log("Unauthorized");
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = session.user;
  console.log(user);

  const formData = await req.json();

  console.log("formData: ", formData);

  const origin = (await headers()).get("origin");
  console.log("origin: ", origin);

  // Get the stripeCustomerId from your KV store.
  let stripeCustomerId = await kv.get(`stripe:user:${user.id}`);

  console.log("stripeCustomer: ", stripeCustomerId);

  // Create a new Stripe customer if this user doesn't have one.
  if (!stripeCustomerId) {
    const newCustomer = await stripe.customers.create({
      email: user.email,
      metadata: {
        userId: user.id,
      },
    });

    console.log("newCustomer: ", newCustomer);

    // Store the relation between userId and stripeCustomerId in your KV
    await kv.set(`stripe:user:${user.id}`, newCustomer.id);
    stripeCustomerId = newCustomer.id;
  }

  // Create a checkout with stripeCustomerId
  const checkout = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    success_url: `${origin}/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `Cleaning Service: ${formData.serviceType}`,
            description: `Bedrooms: ${formData.bedrooms}, Addons: ${formData.addons.join(", ")}`,
          },
          unit_amount: formData.totalAmountInCents,
        },
        quantity: 1,
      },
    ],
  });

  console.log("checkout: ", checkout);

  return NextResponse.json(checkout);
}

//The Checkout Session Object
// {
//   "id": "cs_test_a11YYufWQzNY63zpQ6QSNRQhkUpVph4WRmzW0zWJO2znZKdVujZ0N0S22u",
//   "object": "checkout.session",
//   "after_expiration": null,
//   "allow_promotion_codes": null,
//   "amount_subtotal": 2198,
//   "amount_total": 2198,
//   "automatic_tax": {
//     "enabled": false,
//     "liability": null,
//     "status": null
//   },
//   "billing_address_collection": null,
//   "cancel_url": null,
//   "client_reference_id": null,
//   "consent": null,
//   "consent_collection": null,
//   "created": 1679600215,
//   "currency": "usd",
//   "custom_fields": [],
//   "custom_text": {
//     "shipping_address": null,
//     "submit": null
//   },
//   "customer": null,
//   "customer_creation": "if_required",
//   "customer_details": null,
//   "customer_email": null,
//   "expires_at": 1679686615,
//   "invoice": null,
//   "invoice_creation": {
//     "enabled": false,
//     "invoice_data": {
//       "account_tax_ids": null,
//       "custom_fields": null,
//       "description": null,
//       "footer": null,
//       "issuer": null,
//       "metadata": {},
//       "rendering_options": null
//     }
//   },
//   "livemode": false,
//   "locale": null,
//   "metadata": {},
//   "mode": "payment",
//   "payment_intent": null,
//   "payment_link": null,
//   "payment_method_collection": "always",
//   "payment_method_options": {},
//   "payment_method_types": [
//     "card"
//   ],
//   "payment_status": "unpaid",
//   "phone_number_collection": {
//     "enabled": false
//   },
//   "recovered_from": null,
//   "setup_intent": null,
//   "shipping_address_collection": null,
//   "shipping_cost": null,
//   "shipping_details": null,
//   "shipping_options": [],
//   "status": "open",
//   "submit_type": null,
//   "subscription": null,
//   "success_url": "https://example.com/success",
//   "total_details": {
//     "amount_discount": 0,
//     "amount_shipping": 0,
//     "amount_tax": 0
//   },
//   "url": "https://checkout.stripe.com/c/pay/cs_test_a11YYufWQzNY63zpQ6QSNRQhkUpVph4WRmzW0zWJO2znZKdVujZ0N0S22u#fidkdWxOYHwnPyd1blpxYHZxWjA0SDdPUW5JbmFMck1wMmx9N2BLZjFEfGRUNWhqTmJ%2FM2F8bUA2SDRySkFdUV81T1BSV0YxcWJcTUJcYW5rSzN3dzBLPUE0TzRKTTxzNFBjPWZEX1NKSkxpNTVjRjN8VHE0YicpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl"
// }
