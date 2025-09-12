import { type RouterClient } from "@orpc/server";
import z from "zod";

import { protectedProcedure, publicProcedure } from "@/lib/orpc";

export const appRouter = {
	hello: publicProcedure
		.input(
			z.object({
				name: z.string(),
			})
		)
		.handler(({ input }) => {
			return {
				message: `Hello ${input.name}`,
			};
		}),

	privateData: protectedProcedure.handler(async ({ context }) => {
		return {
			message: "This is private data",
			session: context.auth.session,
			user: context.auth.user,
		};
	}),
};

export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
