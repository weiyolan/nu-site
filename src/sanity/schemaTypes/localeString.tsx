import { defineType, defineField,  } from "sanity";
import { supportedLanguages, uiLanguage } from "../../i18n/supportedLanguages";
import CustomTitle from "../lib/localeCustomTitle";

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */

// const baseLanguage = supportedLanguages.find(l => l.isDefault)

export default defineType({
  title: "Localized string",
  name: "localeString",
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
      // title:' ',
      title: lang.title,
      name: lang.id,
      type: "string",
      // // fieldset: 'translations',
      fieldset: lang.isDefault ? undefined : 'translations',
      validation: (Rule) => Rule.required(),
      components:{field:CustomTitle}
    })
  ),
});
