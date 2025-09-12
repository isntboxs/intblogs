import { ORPCError } from "@orpc/client";
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
			const post = await context.db.post.findUnique({
				where: {
					id: input,
				},
			});

			if (!post) {
				throw new ORPCError("NOT_FOUND", {
					cause: "Post not found",
					message: "Post not found",
				});
			}

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

			const existingPost = await context.db.post.findUnique({
				where: {
					id,
					authorId: context.auth.user.id,
				},
			});

			if (!existingPost) {
				throw new ORPCError("NOT_FOUND", {
					cause: "Post not found",
					message: "Post not found",
				});
			}

			if (existingPost.authorId !== context.auth.user.id) {
				throw new ORPCError("FORBIDDEN", {
					cause: "You are not authorized to update this post",
					message: "You are not authorized to update this post",
				});
			}

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
