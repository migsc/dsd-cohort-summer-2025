import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { kv } from "@/lib/kv";
import {
  syncStripeDataToKV,
  type StripeOneTimeChargeCache,
} from "@/lib/stripe";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

async function ConfirmStripeSessionComponent() {
  // console.log("************/success-START************************");
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || !session.user || !session.user.id) {
    console.log(
      "Success page accessed by unauthenticated user. Redirecting to login/home."
    );
    redirect("/");
  }

  const userId = session.user.id;

  const stripeCustomerId: string | null = await kv.get(`stripe:user:${userId}`);

  if (!stripeCustomerId) {
    console.error(`No Stripe customer ID found in KV for user ${userId}.`);
    redirect("/");
  }

  let syncedData: StripeOneTimeChargeCache = { status: "none" };

  try {
    syncedData = await syncStripeDataToKV(stripeCustomerId);

    if (syncedData.status === "error" || syncedData.status === "none") {
      // console.log("no payment status.");
      redirect("/customer");
    }

    if (syncedData.status === "succeeded") {
      // console.log("payment succeded.");
      redirect("/customer");
    }

    if (syncedData.status === "processing") {
      // console.log("payment processing.");
      redirect("/customer");
    }

    if (syncedData.status === "canceled") {
      // console.log("payment canceled.");
      redirect("/customer");
    }

    return redirect("/");
  } catch (err) {
    if (isRedirectError(err)) {
      throw err;
    }
    console.log("Error during sync: ", err);

    redirect("/customer");
  }
}

export default async function Success({
  searchParams, // Passed as a Promise in Next.js 15+
}: {
  searchParams: Promise<{ stripe_session_id: string | undefined }>;
}) {
  const params = await searchParams;
  const stripeSessionId = params.stripe_session_id;

  if (!stripeSessionId) {
    console.log("Success page accessed without session_id. Redirecting.");
    redirect("/");
  }

  return (
    <div className="flex min-h-screen items-center justify-center text-2xl">
      <Suspense fallback={<div>One moment ... </div>}>
        <ConfirmStripeSessionComponent />
      </Suspense>
    </div>
  );
}
