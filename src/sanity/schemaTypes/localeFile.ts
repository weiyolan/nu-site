import { defineType, defineField } from "sanity";
import { supportedLanguages, uiLanguage } from "../../i18n/supportedLanguages";
import CustomTitle from "../lib/localeCustomTitle";

export default defineType({
  title: "Localized File",
  name: "localeFile",
  description: "Wait untill uploading is completed before publishing.",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fieldsets: [
    {
      title: uiLanguage.id === "en" ? "Translations" : uiLanguage.id === "fr" ? "Traductions" : "Vertalingen",
      name: "translations",
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: supportedLanguages.map((lang) =>
    defineField({
      title: lang.title,
      name: lang.id,
      type: "file",
      // // fieldset: 'translations',
      // fieldset: lang.isDefault ? null : 'translations',
      validation: (Rule) => Rule.required(),
      components:{field:CustomTitle}
    })
  ),
});
