import { defineType, defineField } from "sanity";
import { LinkIcon } from "@sanity/icons";
import { uiLanguage } from "../supportedLanguages";

export default defineType({
  name: "ecology",
  title: uiLanguage.id === "en" ? "Ecology" : uiLanguage.id === "fr" ? "Écologie" : "Ecologie",
  type: "object",
  options: { collapsible: true, collapsed: true },
  icon: LinkIcon,
  fields: [
    defineField({
      name: "title",
      title: uiLanguage.id === "en" ? "Title" : uiLanguage.id === "fr" ? "Titre" : "Titel",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: uiLanguage.id === "en" ? "Description" : uiLanguage.id === "fr" ? "Déscription" : "Tekst",
      type: "localeText",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cards",
      title: "Valeurs",
      type: "array",
      of:[{type:'ecologyCard'}],
      validation: (Rule) =>
        Rule.required()
    }),
  ],
  preview: {
    select: {
      title: `title.${uiLanguage.id}`,
      // url: "url",
    }
  },
});
