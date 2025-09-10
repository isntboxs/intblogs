"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { BoxsIcon } from "@/components/global/boxs-icon";
import { Separator } from "@/components/ui/separator";
import { AuthForm } from "@/modules/auth/ui/components/auth-form";
import { AuthSocialButtons } from "@/modules/auth/ui/components/auth-social-buttons";
import { getCallbackUrl } from "@/utils/get-callback-url";

export const SignInView = () => {
	const params = useSearchParams();
	const hasCallbackUrl = params.has("callbackUrl");

	return (
		<>
			{/* Header */}
			<div className="flex h-full flex-col items-center justify-center gap-y-4">
				<BoxsIcon className="text-foreground size-12" />

				<div className="flex flex-col items-center gap-y-2 text-center">
					<h1 className="text-2xl font-bold md:text-3xl">
						Be part of isntblogs
					</h1>
					<p className="text-muted-foreground text-base md:text-lg">
						isntblogs already has thousands of stories, and yours could be next.
					</p>
				</div>
			</div>

			{/* Content */}
			<main className="mx-auto my-6 flex w-full max-w-2xl flex-col gap-y-6 sm:px-12">
				<AuthSocialButtons />

				{/* Separator */}
				<div className="flex w-full items-center justify-center gap-x-2">
					<Separator className="flex-1" />
					<p className="text-muted-foreground text-sm">OR</p>
					<Separator className="flex-1" />
				</div>

				{/* Form */}
				<AuthForm type="sign-in" callbackUrl={getCallbackUrl(params)} />

				<p className="text-muted-foreground text-center text-xs italic">
					By continuing, you agree to our{" "}
					<Link
						href="/terms"
						className="text-primary hover:text-primary/80 transition-all duration-300 ease-in-out"
					>
						Terms of Service
					</Link>
					,{" "}
					<Link
						href="/privacy"
						className="text-primary hover:text-primary/80 transition-all duration-300 ease-in-out"
					>
						Privacy Policy
					</Link>
					, and{" "}
					<Link
						href="/cookies"
						className="text-primary hover:text-primary/80 transition-all duration-300 ease-in-out"
					>
						Code of Conduct
					</Link>
				</p>
			</main>

			{/* Separator */}
			<div className="mx-auto w-full py-2 sm:max-w-2xl sm:px-12">
				<Separator />
			</div>

			{/* Footer */}
			<footer className="mx-auto w-full max-w-2xl px-12 py-2">
				<p className="text-muted-foreground text-center text-sm">
					New to isntblogs?{" "}
					<Link
						href={
							hasCallbackUrl
								? `/sign-up?callbackUrl=${encodeURIComponent(getCallbackUrl(params))}`
								: "/sign-up"
						}
						className="text-primary hover:text-primary/80 transition-all duration-300 ease-in-out"
					>
						Create an account
					</Link>
				</p>
			</footer>
		</>
	);
};
