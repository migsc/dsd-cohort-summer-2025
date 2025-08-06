import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import type { BusinessFormData } from "@/app/onboarding/business/schema/business.schema";
import {
  mapPricingModelStringToEnum,
  slugify,
} from "../../onboarding/business/utils";

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  const formData: BusinessFormData = await request.json();

  if (!session || !session.user || !session.user.id) {
    console.log("Unauthorized");
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const {
      coreServices: clientCoreServices,
      operatingHours,
      businessName,
      preferredCustomerCommunicationMethods,
      ...restOfFormData
    } = formData;

    const newBusinessSlug = businessName ? slugify(businessName) : undefined;

    await prisma.$transaction(async tx => {
      const updatedBusiness = await tx.business.update({
        where: { userId: userId },
        data: {
          ...restOfFormData,
          businessName: businessName,
          operatingHours: operatingHours,
          ...(newBusinessSlug && { businessSlug: newBusinessSlug }),
          preferredCustomerCommunicationMethods:
            preferredCustomerCommunicationMethods,
        },
      });
      console.log(`Business with ID ${updatedBusiness.id} updated.`);

      // 2. Process CoreServices: Update existing, Create new
      const incomingValidObjectIds = new Set<string>();
      const coreServiceOperations = [];

      for (const clientService of clientCoreServices) {
        // Prepare the common data payload for both create and update
        const serviceData = {
          name: clientService.name,
          description: clientService.description,
          durationMin: clientService.durationMin,
          durationMax: clientService.durationMax,
          typicalCleanersAssigned: clientService.typicalCleanersAssigned,
          pricingModel: mapPricingModelStringToEnum(clientService.pricingModel),
          priceMin: clientService.priceMin,
          priceMax: clientService.priceMax,
          rate: clientService.rate,
        };

        if (clientService.id) {
          // Simply check if an ID exists at all
          incomingValidObjectIds.add(clientService.id);
          coreServiceOperations.push(
            tx.coreService.update({
              where: { id: clientService.id },
              data: serviceData,
            })
          );
        } else {
          // New service, let Prisma assign a UUID via @default(uuid())
          coreServiceOperations.push(
            tx.coreService.create({
              data: {
                ...serviceData,
                business: { connect: { id: updatedBusiness.id } },
              },
            })
          );
        }
      }

      // 3. Handle deletion of services NOT in the incoming formData
      const currentCoreServices = await tx.coreService.findMany({
        where: { businessId: updatedBusiness.id },
        select: { id: true },
      });

      const currentServiceIds = new Set(currentCoreServices.map(s => s.id));

      const servicesToDelete = Array.from(currentServiceIds).filter(
        id => !incomingValidObjectIds.has(id)
      );

      if (servicesToDelete.length > 0) {
        coreServiceOperations.push(
          tx.coreService.deleteMany({
            where: {
              id: { in: servicesToDelete },
              businessId: updatedBusiness.id,
            },
          })
        );
      }

      await Promise.all(coreServiceOperations);
      console.log("Core services updated/created/deleted.");
    });

    console.log("Business configuration update successful.");
    return NextResponse.json(
      {
        message: "Business configuration update successful.",
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error(
      "Server error processing business configuration update:",
      err
    );
    return NextResponse.json(
      {
        message: "Server error processing business configuration update.",
        error: err.message || "An unknown error occurred.",
      },
      { status: 500 }
    );
  }
}
