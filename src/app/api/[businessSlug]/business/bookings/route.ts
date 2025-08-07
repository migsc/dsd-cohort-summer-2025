import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
  getSessionUser,
  findBusinessBySlug,
  findBooking,
} from "@/lib/bookings";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ businessSlug: string }> }
) {
  // GET returns all bookings from a business given
  const { businessSlug } = await params;
  const userId = await getSessionUser();

  const business = await findBusinessBySlug(businessSlug, userId);

  console.log(business);
  if (!business) {
    return NextResponse.json(
      { message: "Business not found." },
      { status: 404 }
    );
  }

  try {
    const bookings = await prisma.booking.findMany({
      where: { businessId: business.id },
      include: { service: true },
    });

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (err) {
    console.error("Error fetching bookings:", err);
    return NextResponse.json(
      { message: "Bookings fetch error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ businessSlug: string }> }
) {
  const { businessSlug } = await params;
  const userId = await getSessionUser();

  const { bookingId, status } = await req.json();
  if (!bookingId || !status) {
    return NextResponse.json(
      { message: "Booking ID and status are required" },
      { status: 400 }
    );
  }

  const business = await findBusinessBySlug(businessSlug, userId);
  if (!business) {
    return NextResponse.json(
      { message: "Business not found." },
      { status: 404 }
    );
  }

  const booking = await findBooking(bookingId);

  if (!booking) {
    return NextResponse.json({ message: "Booking not found" }, { status: 404 });
  }

  if (booking.businessId !== business.id) {
    return NextResponse.json(
      { message: "You are not authorized to update this booking" },
      { status: 403 }
    );
  }

  const validStatuses = [
    "PENDING",
    "CONFIRMED",
    "ON_WAY",
    "IN_PROGRESS",
    "CANCELED",
    "COMPLETED",
  ];

  const statusUppercase = status.toUpperCase();

  if (!validStatuses.includes(statusUppercase)) {
    return NextResponse.json(
      { message: "Invalid status value" },
      { status: 400 }
    );
  }

  // Perform the update
  try {
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: status.toUpperCase(),
        ...(statusUppercase === "COMPLETED" && { completedAt: new Date() }),
      },
    });

    return NextResponse.json(updatedBooking, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error updating booking" },
      { status: 500 }
    );
  }
}
