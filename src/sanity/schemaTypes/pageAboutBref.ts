import { defineField, defineType } from "sanity";
// import { defineField, defineType } from "@sanity-typed/types";
import { uiLanguage } from "../supportedLanguages";
import { Blend, Carrot, Handshake } from "lucide-react";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export default defineType({
  name: "aboutBref",
  title: "Bref",
  type: "object",
  icon: Handshake,
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      // initialValue:{en:'Get Your Own Experience', nl:'Ervaar Het Zelf'},
      type: "localeString",
      // options: {collapsible: true, collapsed: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Sous-titre",
      // initialValue:{en:'Get Your Own Experience', nl:'Ervaar Het Zelf'},
      type: "localeText",
      // options: {collapsible: true, collapsed: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Bouton",
      name: "button",
      type: "link",
      validation: (Rule) => Rule.required(),
      // initialValue:'',
    }),
    defineField({
      name: "altImages",
      description: "Deux images, le premier devant.",
      title: "Images",
      type: "array",
      of: [{ type: "altImage" }],
      validation: (Rule) => Rule.required().length(2),
    }),
  ],
  preview: {
    select: { title: "title", description: "description" },
    prepare({ title, description }) {
      // const {date, completion} = selection
      return { title: title?.[uiLanguage.id], subtitle: description?.[uiLanguage.id] };
    },
  },
});
