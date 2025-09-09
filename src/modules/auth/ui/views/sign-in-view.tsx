import Link from "next/link";

import { AuthSocialButtons } from "@/modules/auth/ui/components/auth-social-buttons";

export const SignInView = () => {
	return (
		<div className="flex flex-col gap-y-6 sm:px-12">
			<AuthSocialButtons />

			<p className="text-muted-foreground text-center text-xs italic">
				By continuing, you agreeing to our{" "}
				<Link
					href="/terms"
					className="text-primary hover:text-primary/80 underline underline-offset-4 transition-all duration-300 ease-in-out"
				>
					Terms of Service
				</Link>
				,{" "}
				<Link
					href="/privacy"
					className="text-primary hover:text-primary/80 underline underline-offset-4 transition-all duration-300 ease-in-out"
				>
					Privacy Policy
				</Link>
				, and{" "}
				<Link
					href="/cookies"
					className="text-primary hover:text-primary/80 underline underline-offset-4 transition-all duration-300 ease-in-out"
				>
					Code of Conduct
				</Link>
			</p>
		</div>
	);
};
