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

export const signUpSchema = signInSchema
	.extend({
		name: z
			.string()
			.trim()
			.min(3, "Name must be at least 3 characters long")
			.max(30, "Name must be at most 30 characters long"),
		email: z.string().trim().email("Invalid email address"),
		password: z
			.string()
			.trim()
			.min(8, "Password must be at least 8 characters long"),
		confirmPassword: z.string().trim().min(1, "Confirm password is required"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const onboardingSchema = signInSchema.pick({ username: true });

export type OnboardingSchema = z.infer<typeof onboardingSchema>;
