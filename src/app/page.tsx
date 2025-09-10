"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/client";

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
