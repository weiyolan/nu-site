import { defineType, defineField } from "sanity";
import { uiLanguage } from "../supportedLanguages";
import { MousePointerClick } from "lucide-react";
// import { supportedLanguages } from "./supportedLanguages";

export default defineType({
  name: "navigationButtonTrigger",
  title: "Bouton Simple",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "Lien",
      type: "url",
      validation: (Rule) =>
        Rule.required().uri({
          allowRelative: true,
          relativeOnly: true,
        }),
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      // const {date, completion} = selection
      return { title: title[uiLanguage.id], media: MousePointerClick };
    },
  },
});
