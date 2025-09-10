export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-svh">
			<div className="container max-w-7xl px-4 pt-10 pb-14">{children}</div>
		</div>
	);
}
