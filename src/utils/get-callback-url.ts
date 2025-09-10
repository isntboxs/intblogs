import { type ReadonlyURLSearchParams } from "next/navigation";

import { DEFAULT_CALLBACK_URL } from "@/constants/routes";

export const getCallbackUrl = (query: ReadonlyURLSearchParams): string => {
	const callbackUrl = query.get("callbackUrl");

	if (callbackUrl) {
		return callbackUrl;
	}

	return DEFAULT_CALLBACK_URL;
};
