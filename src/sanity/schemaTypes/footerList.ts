import { defineType, defineField } from "sanity";
import { uiLanguage } from "../supportedLanguages";

export default defineType({
  name: "footerList",
  title: "Footer List",
  type: "object",
  options: { collapsible: true, collapsed: true },
  // groups: [{ name: "image", title: "Image" }],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "links",
      title: "Items",
      type: "array",
      of: [{ type: "link" }, { type: "linkDoc" }],
      //
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      // links:'links',
    },
    prepare(selection) {
      const { title } = selection;
      return { title: title[uiLanguage.id] };
    },
  },
});
