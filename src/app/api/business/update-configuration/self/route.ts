// src/app/api/business/self/route.ts
import { auth } from "@/lib/auth"; // or your auth system
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const business = await prisma.business.findUnique({
    where: { userId },
  });

  if (!business) {
    return NextResponse.json({ message: "Business not found" }, { status: 404 });
  }

  return NextResponse.json(business);
}