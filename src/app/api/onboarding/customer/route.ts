import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  const formData = await request.json();

  if (!session || !session.user) {
    console.log("Unauthorized");
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const result = await prisma.$transaction(async tx => {
      // Update the User's role to 'customer'
      await tx.user.update({
        where: { id: userId },
        data: { role: "customer" },
      });

      // Create the customer profile
      const newCustomer = await tx.customer.create({
        data: {
          userId: userId,
          preferredContactMethod: formData.preferredContactMethod,
          addressStreet: formData.addressStreet,
          addressCity: formData.addressCity,
          addressState: formData.addressState,
          addressZip: formData.addressZip,
          addressCountry: formData.addressCountry,
          phoneNumber: formData.phoneNumber,
          rooms: formData.rooms,
          squareFootage: formData.squareFootage,
        },
      });
      return newCustomer;
    });

    console.log("Customer onboarding done for user: ", userId);
    return NextResponse.json(
      { message: "Customer onboarding successful" },
      { status: 200 }
    );
  } catch (err) {
    console.log("Error: ", err);
    return NextResponse.json(
      {
        message: "Server error processing customer onboarding",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
