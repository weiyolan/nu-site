import { defineType, defineField } from "sanity";
import { uiLanguage } from "../supportedLanguages";

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
    // select: {
    //   title: "title",
    // },
    prepare() {
      // const { title } = selection;
      return { title: "Newsletter" };
    },
  },
});
