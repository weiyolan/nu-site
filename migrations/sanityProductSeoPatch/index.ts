import { defineMigration, patch, at, setIfMissing, set, replace } from "sanity/migrate";

/**
 * this migration will set `Default title` on all documents that are missing a title
 * and make `true` the default value for the `enabled` field
 */
export default defineMigration({
  title: "Product Seo Patch",
  documentTypes: ["seo"],

  async *migrate(documents, context) {
    for await (const document of documents()) {
      console.log(document._id);
      // console.log(document._id.split(".")[1]);

      // console.log('document.', document.)
      yield patch(document._id, [
        at(
          "seo.title",
          set({
            _type: "localeString",
            fr: `Nu Soins | Pour corps et nature`,
            en: `Nu Soins | For body and nature`,
          })
        ),
        at(
          "seo.description",
          set({
            _type: "localeText",
            fr: `Shampoings solides à base de levure de bière`,
            en: `Vegan shampoo bars based on beer yiest`,
          })
        ),
      ]);
    }
  },
});
