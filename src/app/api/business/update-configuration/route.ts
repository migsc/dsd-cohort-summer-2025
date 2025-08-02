import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import type { BusinessFormData } from "@/app/onboarding/business/schema/business.schema";

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  const formData: BusinessFormData = await request.json();

  if (!session || !session.user || !session.user.id) {
    console.log("Unauthorized");
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const business = await prisma.business.update({
      where: { userId: userId },
      data: {
        ...formData,
      },
    });
    console.log("here");
    return NextResponse.json(
      {
        message: "Business configuration update successful.",
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message: "Server error processing business configuration update.",
      },
      { status: 500 }
    );
  }
}
