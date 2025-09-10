import { SignInView } from "@/modules/auth/ui/views/sign-in-view";

/**
 * Page component for the sign-in route that renders the SignInView.
 *
 * This synchronous React component acts as the default export for the sign-in page
 * and simply returns the SignInView element. It performs no routing or session checks.
 *
 * @returns The JSX element that displays the sign-in UI.
 */
export default function SignInPage() {
	return <SignInView />;
}
