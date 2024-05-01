import { defineType, defineField } from "sanity";
import { uiLanguage } from "../../i18n/supportedLanguages";
// import { ListCollapse , Rows3} from "lucide-react";

export default defineType({
  name: "productRecommended",
  title: "Produits Recommandés",
  type: "object",
  fields: [
    defineField({
      title: "Titre Intégré",
      description: "Activer pour afficher un titre coloré intégré dans la liste.",
      name: "integrated",
      type: "boolean",
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),

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
      name: "color",
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
