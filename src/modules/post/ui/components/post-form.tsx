"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import {
	postInsertSchema,
	type PostInsertSchema,
} from "@/modules/post/schemas";

export const PostForm = () => {
	const form = useForm<PostInsertSchema>({
		resolver: zodResolver(postInsertSchema),
		defaultValues: {
			title: "",
			content: "",
		},
		mode: "onChange",
	});

	const handleSubmit = (data: PostInsertSchema) => {
		console.log(data);
	};

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

					<Button type="submit" disabled={form.formState.isSubmitting}>
						{form.formState.isSubmitting ? "Submitting..." : "Submit"}
					</Button>
				</form>
			</Form>
		</>
	);
};
