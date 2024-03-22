import { defineField, defineType } from "sanity";
import { uiLanguage } from "../supportedLanguages";
import {   SquareGantt } from "lucide-react";

export default defineType({
  name: "productDetail",
  title: "Paragraph",
  type: "object",
  icon:SquareGantt,
  preview: {
    select: {
      title: `title`,
    },
    prepare(selection) {
      const { title} = selection;
      return {title: title[uiLanguage.id]};
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
      name: "details",
      title: "Contenu",
      type: "localeBlockContent",
      validation: (Rule) => Rule.required(),
    })
  ],
});
