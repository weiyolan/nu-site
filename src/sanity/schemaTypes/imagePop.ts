import { Images, Scale } from "lucide-react";
import { defineType, defineField } from "sanity";
import { uiLanguage } from "../../i18n/supportedLanguages";

export default defineType({
  name: "imagePop",
  title: "Image & Text",
  icon: Images,
  type: "object",
  // options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: "color",
      title: "Couleur",
      type: "optionsColors",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Titre",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localeBlockContent",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Bouton",
      name: "button",
      type: "link",
      validation: (Rule) => Rule.required(),
      // initialValue:'',
    }),
    defineField({
      name: "altImage",
      title: "Image",
      type: "altImage",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", description: "description" },
    prepare(selection) {
      const { title, description } = selection;
      return { title: title?.[uiLanguage.id] };
    },
  },
});
