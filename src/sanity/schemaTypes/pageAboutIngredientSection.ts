import { defineField, defineType } from "sanity";
// import { defineField, defineType } from "@sanity-typed/types";
import { uiLanguage } from "../../i18n/supportedLanguages";
import { Blend } from "lucide-react";

export default defineType({
  name: "aboutIngredientSection",
  title: "Ingrédients",
  type: "object",
  icon: Blend,
  fieldsets: [{ title: "Catégories", name: "category", options: { columns: 2 } }],
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
      name: "majorTitle",
      title: "Text Principal",
      // initialValue:{en:'Get Your Own Experience', nl:'Ervaar Het Zelf'},
      type: "localeString",
      fieldset: "category",
      // options: {collapsible: true, collapsed: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "minorTitle",
      title: "Text Additif",
      // initialValue:{en:'Get Your Own Experience', nl:'Ervaar Het Zelf'},
      type: "localeString",
      fieldset: "category",
      // options: {collapsible: true, collapsed: true},
      validation: (Rule) => Rule.required(),
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
