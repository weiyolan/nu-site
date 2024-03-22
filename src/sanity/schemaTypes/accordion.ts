import { defineType, defineField } from "sanity";
import { uiLanguage } from "../supportedLanguages";
import { ListCollapse , Rows3} from "lucide-react";

export default defineType({
  name: "accordion",
  title: "Accordion",
  type: "object",
  icon:Rows3,
  fields: [
    defineField({
      title: "Accordion Items",
      name: "items",
      type: "array",
      of: [{ type: "accordionItem" }],
    }),
  ],

  preview: {
    select:{items:'items'},
    prepare(selection) {
      const {items} = selection
      return { title: `Accordéon ${items.length} Pièce${items.length>1 && 's'}: ${items.map(item=>` ${item.title[uiLanguage.id]}`)}` };
    },
  },
});
