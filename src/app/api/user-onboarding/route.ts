import { auth } from "../auth/[...all]/route"; 
import prisma from "../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { headers } from "next/headers"

const OnboardingSchema = z.object({
    phoneNumber: z.string().optional(),
    role: z.enum(["User", "Customer"]), // example roles
});

export async function POST(req: NextRequest) {
    console.log("auth object methods", auth);
    const session = await auth.api.getSession({ headers: await headers() }); 
    const userId = session?.user?.id;

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = OnboardingSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { phoneNumber, role } = parsed.data;

    try {
        await prisma.user.update({
            where: { id: userId },
            data: { phoneNumber, role, onboarded: true },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
    }
}