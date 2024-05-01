import { defineType, defineField } from "sanity";
import { uiLanguage } from "../../i18n/supportedLanguages";
import { Stars } from "lucide-react";
// import { ListCollapse , Rows3} from "lucide-react";

export default defineType({
  name: "reviews",
  title: uiLanguage.id==="en"||"nl"?"Review Section":"Section Avis",
  type: "object",
  icon: Stars,
  options:{collapsible:true},
  fields: [
    defineField({
      title: "Citations",
      description:'Désactivez pour un affichage simple, sans citations.',
      name: "citationsOn",
      type: "boolean",
      initialValue:false,
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
  ],

  preview: {
    select: {citationsOn:'citationsOn', title: "title" },
    prepare(selection) {
      const { citationsOn, title } = selection;
      return { title: `${title[uiLanguage.id]}`, subtitle:`Citations ${citationsOn?'Activé':'Désactivé'}` };
    },
  },
});
