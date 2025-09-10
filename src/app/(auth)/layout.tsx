/**
 * Layout wrapper for authentication pages that centers content inside a responsive container.
 *
 * @param children - React nodes to render inside the layout's inner container.
 * @returns The layout's JSX element containing `children`.
 */
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
