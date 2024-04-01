import { defineField, defineType } from "sanity";
// import { defineField, defineType } from "@sanity-typed/types";
import { uiLanguage } from "../supportedLanguages";
import { LayoutGrid } from "lucide-react";

export default defineType({
  name: "aboutSquares",
  title: "Intro",
  type: "object",
  groups: [
    { name: "images", title: "Images" },
    { name: "squares", title: "Rectangles" },
  ],
  icon: LayoutGrid,
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
      name: "altImages",
      title: "Images",
      group: "images",
      // initialValue:{en:'Get Your Own Experience', nl:'Ervaar Het Zelf'},
      type: "array",
      of: [{ type: "altImage" }],
      description: "De gauche à droite, la troisième est horizontale",
      // options: {collapsible: true, collapsed: true},
      validation: (Rule) => Rule.required().length(3),
    }),
    defineField({
      name: "colors",
      title: "Couleurs",
      type: "array",
      group: "squares",
      of: [{ type: "optionsColors" }],
      description: "De gauche à droite",
      validation: (Rule) => Rule.required().length(2),
    }),
    defineField({
      name: "square",
      title: "Text Encarré",
      group: "squares",
      // initialValue:{en:'Get Your Own Experience', nl:'Ervaar Het Zelf'},
      type: "object",
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
          title: "description",
          // initialValue:{en:'Get Your Own Experience', nl:'Ervaar Het Zelf'},
          type: "localeText",
          // options: {collapsible: true, collapsed: true},
          validation: (Rule) => Rule.required(),
        }),
      ],
      // options: {collapsible: true, collapsed: true},
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      // const {date, completion} = selection
      return { title: title?.[uiLanguage.id] };
    },
  },
});
