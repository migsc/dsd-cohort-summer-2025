// src/app/api/me/route.ts
import prisma from "@/lib/prisma";
import { auth } from "@/app/api/auth/[...all]/route";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) {
    return NextResponse.json(null, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, name: true, email: true, onboarded: true, role: true },
  });

  return NextResponse.json({ user });
}