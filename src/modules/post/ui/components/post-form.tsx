"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { MarkdownEditor } from "@/components/global/markdown-editor";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { orpc } from "@/lib/orpc/client";
import {
	postInsertSchema,
	type PostInsertSchema,
} from "@/modules/post/schemas";
import { type PostGetOne } from "@/modules/post/types";

interface Props {
	initialValues?: PostGetOne;
}

export const PostForm = ({ initialValues }: Props) => {
	const router = useRouter();

	const queryClient = useQueryClient();

	const createPost = useMutation(
		orpc.post.create.mutationOptions({
			onSuccess: async (data) => {
				await queryClient.invalidateQueries(orpc.post.getMany.queryOptions());

				toast.success("Post created successfully", {
					description: "Your post has been created successfully.",
				});

				router.push(`/post/${data.id}`);
			},

			onError: (error) => {
				toast.error("Failed to create post", {
					description: error.message,
				});
			},
		})
	);

	const updatePost = useMutation(
		orpc.post.update.mutationOptions({
			onSuccess: async (data) => {
				await queryClient.invalidateQueries(orpc.post.getMany.queryOptions());

				toast.success("Post updated successfully", {
					description: "Your post has been updated successfully.",
				});

				router.push(`/post/${data.id}`);
			},

			onError: (error) => {
				toast.error("Failed to update post", {
					description: error.message,
				});
			},
		})
	);

	const form = useForm<PostInsertSchema>({
		resolver: zodResolver(postInsertSchema),
		defaultValues: {
			title: initialValues?.title ?? "",
			content: initialValues?.content ?? "",
		},
		mode: "onChange",
	});

	const isEdit = !!initialValues;
	const isPending = createPost.isPending || updatePost.isPending;

	const handleSubmit = (data: PostInsertSchema) => {
		if (isEdit) {
			updatePost.mutate({ id: initialValues.id, ...data });
		} else {
			createPost.mutate(data);
		}
	};

	useEffect(() => {
		if (initialValues) {
			form.reset(initialValues);
		}
	}, [form, initialValues]);

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className="grid gap-y-6"
				>
					<div className="grid gap-y-4">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="content"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Content </FormLabel>
									<FormControl>
										<MarkdownEditor {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Button
						type="submit"
						disabled={form.formState.isSubmitting || isPending}
					>
						{form.formState.isSubmitting || isPending
							? "Submitting..."
							: "Submit"}
					</Button>
				</form>
			</Form>
		</>
	);
};
