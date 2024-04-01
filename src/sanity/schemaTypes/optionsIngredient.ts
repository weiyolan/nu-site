import { defineType } from "sanity";
import { uiLanguage } from "../supportedLanguages";

export default defineType({
  title: uiLanguage.id === "fr" ? "Catégorie" : "Category",
  name: "optionsIngredient",
  type: "string",
  options: {
    list: [
      { title: uiLanguage.id === ("en" || "nl") ? "Main" : "Principal", value: "major" },
      { title: uiLanguage.id === ("en" || "nl") ? "Additif" : "Additif", value: "minor" },
    ],
  },
  // validation: (Rule) => Rule.required(),
  initialValue: "major",
});
