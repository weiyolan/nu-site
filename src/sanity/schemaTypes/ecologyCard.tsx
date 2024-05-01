import { defineType, defineField } from "sanity";
import { LinkIcon } from "@sanity/icons";
import { uiLanguage } from "../../i18n/supportedLanguages";
import { Icon } from "@iconify/react";
export default defineType({
  name: "ecologyCard",
  title: uiLanguage.id === "en" ? "Ecology" : uiLanguage.id === "fr" ? "Écologie" : "Ecologie",
  type: "object",
  options: { collapsible: true, collapsed: true },
  icon: LinkIcon,
  fields: [
    defineField({
      type: "icon",
      name: "icon",
      title: "Icon",
      options:{showName:true},
      description: "Tous les icons sur lucide.dev/icons",
    }),
    defineField({
      name: "title",
      title: uiLanguage.id === "en" ? "Title" : uiLanguage.id === "fr" ? "Titre" : "Titel",
      // options: { collapsed: false },
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: uiLanguage.id === "en" ? "Subtitle" : uiLanguage.id === "fr" ? "Sous-titre" : "Ondertitel",
      // options: { collapsed: false },
      type: "localeText",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "text",
      title: "Text",
      // options: { collapsed: false },
      type: "localeText",
      validation: (Rule) => Rule.required(),
    }),
    // defineField({
    //   name: "article",
    //   title: "Article Blog",
    //   type: "ref",
    //   validation: (Rule) => Rule.required(),
    // }),
  ],
  preview: {
    select: {
      icon: "icon",
      title: "title",
      description: "description",
    },
    prepare(selection) {
      const { title, description, icon } = selection;
      // return { title: text?.en ? `${text?.en} - url: ${url}` : "loading.." };
      return {
        title: title?.[uiLanguage.id] || "En cours de création",
        subtitle: description?.[uiLanguage.id] || "...",
        media: icon && <Icon icon={icon.name} />,
      };
    },
  },
});
