import {
	inferAdditionalFields,
	lastLoginMethodClient,
	usernameClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import type { auth } from "@/lib/auth";
import { env } from "@/utils/env";

export const authClient = createAuthClient({
	baseURL: env.NEXT_PUBLIC_APP_URL,
	plugins: [
		inferAdditionalFields<typeof auth>(),
		usernameClient(),
		lastLoginMethodClient(),
	],
});
