"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { GeneratedAvatar } from "@/components/global/generated-avatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth/client";

type User = typeof authClient.$Infer.Session.user;

export const MainUserButtonsHeader = () => {
	const { data: session, isPending } = authClient.useSession();

	if (isPending) {
		return (
			<nav className="flex items-center gap-2">
				{Array.from({ length: 2 }).map((_, index) => (
					<Skeleton key={index} className="h-9 w-16 rounded-md" />
				))}
			</nav>
		);
	}

	if (!session) {
		return (
			<nav className="flex items-center gap-2">
				<Button variant="ghost" asChild>
					<Link href="/sign-in">Sign in</Link>
				</Button>

				<Button variant="outline" asChild>
					<Link href="/sign-up">Sign up</Link>
				</Button>
			</nav>
		);
	}

	return <UserButton user={session.user} />;
};

const UserButton = ({ user }: { user: User }) => {
	const router = useRouter();

	const handleSignOut = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push("/sign-in");
				},
			},
		});
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" className="rounded-full">
					{!user.image ? (
						<GeneratedAvatar seed={user.username!} style="notionistsNeutral" />
					) : (
						<Avatar>
							<AvatarImage src={user.image} alt={user.username!} />
							<AvatarFallback className="uppercase">
								{user.username!.slice(0, 2)}
							</AvatarFallback>
						</Avatar>
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-56"
				align="end"
				side="bottom"
				sideOffset={9}
			>
				<DropdownMenuLabel className="flex items-center gap-2">
					{!user.image ? (
						<GeneratedAvatar
							seed={user.username!}
							style="notionistsNeutral"
							className="rounded-lg"
						/>
					) : (
						<Avatar className="rounded-lg">
							<AvatarImage src={user.image} alt={user.username!} />
							<AvatarFallback className="rounded-lg uppercase">
								{user.username!.slice(0, 2)}
							</AvatarFallback>
						</Avatar>
					)}

					<div className="flex w-[160px] flex-col">
						<p className="truncate font-medium">{user.name}</p>
						<p className="text-muted-foreground truncate text-xs">
							@{user.username}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleSignOut}>
					Log out
					<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
