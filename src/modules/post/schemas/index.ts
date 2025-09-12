import z from "zod";

export const postInsertSchema = z.object({
	title: z
		.string()
		.trim()
		.min(1, { message: "Title is required" })
		.max(300, { message: "Title must be at most 300 characters long" }),
	content: z
		.string()
		.trim()
		.min(1, { message: "Content is required" })
		.max(10000, { message: "Content must be at most 10000 characters long" }),
});

export type PostInsertSchema = z.infer<typeof postInsertSchema>;

export const postUpdateSchema = postInsertSchema.extend({
	id: z.string().min(1, { message: "Post ID is required" }),
});

export type PostUpdateSchema = z.infer<typeof postUpdateSchema>;
