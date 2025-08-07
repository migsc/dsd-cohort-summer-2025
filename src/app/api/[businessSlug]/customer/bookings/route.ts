import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

async function findCustomer(userId: string) {
  return prisma.customer.findUnique({
    where: { userId },
  });
}

export async function GET(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const customer = await findCustomer(session.user.id);

  if (!customer) {
    return NextResponse.json(
      { message: "Customer not found" },
      { status: 404 }
    );
  }

  const bookings = await prisma.booking.findMany({
    where: { customerId: customer.id },
  });

  return NextResponse.json(bookings, { status: 200 });
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  const formData = await request.json();

  const tentativeFormData = {
    date: "",
    serviceId: "",
    timeSlot: "",
    duration: 3,
    rooms: 2,
    squareFootage: 1500,
    notes: "",
  };

  // what is needed to derive correct info for Booking from the service
  const tentativeCoreService = {
    pricingModel: "",
    rate: 1,
  };

  /*
  Receive:
  "8:00 AM - 10:00 AM",

  Output:
  start
  "01:00"
  end
  "22:00"
  */

  if (!session || !session.user || !session.user.id) {
    console.log("Unauthorized");
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // get business tied to service
  const business = await prisma.business.findFirst({
    where: {
      coreServices: {
        some: { id: formData.serviceId },
      },
    },
  });

  if (!business) {
    return NextResponse.json(
      { message: "Business not found" },
      { status: 404 }
    );
  }

  // find the customer
  const customer = await prisma.customer.findUnique({
    where: { userId: session.user.id },
  });

  if (!customer) {
    return NextResponse.json(
      { message: "Customer not found" },
      { status: 404 }
    );
  }

  // create new booking
  try {
    const newBooking = await prisma.booking.create({
      data: {
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        notes: formData.notes,
        serviceId: formData.serviceId,
        businessId: business.id,
        customerId: customer.id,
        price: formData.price,
        rooms: formData.rooms,
        squareFootage: formData.squareFootage,
        status: "PENDING",
        duration: formData.serviceDuration,
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

export async function PATCH(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Parse the incoming JSON
  const body = await request.json();
  const { bookingId, date, startTime, endTime, notes, status } = body;

  // Validate required field
  if (!bookingId) {
    return NextResponse.json(
      { message: "Booking ID is required" },
      { status: 400 }
    );
  }

  const customer = await findCustomer(session.user.id);

  if (!customer) {
    return NextResponse.json(
      { message: "Customer not found" },
      { status: 404 }
    );
  }

  // Check if the booking exists and belongs to this customer
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });

  if (!booking) {
    return NextResponse.json({ message: "Booking not found" }, { status: 404 });
  }

  if (booking.customerId !== customer.id) {
    return NextResponse.json(
      { message: "You are not authorized to update this booking" },
      { status: 403 }
    );
  }

  // customers may only cancel status
  if (status && status.toUpperCase() !== "CANCELED") {
    return NextResponse.json(
      { message: "Customers can only cancel their bookings" },
      { status: 403 }
    );
  }

  // Perform the update
  try {
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        date: date ?? booking.date,
        startTime: startTime ?? booking.startTime,
        endTime: endTime ?? booking.endTime,
        notes: notes ?? booking.notes,
        ...(status ? { status: "CANCELED" } : {}),
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
