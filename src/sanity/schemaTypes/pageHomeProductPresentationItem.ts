import { defineType, defineField } from "sanity";
import { uiLanguage } from "../../i18n/supportedLanguages";
import { Stars } from "lucide-react";
// import { ListCollapse , Rows3} from "lucide-react";
// import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export default defineType({
  name: "homeProductPresentationItem",
  title: "Présentation Produit",
  type: "object",
  // icon: Stars,
  options: { collapsed: false, collapsible: true },
  fieldsets: [{ title: "Bouton", name: "button" }],
  fields: [
    defineField({
      title: "Image",
      name: "altImage",
      type: "altImage",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Titre",
      name: "title",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    // defineField({
    //   title: "Sous-titre",
    //   name: "subTitle",
    //   type: "localeString",
    //   // validation: (Rule) => Rule.required(),
    // }),
    defineField({
      title: "Description",
      name: "description",
      type: "localeText",
      // validation: (Rule) => Rule.max(220).warning("Restez au point pour garder tes visiteurs curieux."),
    }),

    defineField({
      title: "Text du Bouton",
      name: "button",
      type: "localeString",
      validation: (Rule) => Rule.required(),
      fieldset: "button",
    }),
    defineField({
      title: "Lien",
      name: "url",
      type: "reference",
      to: [{ type: "product" }],
      validation: (Rule) => Rule.required(),
      fieldset: "button",
    }),
    // defineField({
    //   name: "colors",
    //   type: "optionsColors",
    //   hidden: ({ document }) => !document?.integrated,
    // }),
  ],

  preview: {
    select: { title: "title", image: "image" },
    prepare(selection) {
      const { title, image } = selection;
      return { title: `${title[uiLanguage.id]}`, media: image.image };
    },
  },
});
