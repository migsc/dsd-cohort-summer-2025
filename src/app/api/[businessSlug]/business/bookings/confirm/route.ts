import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  const body = await request.json();

  // only expect bookingId
  const { bookingId } = body;

  if (!session || !session.user || !session.user.id) {
    console.log("Unauthorized");
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // get business tied to booking
  const business = await prisma.business.findFirst({
    where: {
      coreServices: {
        some: { id: bookingId },
      },
    },
  });

  if (!business) {
    return NextResponse.json(
      { message: "Business not found" },
      { status: 404 }
    );
  }
}
