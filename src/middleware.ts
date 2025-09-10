import { NextResponse, type NextRequest } from "next/server";

import { getSessionAction } from "@/actions/get-session-action";

/**
 * Middleware that enforces authentication-related routing rules.
 *
 * Checks the current session and conditionally redirects requests:
 * - Authenticated users without a username are redirected to `/onboarding` unless already on that path.
 * - Authenticated users with a username are redirected to `/` when attempting to access `/onboarding` or `/sign-in`.
 * - Unauthenticated requests to `/onboarding` are redirected to `/sign-in`.
 *
 * If no rule matches, the request is allowed to continue.
 *
 * @returns A NextResponse that either redirects to an appropriate route or calls `NextResponse.next()` to continue processing.
 */
export async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;

	const session = await getSessionAction();

	// If user is authenticated
	if (session?.user) {
		const user = session.user;

		// If user doesn't have username and not already on onboarding page
		if (!user.username && !pathname.startsWith("/onboarding")) {
			return NextResponse.redirect(new URL("/onboarding", req.url));
		}

		// If user has username and trying to access onboarding
		if (user.username && pathname.startsWith("/onboarding")) {
			return NextResponse.redirect(new URL("/", req.url));
		}

		// If user has username and trying to access auth pages
		if (user.username && pathname.startsWith("/sign-in")) {
			return NextResponse.redirect(new URL("/", req.url));
		}
	}

	// Unauthenticated user should not be able to access onboarding page
	if (!session?.user && pathname.startsWith("/onboarding")) {
		return NextResponse.redirect(new URL("/sign-in", req.url));
	}

	return NextResponse.next();
}

export const config = {
	runtime: "nodejs",
	matcher: ["/((?!api/|rpc/|_next/|_static/|_vercel|media/|[\w-]+\.\w+).*)"],
};
