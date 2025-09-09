import { type BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { openAPI, username } from "better-auth/plugins";

import { db } from "@/db";
import { env } from "@/utils/env";

export const authConfig = {
	appName: "isntblogs",
	baseURL: env.NEXT_PUBLIC_APP_URL,
	database: prismaAdapter(db, {
		provider: "postgresql",
	}),
	emailAndPassword: {
		enabled: true,
	},
	plugins: [openAPI(), username(), nextCookies()],
	secret: env.BETTER_AUTH_SECRET,
} satisfies BetterAuthOptions;
