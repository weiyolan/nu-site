import { defineType, defineField } from "sanity";
import { uiLanguage } from "../../i18n/supportedLanguages";
import { ArrowDownLeft, ArrowDownRight, ArrowUpLeft, ArrowUpRight, Stars } from "lucide-react";
// import { ListCollapse , Rows3} from "lucide-react";
// import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export default defineType({
  name: "homeProductPresentation",
  title: "Présentation Produits",
  type: "object",
  icon: Stars,
  options: {},
  groups: [
    { title: "Gauche en Haut", name: "topLeft", icon: ArrowUpLeft },
    { title: "Droit en Haut", name: "topRight", icon: ArrowUpRight },
    { title: "Gauche en Bas", name: "downLeft", icon: ArrowDownLeft },
    { title: "Droit en Bas", name: "downRight", icon: ArrowDownRight },
  ],
  fields: [
    defineField({
      title: "Titre",
      name: "title",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Description",
      name: "description",
      type: "localeText",
      validation: (Rule) => Rule.required(),
    }),
    // defineField({
    //   name: "colors",
    //   type: "optionsColors",
    //   hidden: ({ document }) => !document?.integrated,
    //   // validation: (Rule) => Rule.required(),
    //   // initialValue:'',
    // }),
    defineField({
      title: "Gauche En Haut",
      icon: ArrowUpLeft,
      name: "topLeft",
      type: "homeProductPresentationItem",
      group: "topLeft",
    }),
    defineField({
      title: "Droit En Haut",
      icon: ArrowUpRight,
      name: "topRight",
      type: "homeProductPresentationItem",
      group: "topRight",
    }),
    defineField({
      title: "Gauche En Bas",
      icon: ArrowDownLeft,
      name: "bottomLeft",
      type: "homeProductPresentationItem",
      group: "downLeft",
    }),
    defineField({
      title: "Droit En Bas",
      icon: ArrowDownRight,
      name: "bottomRight",
      type: "homeProductPresentationItem",
      group: "downRight",
    }),
  ],
  preview: {
    select: { title: "title", integrated: "integrated" },
    prepare(selection) {
      const { title, integrated } = selection;
      return { title: `${title[uiLanguage.id]}`, subtitle: `${integrated ? "Titre coloré et parmis les produits" : "Titre séparé au-dessus la liste"}` };
    },
  },
});
