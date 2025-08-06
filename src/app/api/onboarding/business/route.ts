import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import type { BusinessFormData } from "@/app/onboarding/business/schema/business.schema";
import { mapPricingModelStringToEnum, slugify } from "./utils";

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  const formData: BusinessFormData = await request.json();

  if (!session || !session.user || !session.user.id) {
    console.log("Unauthorized");
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const result = await prisma.$transaction(async tx => {
      // Update the User's role to 'business'
      await tx.user.update({
        where: { id: userId },
        data: { role: "business" },
      });

      // Create the business profile
      const newBusiness = await tx.business.create({
        data: {
          userId: userId,
          businessName: formData.businessName,
          businessSlug: slugify(formData.businessName),
          contactPersonName: formData.contactPersonName,
          contactPersonTitle: formData.contactPersonTitle,
          contactPersonEmail: formData.contactPersonEmail,
          contactPersonPhone: formData.contactPersonPhone,
          businessAddressStreet: formData.businessAddressStreet,
          businessAddressCity: formData.businessAddressCity,
          businessAddressState: formData.businessAddressState,
          businessAddressZip: formData.businessAddressZip,
          businessAddressCountry: formData.businessAddressCountry,
          serviceAreaRadius: formData.serviceAreaRadius,
          yearsInBusiness: formData.yearsInBusiness,
          businessDescription: formData.businessDescription,

          operatingHours: {
            monday: formData.operatingHours.monday,
            tuesday: formData.operatingHours.tuesday,
            wednesday: formData.operatingHours.wednesday,
            thursday: formData.operatingHours.thursday,
            friday: formData.operatingHours.friday,
            saturday: formData.operatingHours.saturday,
            sunday: formData.operatingHours.sunday,
          },

          averageTravelTimeMinutes: formData.averageTravelTimeMinutes,
          currentSchedulingMethod: formData.currentSchedulingMethod,
          logoUrl: formData.logoUrl,
          brandColorPrimary: formData.brandColorPrimary,
          brandColorSecondary: formData.brandColorSecondary,
          preferredCustomerCommunicationMethods:
            formData.preferredCustomerCommunicationMethods,
          additionalNotes: formData.additionalNotes,
        },
      });

      // Create associated core services record
      if (formData.coreServices && formData.coreServices.length > 0) {
        // Prepare data for CoreService creation
        const coreServicesData = formData.coreServices.map(service => ({
          businessId: newBusiness.id,
          name: service.name,
          description: service.description,
          durationMin: service.durationMin,
          durationMax: service.durationMax,
          typicalCleanersAssigned: service.typicalCleanersAssigned,
          pricingModel: mapPricingModelStringToEnum(service.pricingModel), // Map the front end display strings to the pricing model enum
          priceMin: service.priceMin,
          priceMax: service.priceMax,
          rate: service.rate,
        }));

        // Attempt to create many core services
        await tx.coreService.createMany({
          data: coreServicesData,
        });
      }

      return newBusiness;
    });

    return NextResponse.json(
      { message: "Business onboarding successful." },
      { status: 200 }
    );
  } catch (err) {
    console.log("Error: ", err);
    return NextResponse.json(
      {
        message: "Server error processing business onboarding.",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
