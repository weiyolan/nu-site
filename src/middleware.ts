import createMiddleware from "next-intl/middleware";
import { defaultLanguage, locales, localePrefix, supportedLanguages, pathnames } from "./i18n/supportedLanguages";

export default createMiddleware({
  defaultLocale: defaultLanguage.id,
  // A list of all locales that are supported
  locales,
  alternateLinks: true,
  // Used when no locale matches
  localePrefix,
  // localized pathnames
  pathnames,
});

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

  /*
   * Match only internationalized pathnames
   */
  // matcher: [
  //   "/",
  //   `/(${supportedLanguages
  //     .map((lang) => lang.id)
  //     .reduce((acc, lang) => {
  //       return acc + "|" + lang;
  //     })})/:path*`,
  // ], // "/(fr|en)/:path*"
  // matcher: [`/(${locales.join("|")})/:path*`, "/((?!api|static|.*\\..*|_next|studio|favicon.ico).*)"],
};
