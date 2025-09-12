import { ORPCError, os } from "@orpc/server";

import { db } from "@/db";
import { auth } from "@/lib/auth";

export const createORPCContext = async (opts: { headers: Headers }) => {
	const session = await auth.api.getSession({
		headers: opts.headers,
	});

	return {
		db,
		session,
		...opts,
	};
};

type Context = Awaited<ReturnType<typeof createORPCContext>>;

export const o = os.$context<Context>();

const authMiddleware = o.middleware(async ({ context, next }) => {
	if (!context.session) {
		throw new ORPCError("UNAUTHORIZED", {
			message: "You are not authenticated",
			cause: "You are not authenticated",
		});
	}

	return next({
		context: {
			...context,
			auth: {
				session: context.session.session,
				user: context.session.user,
			},
		},
	});
});

export const publicProcedure = o;
export const protectedProcedure = publicProcedure.use(authMiddleware);
