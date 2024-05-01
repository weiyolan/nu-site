import { defineType, defineField, PreviewProps } from "sanity";
import { uiLanguage } from "../../i18n/supportedLanguages";
// import Icon from "../lib/lucideIcon";
import { Icon } from "@iconify/react";
// import {Icon} from '@iconify/types/types'
export default defineType({
  name: "footerMessage",
  title: "Message",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      title: "Icon",
      type: "icon",
      description:"Tous les icons sur lucide.dev/icons",
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { icon: "icon", text: "text" },
    prepare({ text, icon }) {
      return {
        title: text[uiLanguage.id],
        media: <Icon icon={icon.name} />,
      };
    },
  },
  // components: {
  //   preview: (props: PreviewProps) => {
  //     return props.renderDefault({
  //       ...props,
  //       // title: 'Custom title',
  //       // subtitle: 'Custom subtitle',
  //       media: <Icon icon={props.title as string} />, // <-- Renders the selected icon as media
  //     });
  //   },
  // },
});
