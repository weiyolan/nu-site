import { defineField, defineType } from "sanity";
// import { defineField, defineType } from "@sanity-typed/types";
import { uiLanguage } from "../../i18n/supportedLanguages";
import { Blend } from "lucide-react";

export default defineType({
  name: "aboutValue",
  title: "Valeur",
  type: "object",
  icon: Blend,
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      // initialValue:{en:'Get Your Own Experience', nl:'Ervaar Het Zelf'},
      type: "localeString",
      // options: {collapsible: true, collapsed: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Sous-titre",
      // initialValue:{en:'Get Your Own Experience', nl:'Ervaar Het Zelf'},
      type: "localeText",
      // options: {collapsible: true, collapsed: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "altImage",
      title: "Image",
      // initialValue:{en:'Get Your Own Experience', nl:'Ervaar Het Zelf'},
      type: "altImage",
      // description: "De gauche à droite, la troisième est horizontale",
      // options: {collapsible: true, collapsed: true},
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", description: "description", image: "altImage" },
    prepare({ title, description, image }) {
      // const {date, completion} = selection
      return { title: title?.[uiLanguage.id], subtitle: description[uiLanguage.id], media: image.image };
    },
  },
});
