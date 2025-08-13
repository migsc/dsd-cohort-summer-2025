import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
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
  const business = await findBusinessByService(formData.service.id);

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

  const service = await findService(formData.service.id);

  if (!service) {
    return NextResponse.json({ message: "Service not found" }, { status: 404 });
  }

  // calculate price for booking first
  const price = await calculatePrice(
    service.pricingModel,
    service.rate,
    formData.duration,
    customer.rooms,
    customer.squareFootage
  );

  const { startTime, endTime } = await parseTimeSlot(formData.timeSlot);

  // create new booking
  try {
    const booking = await prisma.booking.create({
      data: {
        date: formData.date,
        startTime: startTime,
        endTime: endTime,
        notes: formData.notes,
        serviceId: formData.service.id,
        businessId: business.id,
        customerId: customer.id,
        price,
        rooms: customer.rooms,
        squareFootage: customer.squareFootage,
        status: "PENDING",
        duration: Number(formData.duration),
        originalBookingId: formData.originalBookingId || null,
        paymentIntentId: null,
        completedAt: null,
        receiptUrl: null,
        checkoutUrl: null,
      },
    });
    console.log("Booking created", booking);

    const origin = (await headers()).get("origin");

    const newCustomer = await stripe.customers.create({
      metadata: {
        userId: customer.id,
      },
    });

    const checkout = await stripe.checkout.sessions.create({
      customer: newCustomer.id,
      success_url: `${origin}/${business.businessSlug}/bookings`,
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Cleaning Service: ${service.name}`,
              description: `Bedrooms: ${customer.rooms} & SquareFootage: ${customer.squareFootage}`,
            },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],
    });

    return NextResponse.json({ url: checkout.url });
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
