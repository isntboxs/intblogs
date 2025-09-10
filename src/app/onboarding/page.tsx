"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth/client";

export default function OnboardingPage() {
	const [username, setUsername] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!username.trim()) {
			toast.error("Please enter a username");
			return;
		}

		setLoading(true);
		try {
			// Update username using better-auth
			await authClient.updateUser({
				username: username.trim(),
			});
			toast.success("Username set successfully!");
			router.push("/");
		} catch (error) {
			toast.error("Failed to set username. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container mx-auto flex min-h-screen items-center justify-center px-4">
			<div className="w-full max-w-md space-y-6">
				<div className="text-center">
					<h1 className="text-2xl font-bold">Welcome!</h1>
					<p className="text-muted-foreground">
						Choose a username to complete your profile
					</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="username">Username</Label>
						<Input
							id="username"
							type="text"
							placeholder="Enter your username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</div>

					<Button type="submit" className="w-full" disabled={loading}>
						{loading ? "Setting up..." : "Continue"}
					</Button>
				</form>
			</div>
		</div>
	);
}
