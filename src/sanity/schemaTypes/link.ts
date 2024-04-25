import { defineType, defineField } from "sanity";
import { LinkIcon } from "@sanity/icons";
import { uiLanguage } from "../supportedLanguages";

export default defineType({
  name: "link",
  title: uiLanguage.id === "en" ? "Link" : uiLanguage.id === "fr" ? "Lien" : "Link",
  type: "object",
  options: { collapsible: true, collapsed: true },
  icon: LinkIcon,
  fields: [
    // defineField({
    //   name: "ext",
    //   title: uiLanguage.id === "en" ? "External" : uiLanguage.id === "fr" ? "Lien externe" : "Externe link",
    //   description:
    //     uiLanguage.id === "en"
    //       ? "Toggle on when referring to another website"
    //       : uiLanguage.id === "fr"
    //         ? "Allumer si le lien est vers un site externe."
    //         : "Aanzetten als de link naar een externe site verwijst.",
    //   type: "boolean",
    //   initialValue: false,
    //   validation: (Rule) => Rule.required(),
    // }),
    defineField({
      name: "text",
      title: uiLanguage.id === "en" ? "Text" : uiLanguage.id === "fr" ? "Text" : "Tekst",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      // title: "",
      type: "url",
      validation: (Rule) =>
        Rule.required().uri({
          allowRelative: true,
          scheme: ["http", "https", "mailto", "tel"],
        }),
    }),
  ],
  preview: {
    select: {
      text: "text",
      url: "url",
    },
    prepare(selection) {
      const { text } = selection;
      // return { title: text?.en ? `${text?.en} - url: ${url}` : "loading.." };
      return { title: text?.en ? `${text?.en}` : "loading.." };
    },
  },
});
