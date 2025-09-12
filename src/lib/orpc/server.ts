import { cache } from "react";
import { headers } from "next/headers";

import "server-only";

import {
	createRouterClient,
	type InferRouterInputs,
	type InferRouterOutputs,
} from "@orpc/server";

import { createORPCContext } from "@/lib/orpc";
import { appRouter } from "@/lib/orpc/routers";
import { createQueryClient } from "@/lib/query/client";

export type RouterOutputs = InferRouterOutputs<typeof appRouter>;
export type RouterInputs = InferRouterInputs<typeof appRouter>;

const createContext = async () => {
	const heads = new Headers(await headers());

	return createORPCContext({ headers: heads });
};

globalThis.$client = createRouterClient(appRouter, {
	context: createContext,
});

export const getQueryClient = cache(createQueryClient);
