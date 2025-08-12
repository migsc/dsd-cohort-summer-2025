import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const bookings = await prisma.booking.findMany({
      where: {
        customer: {
          userId: userId,
        },
      },
      include: {
        business: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    return NextResponse.json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    return NextResponse.json({ message: "Failed to fetch bookings" }, { status: 500 });
  }
}


export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || !session.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const body = await request.json();

  const {
    businessId,
    serviceType,
    date,      // e.g. "2025-08-10"
    time,      // e.g. "2:00 PM"
    address,
    notes
  } = body;

  try {
    const newBooking = await prisma.booking.create({
      data: {
        customer: {
          connect: {
            userId: userId,
          },
        },
        business: {
          connect: {
            id: businessId,
          },
        },
        serviceType,
        date: new Date(date),
        time,
        address,
        notes,
      },
    });

    return NextResponse.json(newBooking, { status: 201 });
  } catch (err) {
    console.error("Booking creation failed:", err);
    return NextResponse.json({ message: "Booking creation failed" }, { status: 500 });
  }
}
