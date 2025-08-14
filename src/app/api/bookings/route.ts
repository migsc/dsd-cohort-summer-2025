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

  try {
    const newBooking = await prisma.booking.create({
      data: {
        date: body.date,
        startTime: body.startTime,
        endTime: body.endTime,
        notes: body.notes,
        duration: body.duration, // required
        price: body.price,       // required
        serviceId: body.serviceId,
        customerId: body.customerId,
        businessId: body.businessId,
        createdAt: body.createdAt ? new Date(body.createdAt) : undefined, //prisma has type DateTime so no toISOString needed
        updatedAt: body.updatedAt ? new Date(body.updatedAt) : undefined,
      },
    });

    return NextResponse.json(newBooking, { status: 201 });
  } catch (err) {
    console.error("Booking creation failed:", err);
    return NextResponse.json({ message: "Booking creation failed" }, { status: 500 });
  }
}







//POST route to create a booking

// src/app/api/bookings/route.ts

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const {
//       service,
//       amount,
//       customerId,
//       businessId,
//       scheduledDate,
//       paymentMethod,
//     } = body;

//     if (!service || !amount || !customerId || !businessId || !scheduledDate) {
//       return NextResponse.json(
//         { error: "Missing required booking fields." },
//         { status: 400 }
//       );
//     }

//     const booking = await prisma.booking.create({
//       data: {
//         service,
//         amount,
//         paymentMethod,
//         customerId,
//         businessId,
//         scheduledDate: new Date(scheduledDate),
//         status: "pending", // default status
//       },
//     });

//     return NextResponse.json({ booking }, { status: 201 });
//   } catch (error) {
//     console.error("Error creating booking:", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }
