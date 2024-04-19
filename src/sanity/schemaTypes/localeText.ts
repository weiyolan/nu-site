import { defineType, defineField } from "sanity";
import { supportedLanguages, uiLanguage } from "../supportedLanguages";
import CustomTitle from "../lib/localeCustomTitle";


export default defineType({
  title: "Localized text",
  name: "localeText",
  type: "object",
  options: { collapsible: false, collapsed: false },
  fieldsets: [
    {
      title: uiLanguage.id === "en" ? "Translations" : uiLanguage.id === "fr" ? "Traductions" : "Vertalingen",
      name: "translations",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: supportedLanguages.map((lang) =>
    defineField({
      title: lang.title,
      name: lang.id,
      type: "text",
      // options: {},
      // fieldset: 'translations',
      fieldset: lang.isDefault ? undefined : "translations",
      // validation: (Rule) => Rule.required(),
      validation: (Rule) => Rule.max(220).warning("Restez au point pour garder tes visiteurs curieux."),
      components: { field: CustomTitle },
    })
  ),
});

