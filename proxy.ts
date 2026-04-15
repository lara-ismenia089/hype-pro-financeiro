import {
	NextRequest,
	NextResponse,
} from "next/server";
import { getSessionCookie } from "better-auth/cookies";

import { ROUTER } from "./lib/constants/routes";

const AUTH_ROUTES = [ROUTER.login, ROUTER.register];

export async function proxy(req: NextRequest) {
	const session = getSessionCookie(req);
	const { pathname } = req.nextUrl;

	const isAuthRoute = AUTH_ROUTES.some(route =>
		pathname === route || pathname.startsWith(`${route}/`)
	);

	if (session && isAuthRoute) {
		return NextResponse.redirect(new URL(ROUTER.dashboard, req.url));
	}

	if (!session && !isAuthRoute) {
		return NextResponse.redirect(new URL(ROUTER.login, req.url));
	}

	return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api/auth|_next|.*\\..*).*)',
  ],
};