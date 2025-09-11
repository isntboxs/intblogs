import { useTransition } from "react";
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
	signInSchema,
	signUpSchema,
	type SignInSchema,
	type SignUpSchema,
} from "@/modules/auth/schemas";

interface Props {
	type?: "sign-in" | "sign-up";
	callbackUrl: string;
}

export const AuthForm = ({ type = "sign-in", callbackUrl }: Props) => {
	const [isPending, startTransition] = useTransition();

	const router = useRouter();

	const formSignIn = useForm<SignInSchema>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			username: "",
			password: "",
		},
		mode: "onChange",
	});

	const formSignUp = useForm<SignUpSchema>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			name: "",
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		mode: "onChange",
	});

	const handleSubmitSignIn = async (data: SignInSchema) => {
		startTransition(async () => {
			await authClient.signIn.username({
				username: data.username,
				password: data.password,
				fetchOptions: {
					onSuccess: () => {
						toast.success("Signed in successfully!", {
							description: "You will be redirected.",
						});

						router.push(callbackUrl);
					},

					onError: (ctx) => {
						toast.error(`Oops, ${type} failed`, {
							description: ctx.error.message,
						});
					},
				},
			});
		});
	};

	const handleSubmitSignUp = async (data: SignUpSchema) => {
		startTransition(async () => {
			await authClient.signUp.email({
				name: data.name,
				username: data.username,
				email: data.email,
				password: data.password,
				fetchOptions: {
					onSuccess: () => {
						toast.success("Signed up successfully!", {
							description: "You will be redirected.",
						});

						router.push(callbackUrl);
					},

					onError: (ctx) => {
						toast.error(`Oops, ${type} failed`, {
							description: ctx.error.message,
						});
					},
				},
			});
		});
	};

	if (type === "sign-in") {
		return (
			<Form {...formSignIn}>
				<form
					onSubmit={formSignIn.handleSubmit(handleSubmitSignIn)}
					className="grid grid-cols-1 gap-y-6"
				>
					<div className="space-y-4">
						<FormField
							control={formSignIn.control}
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
							control={formSignIn.control}
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

					<Button
						type="submit"
						size="lg"
						className="w-full"
						disabled={isPending || formSignIn.formState.isSubmitting}
					>
						{isPending || formSignIn.formState.isSubmitting ? (
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

	return (
		<Form {...formSignUp}>
			<form
				onSubmit={formSignUp.handleSubmit(handleSubmitSignUp)}
				className="grid grid-cols-1 gap-y-6"
			>
				<div className="space-y-4">
					<FormField
						control={formSignUp.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input placeholder="Name" type="text" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={formSignUp.control}
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
						control={formSignUp.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="Email" type="email" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={formSignUp.control}
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

					<FormField
						control={formSignUp.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm Password</FormLabel>
								<FormControl>
									<Input placeholder="********" type="password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button
					type="submit"
					size="lg"
					className="w-full"
					disabled={isPending || formSignUp.formState.isSubmitting}
				>
					{isPending || formSignUp.formState.isSubmitting ? (
						<>
							<Loader2Icon className="size-4 animate-spin" /> Signing up...
						</>
					) : (
						"Sign Up"
					)}
				</Button>
			</form>
		</Form>
	);
};
