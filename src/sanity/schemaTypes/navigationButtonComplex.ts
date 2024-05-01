import { defineType, defineField } from "sanity";
import { uiLanguage } from "../../i18n/supportedLanguages";
import { MousePointerClick } from "lucide-react";
// import { supportedLanguages } from "./supportedLanguages";

export default defineType({
  name: "navigationButtonComplex",
  title: "Bouton Complex",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "Lien",
      type: "url",
      validation: (Rule) =>
        Rule.required().uri({
          allowRelative: true,
          relativeOnly: true,
        }),
    }),
    defineField({
      name: "links",
      title: "Boutons",
      type: "array",
      of: [{ type: "navigationButtonSimple" }],
      description: "4 boutons, le premier sera en grand",
      validation: (Rule) => Rule.required().length(4),
    }),
    defineField({
      name: "color",
      title: "Couleur",
      type: "optionsColors",
      // of: [{ type: "navigationButtonSimple" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "altImage",
      title: "Image",
      type: "altImage",
      description: "L'image masque la couleur",
      // of: [{ type: "navigationButtonSimple" }],
    }),
  ],
  preview: {
    select: { title: "title", links: "links" },
    prepare({ title, links }) {
      // const {date, completion} = selection
      return { title: title[uiLanguage.id], subtitle: links.map((link) => link.title[uiLanguage.id]).reduce((acc, i) => i + ", " + acc, ""), media: MousePointerClick };
    },
  },
});
