import { defineType, defineField } from "sanity";
import { uiLanguage } from "../../i18n/supportedLanguages";

export default defineType({
  name: "footerNewsletter",
  title: "Newsletter",
  type: "object",
  options: { collapsible: false },
  // groups: [{ name: "image", title: "Image" }],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localeString",
      options: { collapsible: false },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "localeString",
      // of: [{ type: "link" }, { type: "linkDoc" }],
      //
      options: { collapsible: false },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "confidential",
      title: "Politique de confidentialité",
      type: "linkDoc",
      options: { collapsible: false },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "general",
      title: "Conditions générals",
      type: "linkDoc",
      validation: (Rule) => Rule.required(),
    }),
    // defineField({
    //   name: "placeholder",
    //   title: "Mail Exemple",
    //   type: "localeString",
    //   // of: [{ type: "link" }, { type: "linkDoc" }],
    //   //
    //   validation: (Rule) => Rule.required(),
    // }),
  ],
  preview: {
    select: {
      title: "title",
      description:'description',
    },
    prepare({title,description}) {
      // const { title } = selection;
      return { title: title?.[uiLanguage.id], subTitle:description?.[uiLanguage.id] };
    },
  },
});
