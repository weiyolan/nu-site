import { defineType, defineField } from "sanity";
import { supportedLanguages, uiLanguage } from "../../i18n/supportedLanguages";
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
      components: { field: CustomTitle },
    })
  ),
});

