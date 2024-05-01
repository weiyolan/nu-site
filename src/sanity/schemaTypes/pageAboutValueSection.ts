import { defineField, defineType } from "sanity";
// import { defineField, defineType } from "@sanity-typed/types";
import { uiLanguage } from "../../i18n/supportedLanguages";
import { Blend } from "lucide-react";

export default defineType({
  name: "aboutValuesSection",
  title: "Valeurs",
  type: "object",
  icon: Blend,
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
      name: "prefix",
      title: "Prefix",
      // initialValue:{en:'Get Your Own Experience', nl:'Ervaar Het Zelf'},
      type: "localeString",
      // options: {collapsible: true, collapsed: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "values",
      title: "Valeurs",
      // initialValue:{en:'Get Your Own Experience', nl:'Ervaar Het Zelf'},
      type: "array",
      of: [{ type: "aboutValue" }],
      // description: "De gauche à droite, la troisième est horizontale",
      // options: {collapsible: true, collapsed: true},
      validation: (Rule) => Rule.required().length(4),
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
