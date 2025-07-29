import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getBusinessIdFromUser, getBusinessOperatingHours } from "@/app/business-repo";}

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const businessId = await getBusinessIdFromUser(session?.user?.id);
    if (!businessId) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }
    const operatingHours = await getBusinessOperatingHours(businessId);
    if (!operatingHours) {
      return NextResponse.json({ error: "Operating hours not found" }, { status: 404 });
    }

    return NextResponse.json({ operatingHours }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
