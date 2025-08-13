import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ message: "Unathorized" }, { status: 401 });
  }

  const userId = session.user.id;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    const result: { role: string; businessSlug?: string } = {
      role: user.role,
    };

    if (user.role === "business") {
      const business = await prisma.business.findUnique({
        where: {
          userId: userId,
        },
        select: {
          businessSlug: true,
        },
      });

      if (business) {
        result.businessSlug = business.businessSlug;
        return NextResponse.json({ message: result });
      } else {
        console.log(
          `User has role 'business' but no associated business record.`
        );
      }
    }

    return NextResponse.json({ message: { role: "user" } });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
