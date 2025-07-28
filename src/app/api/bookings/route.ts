import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(request: Request) {
  console.log(request.body);
  const session = await auth.api.getSession({ headers: await headers() });
  const formData = await request.json();

  console.log(formData);

  return new Response();
}
