"use client";

import { useState } from "react";

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
import { signInSchema, type SignInSchema } from "@/modules/auth/schemas";

interface Props {
	type?: "sign-in" | "sign-up";
}

export const AuthForm = ({ type = "sign-in" }: Props) => {
	const [loading, setLoading] = useState<boolean>(false);

	const form = useForm<SignInSchema>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			username: "",
			password: "",
		},
		mode: "onChange",
	});

	const handleSubmit = async (data: SignInSchema) => {
		await authClient.signIn.username({
			username: data.username,
			password: data.password,
			callbackURL: "/",
			fetchOptions: {
				onRequest: () => {
					setLoading(true);
				},

				onSuccess: () => {
					setLoading(false);
				},

				onError: (ctx) => {
					setLoading(false);
					toast.error(`Oops, ${type} failed`, {
						description: ctx.error.message,
					});
				},
			},
		});
	};

	if (type === "sign-in") {
		return (
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className="grid grid-cols-1 gap-y-6"
				>
					<div className="space-y-4">
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

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input placeholder="********" type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Button type="submit" size="lg" className="w-full" disabled={loading}>
						{loading ? (
							<>
								<Loader2Icon className="mr-2 size-4 animate-spin" /> Signing
								in...
							</>
						) : (
							"Sign In"
						)}
					</Button>
				</form>
			</Form>
		);
	}

	return <div>auth-form</div>;
};
