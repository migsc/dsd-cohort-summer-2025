import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type { Customer } from "prisma/generated";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || !session.user || !session.user.id) {
    console.log("Unathorized.");
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const userId = session.user.id;

  const formData: Customer = await req.json();

  try {
    const updatedCustomer = await prisma.customer.update({
      where: {
        userId: userId,
      },
      data: {
        phoneNumber: formData.phoneNumber,
        preferredContactMethod: formData.preferredContactMethod,
        addressStreet: formData.addressStreet,
        addressCity: formData.addressCity,
        addressState: formData.addressState,
        addressZip: formData.addressZip,
        addressCountry: formData.addressCountry,
        rooms: formData.rooms,
        squareFootage: formData.squareFootage,
      },
    });

    return NextResponse.json(
      {
        message: "Customer configuration updated successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Failed to update customer configuration: ", error);
    return NextResponse.json(
      {
        message: "Failed to update customer configuration.",
      },
      { status: 500 }
    );
  }
}
