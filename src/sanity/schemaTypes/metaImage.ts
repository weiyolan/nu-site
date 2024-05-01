import { defineType, defineField } from 'sanity'
import { supportedLanguages } from "../../i18n/supportedLanguages";

export default defineType({
  title: 'Image',
  name: 'metaImage',
  type: 'image',
  options: {
    metadata: [
      'blurhash',   // Default: included
      'lqip',       // Default: included
      'palette',    // Default: included
      'exif',       // Default: not included
      'location',   // Default: not included
    ],
  },
})


