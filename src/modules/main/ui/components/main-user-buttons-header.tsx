import { useRouter } from "next/navigation";

import { LogOutIcon } from "lucide-react";

import { GeneratedAvatar } from "@/components/global/generated-avatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { type Session } from "@/lib/auth";
import { authClient } from "@/lib/auth/client";

export const MainUserButtonsHeader = ({ user }: { user: Session["user"] }) => {
	const router = useRouter();

	const isMobile = useIsMobile();

	const handleSignOut = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push("/sign-in");
				},
			},
		});
	};

	if (isMobile) {
		return (
			<Drawer>
				<DrawerTrigger asChild>
					<Button variant="ghost" size="icon" className="rounded-full">
						{!user.image ? (
							<GeneratedAvatar
								seed={user.username!}
								style="notionistsNeutral"
							/>
						) : (
							<Avatar>
								<AvatarImage src={user.image} alt={user.username!} />
								<AvatarFallback className="uppercase">
									{user.username!.charAt(0)}
								</AvatarFallback>
							</Avatar>
						)}
					</Button>
				</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader>
						<div className="flex items-center gap-2">
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
										{user.username!.charAt(0)}
									</AvatarFallback>
								</Avatar>
							)}

							<div className="grid flex-1 text-left text-sm leading-tight">
								<DrawerTitle className="truncate font-semibold">
									{user.name}
								</DrawerTitle>
								<DrawerDescription className="truncate text-xs">
									@{user.username}
								</DrawerDescription>
							</div>
						</div>
					</DrawerHeader>

					<DrawerFooter>
						<DrawerClose asChild>
							<Button
								variant="default"
								onClick={handleSignOut}
								className="w-full"
							>
								<LogOutIcon />
								Sign out
							</Button>
						</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		);
	}

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
								{user.username!.charAt(0)}
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
								{user.username!.charAt(0)}
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
					<LogOutIcon className="size-4" />
					Sign Out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
