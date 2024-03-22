import { i18nRouter } from "next-i18n-router";
import i18nConfig from "../i18nConfig";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return i18nRouter(request, i18nConfig);
}

// only applies this middleware to files in the app directory
export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - static (static files)
   * - . (hidden files)
   * - _next (image optimization files)
   * - studio
   */
  matcher: "/((?!api|static|.*\\..*|_next|_next/static|studio|favicon.ico).*)",
  // matcher: ["/((?!api|static|_next/static|_next/image|favicon.ico|studio).*)"],
};
