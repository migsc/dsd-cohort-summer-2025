import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{
    businessSlug: string;
  }>;
}

export async function GET(req: Request, context: RouteContext) {
  const { businessSlug } = await context.params;
  const session = await auth.api.getSession({ headers: await headers() });
  console.log("URL slug: ", businessSlug);
  console.log("Session: ", session);

  return NextResponse.json({ Slug: businessSlug });
}
