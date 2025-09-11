import { type ReadonlyURLSearchParams } from "next/navigation";

import { AUTH_ROUTES, DEFAULT_CALLBACK_URL } from "@/constants/routes";

export const getCallbackUrl = (query: ReadonlyURLSearchParams): string => {
	const raw = query.get("callbackUrl");

	if (!raw) return DEFAULT_CALLBACK_URL;

	// Allow only same-origin relative paths, and skip known auth routes to prevent loops.
	const isRelative = /^\/(?!\/)/.test(raw); // starts with '/' but not '//'
	const pathname = raw.split("?")[0];

	if (isRelative && !AUTH_ROUTES.includes(pathname)) return raw;

	return DEFAULT_CALLBACK_URL;
};
