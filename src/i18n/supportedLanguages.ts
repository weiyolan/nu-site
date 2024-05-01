import { Pathnames } from "next-intl/navigation";

export const supportedLanguages = [
  { id: "fr", title: "Français", isDefault: true },
  // { id: 'no', title: 'Norwegian' },
  { id: "en", title: "English" },
];

// https://next-intl-docs.vercel.app/docs/routing/navigation
export const pathnames = {
  // If all locales use the same pathname, a
  // single external path can be provided.
  "/": "/",
  "/shop": "/shop",

  // Dynamic params are supported via square brackets
  "/shop/[slug]": {
    en: "/shop/[slug]",
    fr: "/shop/[slug]",
  },
  // If locales use different paths, you can
  // specify each external path per locale.
  "/apropos": {
    en: "/about",
    fr: "/apropos",
  },
  "/aide": {
    en: "/help",
    fr: "/aide",
  },

  // "/shop/[...slug]": "/shop/[...slug]",
} satisfies Pathnames<typeof locales>;

export const locales = supportedLanguages.map((lang) => lang.id);
export const localePrefix = "as-needed"; // Default = "always" https://next-intl-docs.vercel.app/docs/routing/navigation
export const defaultLanguage = supportedLanguages.filter((language) => language.isDefault === true)[0];
export const uiLanguage = { id: "fr", title: "Français" };
