import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getSessionUser() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id;
  if (!userId) throw new Error("Unauthorized");
  return userId;
}

export async function findCustomer(userId: string) {
  return prisma.customer.findUnique({ where: { userId } });
}

export async function findBusiness(userId: string) {
  return prisma.business.findUnique({ where: { userId } });
}

export async function findBusinessBySlug(businessSlug: string, userId: string) {
  return prisma.business.findFirst({
    where: {
      userId,
      businessSlug,
    },
  });
}

export async function findBusinessByService(serviceId: string) {
  return prisma.business.findFirst({
    where: {
      coreServices: {
        some: { id: serviceId },
      },
    },
  });
}

export async function findService(id: string) {
  return prisma.coreService.findUnique({ where: { id } });
}

export async function findBooking(bookingId: string) {
  return prisma.booking.findUnique({
    where: { id: bookingId },
  });
}

export async function calculatePrice(
  pricingModel: string,
  rate: number,
  duration: number,
  rooms: number,
  squareFootage: number
) {
  switch (pricingModel) {
    case "HOUR":
      return rate * duration;
    case "SQFT":
      return rate * squareFootage;
    case "ROOM":
      return rate * rooms;
    case "JOB":
      return rate;
    default:
      throw new Error("Pricing Model is not used");
  }
}
