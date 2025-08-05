import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function GET() {
  // Test stripe
  try {
    const customers = await stripe.customers.list();
    console.log("Stripe customers: ", customers);

    return NextResponse.json({
      status: "success",
    });
  } catch (error: any) {
    console.error("Stripe API call failed:", error.message);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to initialize Stripe client or make API call.",
      },
      { status: 500 }
    );
  }
}
