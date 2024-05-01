import { defineType, defineField, PreviewProps } from "sanity";
import { uiLanguage } from "../../i18n/supportedLanguages";
// import Icon from "../lib/lucideIcon";
import { Icon } from "@iconify/react";
import { Heart } from "lucide-react";
// import {Icon} from '@iconify/types/types'
export default defineType({
  name: "values",
  title: "Bar des Valeurs",
  type: "document",
  icon:Heart,
  fields: [
    defineField({
      name: "icon",
      title: "Icon",
      type: "icon",
      options:{showName:true},
      description:"Tous les icons sur lucide.dev/icons",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    // defineField({
    //   name: "url",
    //   // title: "Title",
    //   type: "url",
    //   // type: "link",
    //   validation: (Rule) => Rule.required(),
    // }),
  ],
  preview: {
    select: { icon: "icon", title: "title" },
    prepare({ title, icon}) {
      return {
        title: title[uiLanguage.id],
        // subtitle:link.url,
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
