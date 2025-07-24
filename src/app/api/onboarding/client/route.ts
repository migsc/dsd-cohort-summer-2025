import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(request: Request) {
  console.log("We are in the api");
  const session = await auth.api.getSession({ headers: await headers() });
  const formData = await request.json();

  console.log("session: ", session);
  console.log("formData: ", formData);

  if (!session || !session.user) {
    console.log("Unauthorized");
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const result = await prisma.$transaction(async tx => {
      // Update the User's role to 'client'
      await tx.user.update({
        where: { id: userId },
        data: { role: "client" },
      });

      // Create the client profile
      const newClient = await tx.clientProfile.create({
        data: {
          userId: userId,
          preferredContactMethod: formData.preferredContactMethod,
          addressStreet: formData.addressStreet,
          addressCity: formData.addressCity,
          addressState: formData.addressState,
          addressZip: formData.addressZip,
          addressCountry: formData.addressCountry,
        },
      });
      return newClient;
    });

    console.log("Client done for user: ", userId);
    return NextResponse.json(
      { message: "Client onboarding successful" },
      { status: 200 }
    );
  } catch (err) {
    console.log("Error: ", err);
    return NextResponse.json(
      {
        message: "Server error processing client onboarding",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
