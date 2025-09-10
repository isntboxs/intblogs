"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/client";

/**
 * Client-side Home page component that conditionally shows a logout action.
 *
 * If an active session exists (from authClient.useSession), renders a "Logout"
 * button that calls authClient.signOut and, on successful sign-out, navigates
 * to "/sign-in". If there is no session, renders a simple "HomePage" placeholder.
 *
 * @returns The component's JSX output.
 */
export default function HomePage() {
	const router = useRouter();

	const { data: session } = authClient.useSession();

	if (session) {
		return (
			<>
				<Button
					onClick={() =>
						authClient.signOut({
							fetchOptions: {
								onSuccess: () => {
									router.push("/sign-in");
								},
							},
						})
					}
				>
					Logout
				</Button>
			</>
		);
	}
	return <div>HomePage</div>;
}
