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

export async function GET(request, { params }) {
  const { businessSlug } = params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Use the slug
  console.log(businessSlug, session); // "suzy"
  // get business tied to service
  const bookings = await prisma.booking.findMany({
    where: { businessId: session.id },
  });

  if (!bookings) {
    return Response.json(
      { message: "No bookings could be fouind" },
      { status: 404 }
    );
  }

  return Response.json(bookings, { status: 200 });
}

export async function PATCH(request, { params }) {
  const { businessSlug } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Parse the incoming JSON
  const body = await request.json();
  const { bookingId, status } = body;

  const business = await findBusiness(session.user.id);
  console.log("Business", business);

  if (!business) {
    return NextResponse.json(
      { message: "Businiess not found" },
      { status: 404 }
    );
  }

  // Validate required field
  if (!bookingId) {
    return NextResponse.json(
      { message: "Booking ID is required" },
      { status: 400 }
    );
  }
  // Check if the booking exists and belongs to this customer
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });

  if (!booking) {
    return NextResponse.json({ message: "Booking not found" }, { status: 404 });
  }

  console.log(booking.businessId, business.id);
  if (booking.businessId !== business.id) {
    return NextResponse.json(
      { message: "You are not authorized to update this booking" },
      { status: 403 }
    );
  }

  // Perform the update
  try {
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: status.toUpperCase(),
      },
    });

    return NextResponse.json(updatedBooking, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error updating booking" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
