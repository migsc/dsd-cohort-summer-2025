import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
  BusinessOnboardingSchema,
  type BusinessFormData,
  defaultBusinessValues,
} from "@/app/onboarding/business/schema/business.schema";

import Configuration from "./Configuration";

export default async function Cofiguration() {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({ headers: requestHeaders });

  if (!session || !session.user || !session.user.id) {
    return <div>Please log in to manage your configuration</div>;
  }

  const sessionUserId = session.user.id;
  let businessData: BusinessFormData = defaultBusinessValues;

  try {
    const result = await prisma.user.findUnique({
      where: { id: sessionUserId },
      include: { business: true },
    });

    if (!result) {
      return <div>User profile not found. Please log in again.</div>;
    }

    if (!result?.business) {
      return (
        <div>
          Business profile does not exist. Please complete business onboarding.
        </div>
      );
    }

    const { id, userId, createdAt, updatedAt, ...formFields } = result.business;
    // TS ERROR. TEMP FIX.
    // const validatedData = BusinessOnboardingSchema.parse(formFields);
    businessData = formFields as BusinessFormData;
  } catch (err) {
    console.log(err);
    return <div>Error retrieving business profile.</div>;
  }

  return (
    <div>
      <Configuration initialData={businessData} />
    </div>
  );
}
