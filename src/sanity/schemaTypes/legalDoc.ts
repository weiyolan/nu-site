import { Scale } from "lucide-react";
import { defineType, defineField } from "sanity";

export default defineType({
  name: "legalDoc",
  title: "Documents",
  icon: Scale,
  type: "document",
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: "title",
      title: "Document Title",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "document",
      title: "File",
      type: "localeFile",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare(selection) {
      const { title } = selection;
      return { title: title?.en };
    },
  },
});
