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
	account: {
		accountLinking: {
			enabled: true,
			trustedProviders: ["github", "google"],
		},
	},
	emailAndPassword: {
		enabled: true,
	},
	plugins: [
		openAPI(),
		username({
			minUsernameLength: 3,
			maxUsernameLength: 30,
		}),
		nextCookies(),
	],
	socialProviders: {
		github: {
			enabled: true,
			clientId: env.GITHUB_CLIENT_ID,
			clientSecret: env.GITHUB_CLIENT_SECRET,
		},
		google: {
			enabled: true,
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		},
	},
	secret: env.BETTER_AUTH_SECRET,
} satisfies BetterAuthOptions;
