import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createIntlMiddleware(routing);

export default function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get("showcase-auth")?.value;
  const pathname = request.nextUrl.pathname;

  const isDashboardPage = pathname.includes("/dashboard");
  const isHomePage =
    pathname === "/" ||
    routing.locales.some((locale) => pathname === `/${locale}`);

  if (isDashboardPage && !isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isHomePage && isAuthenticated) {
    const localePrefix = routing.locales.find((locale) =>
      pathname.startsWith(`/${locale}`),
    );
    return NextResponse.redirect(
      new URL(`${localePrefix}/dashboard`, request.url),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return intlMiddleware(request as any);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
