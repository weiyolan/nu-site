import { defineType, defineField } from "sanity";
// import { supportedLanguages } from "./supportedLanguages";
// import { InlineElementIcon, LinkIcon } from "@sanity/icons";

export default defineType({
  name: "footerLists",
  title: "Footer Links",
  type: "document",
  // options: { collapsible: true, collapsed: false },
  // groups: [
  // { name: "group1", title: "Navigation" },
  // { name: "group2", title: "Aide" },
  // { name: "group3", title: "Socials" },
  // ],
  fields: [
    // defineField({
    //   name: "newsLetterTitle",
    //   title: "News Letter Title",
    //   type: "localeString",
    //   validation: (Rule) => Rule.required(),
    // }),
    defineField({
      name: "footerLists",
      title: "Listes de Navigation",
      type: "array",
      of: [{ type: "footerList" }],
      validation: (Rule) => Rule.required(),
    }),

    // defineField({
    //   name: "list1",
    //   title: "Navigation",
    //   group: "group1",
    //   type: "footerList",
    //   validation: (Rule) => Rule.required(),
    // }),
    // defineField({
    //   name: "list2",
    //   title: "Aide",
    //   group: "group2",
    //   type: "footerList",
    //   validation: (Rule) => Rule.required(),
    // }),
    // defineField({
    //   name: "list3",
    //   title: "Socials",
    //   group: "group3",
    //   type: "footerList",
    //   validation: (Rule) => Rule.required(),
    // }),
    // defineField({
    //   name: "list4",
    //   title: "Legal",
    //   group: "group4",
    //   options: { collapsible: true, collapsed: true },
    //   type: "object",
    //   fields: [
    //     defineField({
    //       name: "title",
    //       title: "Title",
    //       type: "localeString",
    //       validation: (Rule) => Rule.required(),
    //     }),
    //     defineField({
    //       name: "items",
    //       title: "Items",
    //       type: "array",
    //       validation: (Rule) => Rule.required(),
    //       of: [{type:'linkDoc'},
    //       ],
    //     }),
    //   ],
    // }),
  ],
  preview: {
    prepare() {
      // const {date, completion} = selection
      return { title: "Listes de Navigation" };
    },
  },
});
