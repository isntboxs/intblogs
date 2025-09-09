import { BoxsIcon } from "@/components/global/boxs-icon";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-svh">
			<div className="container my-6 max-w-7xl p-4">
				<div className="flex h-full flex-col items-center justify-center gap-y-4">
					<BoxsIcon className="text-foreground size-12" />

					<div className="flex flex-col items-center gap-y-2 text-center">
						<h1 className="text-2xl font-bold md:text-3xl">
							Be part of isntblogs
						</h1>
						<p className="text-muted-foreground text-base md:text-lg">
							isntblogs already has thousands of stories, and yours could be
							next.
						</p>
					</div>
				</div>

				<main className="my-6 w-full">{children}</main>
			</div>
		</div>
	);
}
