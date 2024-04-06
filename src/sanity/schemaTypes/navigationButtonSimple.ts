import { defineType, defineField } from "sanity";
import { uiLanguage } from "../supportedLanguages";
import { MousePointerClick } from "lucide-react";
// import { supportedLanguages } from "./supportedLanguages";

export default defineType({
  name: "navigationButtonSimple",
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
      name: "description",
      title: "Sous-titre",
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
    select: { title: "title", description: "description" },
    prepare({ title, description }) {
      // const {date, completion} = selection
      return { title: title[uiLanguage.id], subtitle: description[uiLanguage.id], media: MousePointerClick };
    },
  },
});
