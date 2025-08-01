import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(req, { params }) {
  const { businessSlug } = await params;
  console.log("Request headers:", Object.fromEntries(req.headers));
  const session = await auth.api.getSession({ headers: await headers() });

  console.log("URL slug:", businessSlug);
  console.log("Session:", session);

  return Response.json({
    message: "Route is working",
    slugFromURL: businessSlug,
    sessionFromToken: session,
  });
}
