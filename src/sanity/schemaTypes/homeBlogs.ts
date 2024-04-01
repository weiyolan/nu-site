import { defineType, defineField } from "sanity";
import { uiLanguage } from "../supportedLanguages";
import { BookOpen, SwatchBook } from "lucide-react";
// import { ListCollapse , Rows3} from "lucide-react";
// import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export default defineType({
  name: "homeBlogs",
  title: "Blogs",
  type: "object",
  icon: BookOpen,
  readOnly: true,
  deprecated: { reason: "Les blogs ne sont pas activent pour l'instant." },
  // orderings: [orderRankOrdering],
  fieldsets: [{ title: "Paramètres", name: "settings" }],
  fields: [
    // orderRankField({ type: "shopSection" }),
    defineField({
      title: "Titre Intégré",
      description: "Activer pour afficher un titre coloré intégré dans la liste.",
      name: "integrated",
      type: "boolean",
      initialValue: true,
      fieldset: "settings",
      validation: (Rule) => Rule.required(),
    }),
    // defineField({
    //   name: "category",
    //   type: "optionsCategory",
    //   fieldset: "settings",
    //   validation: (Rule) => Rule.required(),
    //   // initialValue:'',
    // }),
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
    defineField({
      title: "Bouton",
      // description: "Ceci est automatiquement désactivé sur la page shop",
      name: "button",
      type: "link",
      hidden: ({ document }) => !document?.integrated,
      // validation: (Rule) => Rule.required(),
      // initialValue:'',
    }),
    defineField({
      name: "colors",
      type: "optionsColors",
      hidden: ({ document }) => !document?.integrated,
      // validation: (Rule) => Rule.required(),
      // initialValue:'',
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
