import { defineType, defineField } from "sanity";
import { LinkIcon } from "@sanity/icons";

export default defineType({
  name: "linkDoc",
  title: "Document Link",
  type: "object",
  options: { collapsible: true, collapsed: true },
  icon: LinkIcon,
  fields: [
    // defineField({
    //   name: "ext",
    //   title: "External",
    //   // description: "Aanzetten als de link naar een externe site verwijst.",
    //   type: "boolean",
    //   initialValue: true,
    //   validation: (Rule) => Rule.required(),
    // }),
    defineField({
      name: "text",
      title: "Text",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ref",
      title: "Link",
      type: "reference",
      to: [{ type: "legalDoc" }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      text: "text",
      // url: "url",
    },
    prepare(selection) {
      const { text } = selection;
      // return { title: text?.en ? `${text?.en} - url: ${url}` : "loading.." };
      return { title: text?.en };
    },
  },
});
