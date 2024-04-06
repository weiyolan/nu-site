import { defineType, defineField } from "sanity";
// import { supportedLanguages } from "./supportedLanguages";

export default defineType({
  name: "navigationBar",
  title: "Navigation Menu",
  type: "object",
  fields: [
    defineField({
      name: "logoToggle",
      title: "Afficher Logo",
      description: "Activez pour afficher le logo",
      type: "boolean",
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "links",
      title: "Liens",
      type: "array",
      of: [{ type: "navigationButtonTrigger" }, { type: "navigationButtonComplex" }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      // const {date, completion} = selection
      return { title: "Bar Navigation" };
    },
  },
});
