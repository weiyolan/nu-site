import { defineField, defineType } from "sanity";
// import { defineField, defineType } from "@sanity-typed/types";
import { uiLanguage } from "../supportedLanguages";

export default defineType({
  name: "cta",
  title: "Appel d'Action",
  type: "object",
  // icon: BlockElementIcon,
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
      title: "Description",
      // initialValue:{en:'Get Your Own Experience', nl:'Ervaar Het Zelf'},
      type: "localeBlockContent",
      // options: {collapsible: true, collapsed: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "promotion",
      title: "Phrase Promotionnel",
      // initialValue:{en:'Get Your Own Experience', nl:'Ervaar Het Zelf'},
      type: "localeString",
      // options: {collapsible: true, collapsed: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "button",
      title: "Boutton",
      // initialValue:{en:'Get Your Own Experience', nl:'Ervaar Het Zelf'},
      type: "link",
      // options: {collapsible: true, collapsed: true},
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      // const {date, completion} = selection
      return { title: title?.[uiLanguage.id] };
    },
  },
});
