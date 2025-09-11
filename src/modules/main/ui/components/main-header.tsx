import Link from "next/link";

import { BoxsIcon } from "@/components/global/boxs-icon";
import { MainUserButtonsHeader } from "@/modules/main/ui/components/main-user-buttons-header";

export const MainHeader = () => {
	return (
		<header className="bg-background/50 supports-[backdrop-filter]:bg-background/50 fixed top-0 z-50 h-14 w-full border-b backdrop-blur-sm">
			<div className="container flex h-full max-w-7xl items-center justify-between p-4">
				<div className="flex items-center gap-2">
					<Link href="/">
						<BoxsIcon className="size-8" />
						<span className="sr-only">IsntBlogs</span>
					</Link>
				</div>

				<div className="flex items-center gap-2">
					<MainUserButtonsHeader />
				</div>
			</div>
		</header>
	);
};
