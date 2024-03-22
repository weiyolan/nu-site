import { defineType, defineField } from "sanity";
import { supportedLanguages, uiLanguage } from "../supportedLanguages";
import CustomTitle, { CustomBlockTitle } from "../lib/localeCustomTitle";

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
  title: "Localized blockContent",
  name: "localeBlockContent",
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
      type: "blockContent",
      fieldset: lang.isDefault ? undefined : "translations",
      validation: (Rule) => Rule.required(),
      // components:{field:CustomTitle}

    })
  ),
});
