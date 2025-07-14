import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "./auth";

export async function createContext(opts: CreateExpressContextOptions) {
	const session = await auth.api.getSession({
		headers: fromNodeHeaders(opts.req.headers),
	});
	return {
		session,
	};
}


export type Context = Awaited<ReturnType<typeof createContext>>;
