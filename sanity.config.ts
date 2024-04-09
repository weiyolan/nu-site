/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...index]]\page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig, isDev } from "sanity";
// import { defineConfig } from "@sanity-typed/types";
// import type { InferSchemaValues } from "@sanity-typed/types";
import { netlifyWidget } from "sanity-plugin-dashboard-widget-netlify";

import { structureTool } from "sanity/structure";
import { dashboardTool } from "@sanity/dashboard";
import { myStructure } from "sanity.structure";
import { frFRLocale } from "@sanity/locale-fr-fr";
// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schema";
import { iconify } from "sanity-plugin-iconify";
import myLogo from "@/sanity/lib/logo";
import { table } from "@sanity/table";

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

  plugins: isDev //process.env.NODE_ENV === "development" | "production"
    ? [
        visionTool({ defaultApiVersion: apiVersion }),
        frFRLocale(),
        table(), // https://www.sanity.io/plugins/sanity-table
        structureTool({ structure: myStructure }),
        iconify({
          // Optional configuration
          // Filter icons by collection for all Icon fields (this field has typed autocomplete ✨)
          collections: ["lucide"], // Defaults to empty array (all collections)
          // Defaults to false
          showName: false, // Shows the selected icon name and collection underneath the icon picker
        }),
        dashboardTool({
          widgets: [
            netlifyWidget({
              title: "Netlify deploy",
              sites: [
                {
                  title: "Nu Website",
                  apiId: "cedb80f0-961a-4e99-b04a-fbe699e42959",
                  buildHookId: "66159c34abed712b09aaf25e",
                  name: "nu-site",
                },
              ],
            }),
          ],
        }),
      ]
    : [
        frFRLocale(),
        table(), // https://www.sanity.io/plugins/sanity-table
        structureTool({ structure: myStructure }),
        iconify({
          collections: ["lucide"],
        }),
        dashboardTool({
          widgets: [
            netlifyWidget({
              title: "Netlify deploy",
              sites: [
                {
                  title: "Nu Website",
                  apiId: "cedb80f0-961a-4e99-b04a-fbe699e42959",
                  buildHookId: "66159c34abed712b09aaf25e",
                  name: "nu-site",
                },
              ],
            }),
          ],
        }),
      ],
});

export default config;
// export type SanityValues = InferSchemaValues<typeof config>;
