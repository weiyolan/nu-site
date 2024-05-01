import { defineType, defineField, PreviewProps } from "sanity";
import { uiLanguage } from "../../i18n/supportedLanguages";
// import Icon from "../lib/lucideIcon";
import { Icon } from "@iconify/react";
// import {Icon} from '@iconify/types/types'
export default defineType({
  name: "footerMessages",
  title: "Messages",
  type: "object",
  fields: [
    defineField({
      name: "messages",
      title: "Messages",
      type: "array",
      of: [{ type: "footerMessage" }],
      validation: (Rule) => Rule.required().length(4),
    }),
  ],

  // components: {
  preview: {
    select: {},
    prepare(selection) {
      return { title: `Messages` };
    },
  },
});
