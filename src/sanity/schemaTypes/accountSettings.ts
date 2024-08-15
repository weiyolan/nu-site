import { defineType, defineField } from "sanity";
import { uiLanguage } from "../../i18n/supportedLanguages";
import { Cog, SwatchBook } from "lucide-react";
// import { ListCollapse , Rows3} from "lucide-react";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export default defineType({
  name: "accountSettings",
  title: "Paramètres Compte",
  type: "object",
  icon: Cog,
  // orderings: [orderRankOrdering],
  fieldsets: [{ title: "Paramètres", name: "settings" }],
  fields: [
    // orderRankField({ type: "shopSection" }),
    defineField({
      title: "Image Sign-in",
      description: "",
      name: "imageIn",
      type: "altImage",
      // fieldset: "settings",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Image Sign-up",
      description: "",
      name: "imageUp",
      type: "altImage",
      // fieldset: "settings",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
