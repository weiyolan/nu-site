/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...index]]\page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
// import { defineConfig } from "@sanity-typed/types";
// import type { InferSchemaValues } from "@sanity-typed/types";

import { structureTool } from "sanity/structure";
import { myStructure } from "sanity.structure";
import { frFRLocale } from "@sanity/locale-fr-fr";
// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schema";
import { iconify } from "sanity-plugin-iconify";
import myLogo from "@/sanity/lib/logo";

const config = defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schema' folder
  schema,
  // studio: {
  // components: {
  // layout: MyLayout,
  icon: myLogo,
  // navbar: MyNavbar,
  // toolMenu: MyToolMenu,
  // }
  // },
  plugins: [
    frFRLocale(),
    structureTool({ structure: myStructure }),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    iconify({
      // Optional configuration
      // Filter icons by collection for all Icon fields (this field has typed autocomplete ✨)
      // Defaults to empty array (all collections)
      collections: ["lucide"],
      // Shows the selected icon name and collection underneath the icon picker
      // Defaults to false
      showName: false,
    }),
  ],
});

export default config;
// export type SanityValues = InferSchemaValues<typeof config>;
