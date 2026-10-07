import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("is_logged_in")?.value;

  const isAuthPage =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");
  const isDashboardPage = pathname.startsWith("/dashboard");

  console.log(
    `[Middleware] Кликнули по ссылке: ${pathname}. Токен найден: ${!!token}`,
  );

  if (!token && isDashboardPage) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/sign-in", "/sign-up"],
};
