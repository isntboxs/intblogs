"use client";

import { useState } from "react";

import { Loader2Icon } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/client";

interface Props {
	type?: "sign-in" | "sign-up";
}

const socialButtons = [
	{
		name: "Google",
		provider: "google",
		icon: <FcGoogle className="" />,
	},
	{
		name: "Github",
		provider: "github",
		icon: <FaGithub />,
	},
];

export const AuthSocialButtons = ({ type = "sign-in" }: Props) => {
	const [provider, setProvider] = useState<"github" | "google" | null>(null);

	const handleProvider = async (provider: "github" | "google") => {
		await authClient.signIn.social({
			provider,
			callbackURL: "/",
			fetchOptions: {
				onRequest: () => {
					setProvider(provider);
				},

				onSuccess: async () => {
					setProvider(null);
				},

				onError: (ctx) => {
					setProvider(null);
					toast.error(`Oops, ${type} failed`, {
						description: ctx.error.message,
					});
				},
			},
		});
	};

	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
			{socialButtons.map((button) => (
				<Button
					key={button.name}
					variant="outline"
					size="lg"
					className="w-full text-center"
					onClick={() => handleProvider(button.provider as "google" | "github")}
					disabled={provider === button.provider}
				>
					{provider === button.provider ? (
						<Loader2Icon className="size-4 animate-spin" />
					) : (
						button.icon
					)}

					<span>
						{type === "sign-in"
							? `Continue with ${button.name}`
							: `Sign up with ${button.name}`}
					</span>
				</Button>
			))}
		</div>
	);
};
