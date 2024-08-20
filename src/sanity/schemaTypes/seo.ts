import { defineType, defineField } from "sanity";
import { LinkIcon } from "@sanity/icons";
import { uiLanguage } from "../../i18n/supportedLanguages";

export default defineType({
  name: "seo",
  title: "Page SEO",
  type: "object",
  options: { collapsible: true, collapsed: false },
  icon: LinkIcon,
  fields: [
    defineField({
      name: "title",
      title: uiLanguage.id === "en" ? "Page Title" : uiLanguage.id === "fr" ? "Titre" : "Titel",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: uiLanguage.id === "en" ? "Description" : uiLanguage.id === "fr" ? "Déscription" : "Description",
      type: "localeText",
      description: uiLanguage.id === "fr" ? "C'est conseillé d'avoir un maximum de 80 charactères" : "It is preferred to write a maximum of 80 characters.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
    },
    prepare(selection) {
      const { title, description } = selection;
      // return { title: text?.en ? `${text?.en} - url: ${url}` : "loading.." };
      return {
        title: title?.[uiLanguage.id] ? `${title?.[uiLanguage.id]}` : "loading..",
        description: description?.[uiLanguage.id] ? `${description?.[uiLanguage.id]}` : "",
      };
    },
  },
});
