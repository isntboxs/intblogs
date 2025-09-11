"use client";

import Link from "next/link";

import {
	LogInIcon,
	MoreHorizontalIcon,
	PlusIcon,
	UserPlus2Icon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { type Session } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { MainUserButtonsHeader } from "@/modules/main/ui/components/main-user-buttons-header";

export const MainNavHeader = ({ session }: { session: Session | null }) => {
	const isMobile = useIsMobile();

	if (!session) {
		return <NavMenuHeader />;
	}

	return (
		<nav className="flex items-center gap-x-2">
			<Button
				variant="ghost"
				size={isMobile ? "icon" : "sm"}
				className={cn(isMobile && "size-8")}
				asChild
			>
				<Link href="/new">
					<PlusIcon className="size-4" />
					<span className={cn(isMobile && "sr-only")}>Create</span>
				</Link>
			</Button>

			<MainUserButtonsHeader user={session.user} />
		</nav>
	);
};

const NavMenuHeader = () => {
	return (
		<div className="flex items-center gap-x-2">
			<Button variant="default" size="sm" asChild>
				<Link href="/sign-in">
					<LogInIcon className="size-4" />
					Sign In
				</Link>
			</Button>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon" className="size-8 rounded-full">
						<MoreHorizontalIcon className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className="w-56"
					align="end"
					side="bottom"
					sideOffset={12}
				>
					<DropdownMenuItem asChild>
						<Link href="/sign-up">
							<UserPlus2Icon className="size-4" />
							Sign Up
						</Link>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};
