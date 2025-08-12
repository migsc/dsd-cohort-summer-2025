//POST route to create a booking

// src/app/api/bookings/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Adjust path if needed

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      service,
      amount,
      customerId,
      businessId,
      scheduledDate,
      paymentMethod,
    } = body;

    if (!service || !amount || !customerId || !businessId || !scheduledDate) {
      return NextResponse.json(
        { error: "Missing required booking fields." },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        service,
        amount,
        paymentMethod,
        customerId,
        businessId,
        scheduledDate: new Date(scheduledDate),
        status: "pending", // default status
      },
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
