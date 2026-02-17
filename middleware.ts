import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const publicPaths = ["/login", "/signup", "/reset-password"];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  const isPublicPath = publicPaths.some((p) => pathname.startsWith(p));
  const isApiAuth = pathname.startsWith("/api/auth");

  // Allow API auth routes through
  if (isApiAuth) {
    return NextResponse.next();
  }

  // Redirect logged-in users away from auth pages
  if (isPublicPath && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Redirect unauthenticated users to login
  if (!isPublicPath && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|avatars|sounds|badges|tomatoes|api/auth|api/health|api/debug|api/seed).*)",
  ],
};
