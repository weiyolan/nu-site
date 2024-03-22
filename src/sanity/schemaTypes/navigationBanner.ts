import { defineType, defineField, PreviewProps } from "sanity";
// import { uiLanguage } from "../supportedLanguages";
import { Icon } from "@iconify/react";
import { uiLanguage } from "../supportedLanguages";

export default defineType({
  name: "navigationBanner",
  title: "Bannier",
  type: "object",
  fields: [
    defineField({
      name: "enabled",
      title: "Activé",
      type: "boolean",
      initialValue: true,
      // validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "messages",
      title: "Messages",
      type: "array",
      of: [
        {
          type: "navigationBannerMessage",
          // components: {
          //   preview: (props) => {
          //     console.log(props);
          //     return props.renderDefault({
          //       ...props,
          //       // title: props,
          //       // subtitle: 'Custom subtitle',
          //       // media: <Icon icon={props.} />, // <-- Renders the selected icon as media
          //     });
          //   },
          // },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      // const {date, completion} = selection
      return { title: "Navigation Banner" };
    },
  },
});
