import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

type CoreServiceType = {
  name: string;
  description: string;
  durationMin: number;
  durationMax: number;
  typicalCleanersAssigned: number;
  pricingModel: string;
  priceMin: number;
  priceMax: number;
  id?: string;
};

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  const formData = await request.json();

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

          coreServices: formData.coreServices.map(
            (service: CoreServiceType) => ({
              name: service.name,
              description: service.description,
              durationMin: service.durationMin,
              durationMax: service.durationMax,
              typicalCleanersAssigned: service.typicalCleanersAssigned,
              pricingModel: service.pricingModel,
              priceMin: service.priceMin,
              priceMax: service.priceMax,
              id: service.id || undefined,
            })
          ),

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
      return newBusiness;
    });

    console.log("Business done for user: ", userId);
    return NextResponse.json(
      { message: "Business onboarding successful" },
      { status: 200 }
    );
  } catch (err) {
    console.log("Error: ", err);
    return NextResponse.json(
      {
        message: "Server error processing business onboarding",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
