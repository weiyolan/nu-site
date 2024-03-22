import { defineType, defineField } from "sanity";
import { uiLanguage } from "../supportedLanguages";

export default defineType({
  name: "footerQuote",
  title: "Quote",
  type: "object",
  options: { collapsible: false },
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "by",
      title: uiLanguage.id === "fr" ? "Par" : "By",
      type: "localeString",
      //
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      // const { title } = selection;
      return { title: "Quote" };
    },
  },
});
