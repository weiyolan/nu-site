import { defineType, defineField } from "sanity";
import { uiLanguage } from "../../i18n/supportedLanguages";
import { Cog, SwatchBook } from "lucide-react";
// import { ListCollapse , Rows3} from "lucide-react";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export default defineType({
  name: "shopSettings",
  title: "Paramètres E-Commerce",
  type: "object",
  icon: Cog,
  // orderings: [orderRankOrdering],
  fieldsets: [{ title: "Paramètres", name: "settings" }],
  fields: [
    // orderRankField({ type: "shopSection" }),
    defineField({
      title: "Tax (%)",
      description: "",
      name: "tax",
      type: "number",
      initialValue: 20,
      // fieldset: "settings",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Frais d'envoie (€)",
      name: "shipping",
      type: "number",
      // fieldset: "settings",
      validation: (Rule) => Rule.required(),
      // initialValue:'',
    }),
    defineField({
      title: "Gratuit à partir (€)",
      name: "freeShippingFrom",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
