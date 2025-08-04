import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
  BusinessOnboardingSchema,
  type BusinessFormData,
  defaultBusinessValues,
} from "@/app/onboarding/business/schema/business.schema";
import { mapPricingModelEnumToString } from "@/app/api/onboarding/business/utils";

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
      include: {
        business: {
          include: {
            coreServices: true,
          },
        },
      },
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

    const { id, userId, createdAt, updatedAt, ...formFieldsFromDb } =
      result.business;

    const transformedDataForForm = {
      businessName: formFieldsFromDb.businessName,
      contactPersonName: formFieldsFromDb.contactPersonName,
      contactPersonTitle: formFieldsFromDb.contactPersonTitle,
      contactPersonEmail: formFieldsFromDb.contactPersonEmail,
      contactPersonPhone: formFieldsFromDb.contactPersonPhone,
      businessAddressStreet: formFieldsFromDb.businessAddressStreet,
      businessAddressCity: formFieldsFromDb.businessAddressCity,
      businessAddressState: formFieldsFromDb.businessAddressState,
      businessAddressZip: formFieldsFromDb.businessAddressZip,
      businessAddressCountry: formFieldsFromDb.businessAddressCountry,
      serviceAreaRadius: formFieldsFromDb.serviceAreaRadius,
      yearsInBusiness: formFieldsFromDb.yearsInBusiness,
      businessDescription: formFieldsFromDb.businessDescription,

      coreServices: formFieldsFromDb.coreServices.map(cs => ({
        id: cs.id,
        name: cs.name,
        description: cs.description,
        durationMin: cs.durationMin,
        durationMax: cs.durationMax,
        typicalCleanersAssigned: cs.typicalCleanersAssigned,
        pricingModel: mapPricingModelEnumToString(cs.pricingModel),
        priceMin: cs.priceMin,
        priceMax: cs.priceMax,
        rate: cs.rate,
      })),

      operatingHours: formFieldsFromDb.operatingHours,

      averageTravelTimeMinutes: formFieldsFromDb.averageTravelTimeMinutes,
      currentSchedulingMethod: formFieldsFromDb.currentSchedulingMethod,

      logoUrl:
        formFieldsFromDb.logoUrl === "" ? null : formFieldsFromDb.logoUrl,
      brandColorPrimary:
        formFieldsFromDb.brandColorPrimary === ""
          ? null
          : formFieldsFromDb.brandColorPrimary,
      brandColorSecondary:
        formFieldsFromDb.brandColorSecondary === ""
          ? null
          : formFieldsFromDb.brandColorSecondary,

      preferredCustomerCommunicationMethods:
        formFieldsFromDb.preferredCustomerCommunicationMethods,
      additionalNotes: formFieldsFromDb.additionalNotes,
    };

    // I MADE TOO MANY MISTAKES IN THE SCHEMAS, I HATE THIS
    businessData = transformedDataForForm as BusinessFormData;
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
