import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(request: Request) {
  const bookings = await prisma.booking.findMany();
  return NextResponse.json(bookings, { status: 200 });
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  const formData = await request.json();
  const fakeCustomerId = "d9cf9d65f94f613ca594deda";
  const fakeBusinessId = "a2fcbf69fc1dad84d29db620";
  console.log(formData);

  // create new booking
  try {
    const newBooking = await prisma.booking.create({
      data: {
        serviceName: formData.serviceName,
        date: formData.date,
        timeSlot: formData.timeSlot,
        notes: formData.notes,
        serviceId: formData.serviceId,
        businessId: fakeBusinessId,
        customerId: fakeCustomerId,
        serviceDuration: formData.serviceDuration,
        servicePrice: formData.servicePrice,
      },
    });
    console.log("Booking created", newBooking);
    return NextResponse.json(
      { message: "Booking is successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Server error booking appointment",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
