import Link from "next/link";

import { getSessionAction } from "@/actions/get-session-action";
import { BoxsIcon } from "@/components/global/boxs-icon";
import { MainNavHeader } from "@/modules/main/ui/components/main-nav-header";

export const MainHeader = async () => {
	const session = await getSessionAction();

	return (
		<header className="bg-background/50 supports-[backdrop-filter]:bg-background/50 fixed top-0 z-50 h-14 w-full border-b backdrop-blur-sm">
			<div className="container flex h-full max-w-7xl items-center justify-between p-4">
				<div className="flex items-center gap-2">
					<Link href="/">
						<BoxsIcon className="size-8" />
						<span className="sr-only">IsntBlogs</span>
					</Link>
				</div>

				<MainNavHeader session={session} />
			</div>
		</header>
	);
};
