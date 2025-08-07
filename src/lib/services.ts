import prisma from "./prisma";

export interface ServiceData {
  id: string;
  name: string;
  description: string;
  durationMin: number;
  durationMax: number;
  priceMin: number;
  priceMax: number;
  pricingModel: string;
}

export interface BusinessWithServices {
  businessName: string;
  businessDescription: string;
  services: ServiceData[];
}

// get business name, description, and services from DB
export async function getBusinessWithServices(
  businessId: string
): Promise<BusinessWithServices | null> {
  const business = await prisma.business.findUnique({
    where: { id: businessId },
    select: {
      businessName: true,
      businessDescription: true,
      coreServices: true,
    },
  });

  if (!business) {
    return null;
  }

  return {
    businessName: business.businessName,
    businessDescription: business.businessDescription,
    services: business.coreServices.map(service => ({
      id: service.id,
      name: service.name,
      description: service.description,
      durationMin: service.durationMin,
      durationMax: service.durationMax,
      priceMin: service.priceMin,
      priceMax: service.priceMax,
      pricingModel: service.pricingModel,
    })),
  };
}
