import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";

import { type AppRouterClient } from "@/lib/orpc/routers";
import { env } from "@/utils/env";

declare global {
	var $client: AppRouterClient | undefined;
}

export const link = new RPCLink({
	url: env.NEXT_PUBLIC_APP_URL + "/rpc",

	fetch(url, options) {
		return fetch(url, {
			...options,
			credentials: "include",
		});
	},

	headers: async () => {
		if (typeof window !== "undefined") {
			return {};
		}

		const { headers } = await import("next/headers");
		return await headers();
	},
});

export const client: AppRouterClient =
	globalThis.$client ?? createORPCClient(link);

export const orpc = createTanstackQueryUtils(client);
