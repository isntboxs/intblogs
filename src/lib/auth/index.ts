import { betterAuth } from "better-auth";

import { authConfig } from "@/lib/auth/config";

export const auth = betterAuth({ ...authConfig });

export type Session = typeof auth.$Infer.Session;
