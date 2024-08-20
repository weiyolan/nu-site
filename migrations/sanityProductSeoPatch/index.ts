import { defineMigration, patch, at, setIfMissing, set, replace } from "sanity/migrate";

/**
 * this migration will set `Default title` on all documents that are missing a title
 * and make `true` the default value for the `enabled` field
 */
export default defineMigration({
  title: "Product Seo Patch",
  documentTypes: ["product"],

  async *migrate(documents, context) {
    for await (const document of documents()) {
      console.log(document.title);
      console.log(document.seo?.title);
      // console.log('document.', document.)
      yield patch(document._id, [
        at(
          "seo.title",
          set({
            _type: "localeString",
            fr: `${document.title.fr} | Le Shampoing Solide A Base de Levure De Bière`,
            en: `${document.title.en} | The Shampoo Bar Made Of Beer Yiest`,
          })
        ),
        at(
          "seo.description",
          set({
            _type: "localeText",
            fr: `Le shampoing solide à base de levure de bière made in France avec soin pour la nature et des ingrédients locaux.`,
            en: `The shampoo bar based on beer yiest with local ingredients taking care of your body and nature.`,
          })
        ),
        // at('title', setIfMissing('Default title')),
        // at('enabled', setIfMissing(true)),
      ]);
    }
  },
});
