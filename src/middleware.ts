import { NextResponse, type NextRequest } from "next/server";

import { getSessionAction } from "@/actions/get-session-action";

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

	return NextResponse.next();
}

export const config = {
	runtime: "nodejs",
	matcher: ["/((?!api/|rcp/|_next/|_static/|_vercel|media/|[\w-]+\.\w+).*)"],
};
