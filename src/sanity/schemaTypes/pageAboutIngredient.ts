import { defineField, defineType } from "sanity";
// import { defineField, defineType } from "@sanity-typed/types";
import { uiLanguage } from "../../i18n/supportedLanguages";
import { Blend, Carrot } from "lucide-react";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export default defineType({
  name: "aboutIngredient",
  title: "Ingrédients",
  type: "document",
  icon: Carrot,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "aboutIngredient" }),
    defineField({
      name: "category",
      title: "Catégorie",
      // initialValue:{en:'Get Your Own Experience', nl:'Ervaar Het Zelf'},
      type: "optionsIngredient",
      // options: {collapsible: true, collapsed: true},
      validation: (Rule) => Rule.required(),
    }),
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
      title: "Déscription",
      // initialValue:{en:'Get Your Own Experience', nl:'Ervaar Het Zelf'},
      type: "localeBlockContent",
      // options: {collapsible: true, collapsed: true},
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", description: "description", category: "category" },
    prepare({ title, description, category }) {
      // const {date, completion} = selection
      return { title: title?.[uiLanguage.id], subtitle: category === "major" ? "A" : "B" };
    },
  },
});
