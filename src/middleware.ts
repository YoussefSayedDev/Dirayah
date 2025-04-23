import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { auth } from "./lib/auth";

const intlMiddleware = createMiddleware({
  ...routing,
  defaultLocale: "en",
  localePrefix: "always",
});

export async function middleware(req: NextRequest) {
  // const token = req.cookies.get("acccess_token")?.value;
  const pathname = req.nextUrl.pathname;

  // First, check if the path is missing a locale
  // If it's the root path or doesn't start with a locale, let intlMiddleware handle it first
  if (pathname === "/" || !pathname.match(/^\/(en|ar)\//)) {
    // For root path, let intlMiddleware handle the locale redirect
    return intlMiddleware(req);
  }

  // Get the pathname without the locale
  const pathnameWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "");

  // Get the session
  const session = await auth();

  // Protected routes pattern
  const isAuthRoute =
    pathnameWithoutLocale.startsWith("/sign-in") ||
    pathnameWithoutLocale.startsWith("/sign-up") ||
    pathnameWithoutLocale.startsWith("/forgot-password") ||
    pathnameWithoutLocale.startsWith("/reset-password");

  const isDashboardRoute = pathnameWithoutLocale.startsWith("/dashboard");

  // Redirect authenticated users away from auth routes
  if (isAuthRoute && session) {
    const locale = pathname.split("/")[1];

    // Simple redirect to onboarding or dashboard
    // Let the onboarding/dashboard pages handle detailed user state checks
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url));
  }

  // Redirect unauthenticated users away from protected routes
  if (isDashboardRoute && !session) {
    const locale = pathname.split("/")[1];
    return NextResponse.redirect(new URL(`/${locale}/sign-in`, req.url));
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: [
    "/((?!api/auth|api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
