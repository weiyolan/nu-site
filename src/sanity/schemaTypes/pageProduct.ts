import { defineField, defineType } from "sanity";
import { Package, StarIcon } from "lucide-react";
import { uiLanguage } from "../../i18n/supportedLanguages";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export default defineType({
  name: "product",
  title: "Produits",
  type: "document",
  icon: Package,
  orderings: [orderRankOrdering],
  groups: [
    {
      name: "specs1",
      title: "Infos Primaires",
    },
    {
      name: "specs2",
      title: "Infos Secondaires",
    },
    {
      name: "details",
      title: "Détails Techniques",
    },
    {
      name: "review",
      title: "Infos Avis",
    },
    {
      name: "images",
      title: "Images",
    },
    {
      name: "seo",
      title: "SEO",
    },
    {
      name: "specs3",
      title: "Temporaires",
    },
  ],
  fieldsets: [
    {
      name: "specs",
      title: "Spécifications",
      options: { collapsible: true, collapsed: false, columns: 2 },
    },
  ],
  preview: {
    select: {
      title: "title",
      price: "price",
      category: "category",
      favorite: "favorite",
      // by: 'by',
      // date: 'date',
      media: "images",
    },

    prepare(selection) {
      const { title, favorite, category, price, media } = selection;
      return { title: `${title[uiLanguage.id]}${favorite ? " ★" : ""}`, subtitle: `€${price}, ${category}`, media: media[0].image.asset };
    },
  },
  fields: [
    orderRankField({ type: "shopSection" }),
    defineField({
      name: "price",
      title: "Prix (€)",
      // description: "En €",
      fieldset: "specs",
      type: "number",
      group: "specs1",
      validation: (Rule) => Rule.required().positive().precision(2),
    }),
    defineField({
      name: "favorite",
      title: "Produit Préféré",
      type: "boolean",
      fieldset: "specs",
      group: "specs1",
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      // title: "Catégorie",
      type: "optionsCategory",
      // group: "details",
      group: "specs1",
      fieldset: "specs",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "color",
      title: "Couleur Thème",
      // description: "En €",
      fieldset: "specs",
      group: "specs1",
      type: "optionsColors",
      // group: "details",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Titre",
      type: "localeString",
      // group: "details",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subTitle",
      title: "Sous-titre",
      type: "localeString",
      // description: "",
      // group: "details",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "specs1",
      description: "Ceci vient ici: www.nu-cosmtique.com/shop/[slug]. ",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description",
      options: { collapsed: false, collapsable: true },
      type: "localeText",
      // group: "specs",
      validation: (Rule) => Rule.required(),
    }),

    // =============DETAILS FIELDSET=======================

    // defineField({
    //   name: "date",
    //   title: "Date",
    //   type: "date",
    //   fieldset: "details",
    //   // options: {dateFormat: 'YYYY',calendarTodayLabel: 'Today'},
    // }),

    // defineField({
    //   name: "images",
    //   title: "Main Image",
    //   type: "altImage",
    //   group: ["details", "images"],
    //   validation: (Rule) => Rule.required(),
    // }),

    defineField({
      name: "rating",
      title: "Rating (%)",
      // description: "Chiffre entre 0-5",
      // fieldset: "specs",
      type: "number",
      group: "specs3",
      validation: (Rule) => Rule.required().min(0).max(1),
    }),
    // defineField({
    //   name: "weight",
    //   title: "Poid (g)",
    //   // description: "En gram",
    //   // fieldset: "specs",
    //   type: "number",
    //   group: "specs2",
    //   validation: (Rule) => Rule.required().positive(),
    // }),

    defineField({
      name: "extraInfo",
      title: "Infos Secondaires",
      type: "array",
      group: "specs2",
      of: [{ type: "productExtraInfo" }],
    }),
    defineField({
      name: "reviews",
      title: "Avis",
      options: { collapsed: true },
      type: "reviews",
      group: "review",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "details",
      title: "Details Techniques",
      type: "array",
      group: ["details"],
      of: [
        {
          type: "productDetail",
        },
      ],
      // options:{modal:{type:'dialog'}},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Images du produit",
      description: "L'image principal en premier dans la liste.",
      type: "array",
      of: [{ type: "altImage" }],
      group: ["images"],
      // group: 'images',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: ["seo"],
      validation: (Rule) => Rule.required(),
    }),
  ],
});

// function getTitle(title: string, subTitle: string) {
//   if (title === undefined && subTitle === undefined) {
//     return "No title given";
//   } else if (subTitle === undefined) {
//     return `${title}`;
//   } else if (title === undefined) {
//     return `... (${subTitle})`;
//   } else {
//     return `${title} (${subTitle})`;
//   }
// }

// function getSubTitle(cat: string, by: string, date: string) {
//   let tekst = "";

//   tekst = tekst + (cat === undefined ? "Category?, " : `${cat}, `);
//   tekst = tekst + (date === undefined ? "Date?, " : `${date?.slice(0, 4)}, `);
//   tekst = tekst + (by === undefined ? "By?" : `By ${by}`);

//   return tekst;
// }
