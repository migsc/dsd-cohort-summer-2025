import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function findCustomer(userId: string) {
  return prisma.customer.findUnique({
    where: { userId },
  });
}

async function findBusiness(userId: string) {
  return prisma.business.findUnique({
    where: { userId },
  });
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  const body = await request.json();

  // only expect bookingId
  const { bookingId } = body;

  if (!session || !session.user || !session.user.id) {
    console.log("Unauthorized");
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // get business tied to booking
  const business = await prisma.business.findFirst({
    where: {
      coreServices: {
        some: { id: bookingId },
      },
    },
  });

  if (!business) {
    return NextResponse.json(
      { message: "Business not found" },
      { status: 404 }
    );
  }

  //   if (!customer) {
  //     return NextResponse.json(
  //       { message: "Customer not found" },
  //       { status: 404 }
  //     );
  //   }

  //   // create new booking
  //   try {
  //     const newBooking = await prisma.booking.create({
  //       data: {
  //         date: formData.date,
  //         startTime: formData.startTime,
  //         endTime: formData.endTime,
  //         notes: formData.notes,
  //         serviceId: formData.serviceId,
  //         businessId: business.id,
  //         customerId: customer.id,
  //         price: formData.price,
  //         rooms: formData.rooms,
  //         squareFootage: formData.squareFootage,
  //         status: "PENDING",
  //         duration: formData.serviceDuration,
  //       },
  //     });
  //     console.log("Booking created", newBooking);
  //     return NextResponse.json(
  //       { message: "Booking is successful" },
  //       { status: 200 }
  //     );
  //   } catch (error) {
  //     console.error(error);
  //     return NextResponse.json(
  //       {
  //         message: "Server error booking appointment",
  //       },
  //       { status: 500 }
  //     );
  //   } finally {
  //     await prisma.$disconnect();
  //   }
}
