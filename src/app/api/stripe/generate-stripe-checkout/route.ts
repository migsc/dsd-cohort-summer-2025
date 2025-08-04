import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { kv } from "@/lib/kv";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

export async function POST(req: Request) {
  // console.log(
  //   "************generate-stripe-checkout-START************************"
  // );
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session || !session.user || !session.user.id) {
    console.log("Unauthorized");
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = session.user;

  const formData = await req.json();

  const origin = (await headers()).get("origin");
  console.log("origin: ", origin);

  // Get the stripeCustomerId from your KV store.
  let stripeCustomerId = await kv.get(`stripe:user:${user.id}`);

  // Create a new Stripe customer if this user doesn't have one.
  if (!stripeCustomerId) {
    const newCustomer = await stripe.customers.create({
      email: user.email,
      metadata: {
        userId: user.id,
      },
    });

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

  // console.log(
  //   "************generate-stripe-checkout-END************************"
  // );

  return NextResponse.json({ url: checkout.url });
}
