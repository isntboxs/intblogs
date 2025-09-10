"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
import { authClient } from "@/lib/auth/client";
import {
	onboardingSchema,
	type OnboardingSchema,
} from "@/modules/auth/schemas";

export const OnboardingView = () => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const form = useForm<OnboardingSchema>({
		resolver: zodResolver(onboardingSchema),
		defaultValues: {
			username: "",
		},
		mode: "onChange",
	});

	const handleSubmit = async (data: OnboardingSchema) => {
		await authClient.updateUser({
			username: data.username,
			fetchOptions: {
				onRequest: () => {
					setLoading(true);
				},

				onSuccess: () => {
					setLoading(false);
					toast.success("Username created successfully!");
					router.push("/");
				},

				onError: (ctx) => {
					setLoading(false);
					toast.error(`Oops, username creation failed`, {
						description: ctx.error.message,
					});
				},
			},
		});
	};

	return (
		<div className="mx-auto flex h-[calc(100vh-6rem)] w-full max-w-md flex-col items-center justify-center space-y-6">
			<div className="text-center">
				<h1 className="text-2xl font-bold">Welcome to isntblogs!</h1>
				<p className="text-muted-foreground">
					Choose a username to complete your profile
				</p>
			</div>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className="w-[calc(100%-2rem)] space-y-4"
				>
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input placeholder="Username" type="text" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit" className="w-full" disabled={loading}>
						{loading ? (
							<>
								<Loader2Icon className="mr-2 size-4 animate-spin" /> Setting
								up...
							</>
						) : (
							"Continue"
						)}
					</Button>
				</form>
			</Form>
		</div>
	);
};
