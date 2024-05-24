import { defineType, defineField } from "sanity";
import { uiLanguage } from "../../i18n/supportedLanguages";
import { ChevronDown } from "lucide-react";

export default defineType({
  title: "Item",
  name: "accordionItem",
  type: "object",
  icon: ChevronDown,
  options: { collapsible: true, collapsed: false },
  preview: {
    select: {
      title: "title",
      description: "description",
    },
    //
    prepare(selection) {
      const { title, description } = selection;
      // console.log(description?.[uiLanguage.id]?.[0].children[0]);
      return { title: title[uiLanguage.id], subtitle: description?.[uiLanguage.id]?.[0].children?.[0]?.text || "A mettre à jour." };
    },
  },
  fields: [
    defineField({
      name: "title",
      title: uiLanguage.id === "en" ? "Title" : uiLanguage.id === "fr" ? "Titre" : "Titel",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: uiLanguage.id === "en" ? "Description" : uiLanguage.id === "fr" ? "Déscription" : "Beschrijving",
      type: "localeBlockContent",
      // description: 'A simple description of what is shown on the picture for people using screenreaders.',
      validation: (Rule) => Rule.required(),
    }),
  ],
});
