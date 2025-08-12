import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  getSessionUser,
  findCustomer,
  findBusinessByService,
  findService,
  calculatePrice,
  findBooking,
  parseTimeSlot,
} from "@/lib/bookings";

export async function GET(request: Request) {
  const userId = await getSessionUser();
  const customer = await findCustomer(userId);

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
  const formData = await request.json();
  const userId = await getSessionUser();
  const business = await findBusinessByService(formData.serviceId);

  if (!business) {
    return NextResponse.json(
      { message: "Business not found" },
      { status: 404 }
    );
  }

  const customer = await findCustomer(userId);

  if (!customer) {
    return NextResponse.json(
      { message: "Customer not found" },
      { status: 404 }
    );
  }

  const serviceId = formData.service.id;

  const service = await findService(serviceId);
  console.log("Service found = ", service);

  if (!service) {
    return NextResponse.json({ message: "Service not found" }, { status: 404 });
  }

  // calculate price for booking first
  const price = await calculatePrice(
    service.pricingModel,
    service.rate,
    Number(formData.duration),
    Number(formData.rooms) ?? 0,
    Number(formData.squareFootage) ?? 0
  );

  const { startTime, endTime } = await parseTimeSlot(formData.timeSlot);

  // create new booking
  try {
    const booking = await prisma.booking.create({
      data: {
        date: formData.date,
        startTime: startTime,
        endTime: endTime,
        notes: formData.notes ?? "",
        serviceId: serviceId,
        businessId: business.id,
        customerId: customer.id,
        price,
        rooms: formData.rooms,
        squareFootage: formData.squareFootage,
        status: "PENDING",
        duration: Number(formData.duration),
        originalBookingId: formData.originalBookingId ?? null,
        paymentIntentId: null,
        completedAt: null,
        receiptUrl: null,
        checkoutUrl: null,
      },
    });
    console.log("Booking created", booking);
    return NextResponse.json(
      { message: "Booking is successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server error booking appointment" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const userId = await getSessionUser();
  const { bookingId, date, startTime, endTime, notes, status } =
    await request.json();
  // Validate required field
  if (!bookingId) {
    return NextResponse.json(
      { message: "Booking ID is required" },
      { status: 400 }
    );
  }

  // customers may only cancel status
  if (status && status.toUpperCase() !== "CANCELED") {
    return NextResponse.json(
      { message: "Customers can only cancel their bookings" },
      { status: 403 }
    );
  }

  const customer = await findCustomer(userId);

  if (!customer) {
    return NextResponse.json(
      { message: "Customer not found" },
      { status: 404 }
    );
  }

  const booking = await findBooking(bookingId);

  if (!booking) {
    return NextResponse.json({ message: "Booking not found" }, { status: 404 });
  }

  if (booking.customerId !== customer.id) {
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
  }
}
