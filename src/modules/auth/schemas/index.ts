import { z } from "zod";

export const signInSchema = z.object({
	username: z
		.string()
		.trim()
		.min(3, "Username must be at least 3 characters long")
		.max(30, "Username must be at most 30 characters long"),
	password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type SignInSchema = z.infer<typeof signInSchema>;
