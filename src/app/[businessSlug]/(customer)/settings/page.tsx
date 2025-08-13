import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import Settings from "./Settings.";

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || !session.user || !session.user.id) {
    return <div>Please log in to manage you settings.</div>;
  }

  const userId = session.user.id;
  let customerData;

  try {
    const result = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        customer: true,
      },
    });

    if (!result) {
      return <div>User profile not found. Please log in again.</div>;
    }

    if (!result?.customer) {
      return (
        <div>
          Customer profile does not exist. Please complete customer onboarding.
        </div>
      );
    }

    customerData = result.customer;
  } catch (error) {
    console.log(error);
    return <div>Error retriving customer settings.</div>;
  }

  return (
    <div className="px-20">
      <Settings initialData={customerData} />
    </div>
  );
}
