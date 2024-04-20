import { defineField, defineType } from "sanity";
import { uiLanguage } from "../supportedLanguages";
import { InfoIcon, SquareGantt } from "lucide-react";

export default defineType({
  name: "productExtraInfo",
  title: "Info",
  type: "object",
  icon: InfoIcon,
  preview: {
    select: {
      title: `title`,
      description: "description",
    },
    prepare(selection) {
      const { title, description } = selection;
      return { title: title[uiLanguage.id], subtitle: description[uiLanguage.id] };
    },
  },
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Contenu",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
