import { MainHeader } from "@/modules/main/ui/components/main-header";

export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-svh">
			<MainHeader />

			<main className="py-14">
				<div className="container w-full max-w-7xl p-4">{children}</div>
			</main>
		</div>
	);
}
