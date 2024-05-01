import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { supportedLanguages } from "./supportedLanguages";

// supportedLanguageIds = ["en", "fr", ...];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!supportedLanguages.map((lang) => lang.id).includes(locale as any)) {
    notFound();
  }

  return {
    // status: "OK",
    // messages: (await import(`../messages/${locale}.json`)).default,
  };
});
