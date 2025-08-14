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

export async function parseTimeSlot(timeSlot: string) {
  // string comes in as 'hh:mm [AM|PM]  - HH:MM [AM|PM]'
  const times = timeSlot.split(" - ");
  if (times.length !== 2) {
    throw new Error(`Timeslot format error: ${timeSlot}`);
  }

  const [startTimeSlot, endTimeSlot] = times;

  return { startTime: timeTo24(startTimeSlot), endTime: timeTo24(endTimeSlot) };
}

function timeTo24(time: string) {
  // time is in the 12 hour format of HH:MM [AM|PM]
  const ampm = time.includes("AM") ? "AM" : "PM";
  let [hourString, minutesString] = time.split(":");

  // convert both hour and minutes to an integer so it can be padded into a string
  let hour = parseInt(hourString, 10);
  const minutes = parseInt(minutesString, 10);

  if (hour === 12 && ampm === "AM") {
    hour = 0;
  }
  if (hour !== 12 && ampm === "PM") {
    hour += 12;
  }
  return `${String(hour).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}
