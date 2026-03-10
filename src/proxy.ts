import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
    const sessionCookie = request.cookies.get("better-auth.session_token") || request.cookies.get("__secure-better-auth.session_token");

    const { pathname } = request.nextUrl;

    // Protected routes
    const isProtectedRoute = pathname.startsWith("/interface");
    const isAuthRoute = pathname.startsWith("/signin") || pathname.startsWith("/signup");

    if (isProtectedRoute && !sessionCookie) {
        return NextResponse.redirect(new URL("/signin", request.url));
    }

    if (isAuthRoute && sessionCookie) {
        return NextResponse.redirect(new URL("/interface", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/interface/:path*", "/signin", "/signup"],
};
