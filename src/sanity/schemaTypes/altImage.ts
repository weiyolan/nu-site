import { defineType, defineField } from 'sanity'
import { uiLanguage } from "../../i18n/supportedLanguages";

export default defineType({
  title: 'Image',
  name: 'altImage',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  preview: {
    select: {
      image: "image",
      alt:'alt',
    },

    prepare(selection) {
      const { image, alt } = selection;
      // console.log(image)
      return { title:alt?.[uiLanguage.id],  media: image.asset };
    },
  },
  fields: [
    defineField({
      name: 'image', title: 'Image', type: 'image',
      options: {
        hotspot: true,
        metadata: [
          'lqip',       // Default: included
          'palette',    // Default: included
        ],
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'alt', title: 'Text Alternatif', type: 'localeString', 
      // description: 'A simple description of what is shown on the picture for people using screenreaders.',
      validation: Rule => Rule.required()
    }),
  ]
})
