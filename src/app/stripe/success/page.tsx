import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { kv } from "@/lib/kv";
// import { syncStripeDataToKV, STRIPE_ONE_TIME_CHARGE_CACHE } from "@/lib/stripe";

export default async function Success({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || !session.user || !session.user.id) {
    console.log(
      "Success page accessed by unauthenticated user. Redirecting to login/home."
    );
    redirect("/");
  }
  const { session_id } = await (searchParams || {});
  const userId = session.user.id;
  const stripeSessionId = session_id;

  console.log("stripeSessionId: ", stripeSessionId);

  if (!stripeSessionId) {
    console.log("Success page accessed without session_id. Redirecting.");
    redirect("/");
  }

  const stripeCustomerId: string | null = await kv.get(`stripe:user:${userId}`);

  if (!stripeCustomerId) {
    console.error(`No Stripe customer ID found in KV for user ${userId}.`);
    redirect("/");
  }

  console.log("stripeCustomerId: ", stripeCustomerId);

  //   SYNC STRIPE DATA WITH KV STORE
  //   let syncedData: STRIPE_ONE_TIME_CHARGE_CACHE | null = null;
  //   try {
  //     syncedData = await syncStripeDataToKV(stripeCustomerId);

  //     if (!syncedData) {
  //       console.error(
  //         `syncStripeDataToKV returned null for customer ${stripeCustomerId}.`
  //       );
  //       redirect("/dashboard?error=payment_sync_failed");
  //     }

  //     if (syncedData.status === "succeeded") {
  //       console.log(
  //         `Payment successfully confirmed and synced for user ${userId}.`
  //       );
  //       // TODO: Update your primary database and fulfill services here.
  //       redirect("/dashboard/bookings?status=paid&session=" + stripeSessionId);
  //     } else if (
  //       syncedData.status === "processing" ||
  //       syncedData.status === "requires_action"
  //     ) {
  //       console.warn(`Payment for user ${userId} is still ${syncedData.status}.`);
  //       redirect("/dashboard/bookings?status=pending_payment");
  //     } else {
  //       console.error(
  //         `Payment for user ${userId} resulted in status: ${syncedData.status}`
  //       );
  //       redirect("/dashboard/bookings?status=failed_payment");
  //     }
  //   } catch (error) {
  //     console.error(`Error during /success page sync for user ${userId}:`, error);
  //     redirect("/dashboard?error=internal_payment_issue");
  //   }

  return <div className="text-black">Success page</div>;
}
