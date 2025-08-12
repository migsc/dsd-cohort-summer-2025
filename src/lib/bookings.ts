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

export async function findService(id: string | undefined) {
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

export async function parseTimeSlot(timeslot: string) {
  const m = timeslot?.match(
    /^\s*(\d{1,2}:\d{2}\s*[AP]M)\s*-\s*(\d{1,2}:\d{2}\s*[AP]M)\s*$/i
  );
  if (!m) throw new Error("Invalid timeSlot format");
  const to24 = (t: string) => {
    const [time, ap] = t.trim().toUpperCase().split(/\s+/);
    let [h, m] = time.split(":").map(Number);
    if (ap === "PM" && h !== 12) h += 12;
    if (ap === "AM" && h === 12) h = 0;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  };
  return { startTime: to24(m[1]), endTime: to24(m[2]) };
}
