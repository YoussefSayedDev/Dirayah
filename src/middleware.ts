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

  const isOnboardingRoute = pathnameWithoutLocale.startsWith("/onboarding");

  const isDashboardRoute = pathnameWithoutLocale.startsWith("/dashboard");

  // Redirect authenticated users away from auth routes
  if (isAuthRoute && session) {
    const locale = pathname.split("/")[1];

    // If onboarding is not completed, redirect to onbaording
    if (!session.user?.onboardingCompleted) {
      return NextResponse.redirect(new URL(`/${locale}/onboarding`, req.url));
    }

    return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url));
  }

  // Redirect unauthenticated users away from protected routes
  if (isDashboardRoute && !session) {
    const locale = pathname.split("/")[1];
    return NextResponse.redirect(new URL(`/${locale}/sign-in`, req.url));
  }

  // Handle onboarding flow
  if (session) {
    // If onboarding is completed but user is on onboarding route, redirect to dashboard
    if (session.user?.onboardingCompleted && isOnboardingRoute) {
      const locale = pathname.split("/")[1];
      return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url));
    }

    // If onboarding is not completed but user is on dashboard, redirect to onboarding
    if (!session.user?.onboardingCompleted && isDashboardRoute) {
      const locale = pathname.split("/")[1];
      return NextResponse.redirect(new URL(`/${locale}/onboarding`, req.url));
    }

    // Role-based access control for dashboard routes
    if (isDashboardRoute) {
      const role = session.user.role;

      // Admin-only routes
      if (pathnameWithoutLocale.startsWith("/admin") && role !== "admin") {
        const locale = pathname.split("/")[1];
        return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url));
      }

      // Teacher-only routes
      if (
        pathnameWithoutLocale.includes("/teacher") &&
        role !== "teacher" &&
        role !== "admin"
      ) {
        const locale = pathname.split("/")[1];
        return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url));
      }
    }
  }

  return intlMiddleware(req);

  // // check if the current path is a public route (conssidering locale prefixes)
  // const isPublicRoute = publicRoutes.some(
  //   (route) => pathname.endsWith(route) || pathname.includes(`${route}/`),
  // );

  // // Properly verify the token if it exists
  // const isValidToken = true; // TODO: Change this when implementing authentication

  // // Handle authentication logic
  // if (!isValidToken && !isPublicRoute) {
  //   // User is not authenticated and trying to access a protected route
  //   // Redirect to sign-in page while preserving the locale
  //   const locale = pathname.split("/")[1];
  //   const signInUrl = new URL(`/${locale}/sign-in`, req.url);

  //   // Add return URL as a query parameter for redirect after sign-in
  //   signInUrl.searchParams.set("returnUrl", pathname);

  //   return NextResponse.redirect(signInUrl);
  // }

  // For all other cases, apply the internationalization middleware
  return intlMiddleware(req);
}

export const config = {
  // Match all public pages except API routes and static files
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
