import { defineType } from "sanity";
import { uiLanguage } from "../supportedLanguages";

export default defineType({
  title: uiLanguage.id==='fr'?"Couleur":'Colors',
  name: "optionsColors",
  type:'string',
  options: {
    list: [
      { title: uiLanguage.id === "en" || "nl" ? "Peach" : "Peche", value: "peach" },
      { title: uiLanguage.id === "en" || "nl" ? "Blue" : "Bleu", value: "blue" },
      { title: uiLanguage.id === "en" || "nl" ? "Green" : "Vert", value: "green" },
      { title: uiLanguage.id === "en" || "nl" ? "Purple" : "Mauve", value: "purple" },
      { title: uiLanguage.id === "en" || "nl" ? "Yellow" : "Jaune", value: "yellow" },
    ],
  }
  // validation: (Rule) => Rule.required(),
  // initialValue:'',
})