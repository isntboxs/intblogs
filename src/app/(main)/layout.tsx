import { MainHeader } from "@/modules/main/ui/components/main-header";

export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<MainHeader />
			<main className="pt-16">{children}</main>
		</>
	);
}
