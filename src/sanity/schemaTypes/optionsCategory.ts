import {  defineType } from "sanity";
// import { Package } from "lucide-react";
import { uiLanguage } from "../supportedLanguages";

export default defineType({
  name: "optionsCategory",
  title: uiLanguage.id === "en" || "nl" ? "Category" : "Catégorie",
  type: "string",
  options: {
    list: [
      { title: "Shampoing Solide", value: "shampoing" },
      { title: "Accessoire", value: "accessoire" },
      { title: "Pack", value: "pack" },
      { title: "Bon de Cadeau", value: "bon" },
    ],
  },
  validation: (Rule) => Rule.required(),
});
