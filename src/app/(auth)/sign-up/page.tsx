import { SignUpView } from "@/modules/auth/ui/views/sign-up-view";

/**
 * Page component for the sign-up route that renders the SignUpView.
 *
 * This synchronous React component acts as the default export for the sign-up page
 * and simply returns the SignUpView element. It performs no routing or session checks.
 *
 * @returns The JSX element that displays the sign-up UI.
 */
export default function SignUpPage() {
	return <SignUpView />;
}
