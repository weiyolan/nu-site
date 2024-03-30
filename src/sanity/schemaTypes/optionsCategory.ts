import {  defineType } from "sanity";
// import { Package } from "lucide-react";
import { uiLanguage } from "../supportedLanguages";

export default defineType({
  name: "optionsCategory",
  title: uiLanguage.id === "en" || "nl" ? "Category" : "Catégorie",
  type: "string",
  options: {
    list: [
      { title: "Shampoings Solides", value: "shampoings-solides" },
      { title: "Accessoires", value: "accessoires" },
      { title: "Packs", value: "packs" },
      { title: "Bons Cadeau", value: "bons-cadeau" },
    ],
  },
  validation: (Rule) => Rule.required(),
});
