import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

interface RouteContext {
  params: Promise<{
    businessSlug: string;
  }>;
}

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

export async function GET(request: Request, context: RouteContext) {
  const { businessSlug } = await context.params;
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const businessProfileWithBookings = await prisma.business.findUnique({
      where: {
        userId: userId,
      },
      include: {
        bookings: true,
      },
    });

    if (!businessProfileWithBookings) {
      return NextResponse.json(
        { message: "Business profile not found." },
        { status: 404 }
      );
    }

    console.log(businessProfileWithBookings.bookings);
    return NextResponse.json(
      {
        bookings: businessProfileWithBookings.bookings,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log("Error fetching business profile: ", err);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request, context: RouteContext) {
  const session = await auth.api.getSession({ headers: await headers() });
  const formData = await request.json();
  const { businessSlug } = await context.params;
  console.log("In the post bookings: ", businessSlug);
  console.log("formData: ", formData);

  return NextResponse.json({ message: "in the post bookings route" });
  // TODO: Create booking
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ businessSlug: string }> }
) {
  const { businessSlug } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Parse the incoming JSON
  const body = await req.json();
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
