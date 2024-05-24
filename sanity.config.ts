/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...index]]\page.tsx` route
 */

import { defineConfig, isDev } from "sanity";
// import { defineConfig } from "@sanity-typed/types";
// import type { InferSchemaValues } from "@sanity-typed/types";

import { netlifyWidget } from "sanity-plugin-dashboard-widget-netlify";
import { structureTool } from "sanity/structure";
import { dashboardTool } from "@sanity/dashboard";
import { frFRLocale } from "@sanity/locale-fr-fr";
import { table } from "@sanity/table";
import { visionTool } from "@sanity/vision";

import { myStructure } from "./sanity.structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schema";
import { iconify } from "sanity-plugin-iconify";
import myLogo from "./src/sanity/lib/logo";

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
  document: {
    unstable_comments: {
      enabled: false,
    },
  },

  plugins:
    process.env.NODE_ENV === "development" //isDev
      ? [
          frFRLocale(),
          table(), // https://www.sanity.io/plugins/sanity-table
          structureTool({ structure: myStructure }),
          visionTool({ defaultApiVersion: apiVersion }),
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
                    title: "nu-soins.com",
                    apiId: "a3df9879-197e-482f-a5ef-395591656627",
                    buildHookId: "66511f0734c0689e1e779caf",
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
                    title: "nu-soins.com",
                    apiId: "a3df9879-197e-482f-a5ef-395591656627",
                    buildHookId: "66511f0734c0689e1e779caf",
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
