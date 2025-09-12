import z from "zod";

import { protectedProcedure, publicProcedure } from "@/lib/orpc";
import { postInsertSchema, postUpdateSchema } from "@/modules/post/schemas";

export const postRouter = {
	getMany: publicProcedure.handler(async ({ context }) => {
		const posts = await context.db.post.findMany();

		return posts;
	}),

	getOne: publicProcedure
		.input(z.string())
		.handler(async ({ input, context }) => {
			const { session } = context;

			const post = await context.db.post.findUnique({
				where: {
					id: input,
					authorId: session ? session.user.id : undefined,
				},
			});

			return post;
		}),

	create: protectedProcedure
		.input(postInsertSchema)
		.handler(async ({ input, context }) => {
			const { title, content } = input;

			const newPost = await context.db.post.create({
				data: {
					title,
					content,
					authorId: context.auth.user.id,
				},
			});

			return newPost;
		}),

	update: protectedProcedure
		.input(postUpdateSchema)
		.handler(async ({ input, context }) => {
			const { id, title, content } = input;

			const updatedPost = await context.db.post.update({
				where: {
					id,
					authorId: context.auth.user.id,
				},
				data: {
					title,
					content,
				},
			});

			return updatedPost;
		}),
};
