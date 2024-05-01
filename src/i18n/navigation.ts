import { createLocalizedPathnamesNavigation, createSharedPathnamesNavigation } from "next-intl/navigation";

import { locales, localePrefix, pathnames } from "./supportedLanguages";

// export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({ locales, localePrefix });

export const { Link, redirect, usePathname, useRouter, getPathname } = createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames });
