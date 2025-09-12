import { type RouterClient } from "@orpc/server";

import { postRouter } from "@/modules/post/server/procedures";

export const appRouter = {
	post: postRouter,
};

export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
