import { supportedLanguages } from "@/i18n/supportedLanguages";
import { client } from "@/sanity/lib/client";
import type { MetadataRoute } from "next";

function languify(url: string) {
  let obj = {};
  supportedLanguages.forEach((lang) => (obj = { ...obj, ...{ [lang.id]: url.replace("*", lang.id) } }));
  return obj;
}

export default async function sitemap({ projects }: { projects: number }): Promise<MetadataRoute.Sitemap> {
  // let projects = await getProjects();
  const slugs = await client.fetch(`*[_type=='product']{'slug':slug.current}`);
  //[
  //   { slug: 'nyx' },
  //   { slug: 'boite-savon' },
  //   { slug: 'le-pack-total' },
  //   { slug: 'bon-luxe' },
  //   { slug: 'porte-savon' },
  //   { slug: 'chaos' }
  // ]

  console.log(languify("https://nu-soins.com/*"));
  return [
    {
      url: "https://nu-soins.com",
      lastModified: new Date(),
      alternates: {
        languages: languify("https://nu-soins.com/*"),
      },
      priority: 1,
    },
    {
      url: "https://nu-soins.com/apropos",
      lastModified: new Date(),
      alternates: {
        languages: languify("https://nu-soins.com/*/apropos"),
      },
    },
    {
      url: "https://nu-soins.com/shop",
      lastModified: new Date(),
      alternates: {
        languages: languify("https://nu-soins.com/*/shop"),
      },
    },
    {
      url: "https://nu-soins.com/aide",
      lastModified: new Date(),
      alternates: {
        languages: languify("https://nu-soins.com/*/aide"),
      },
    },
    ...slugs.map((slug) => ({
      url: `https://nu-soins.com/shop/${slug}`,
      lastModified: new Date(),
      alternates: {
        languages: languify(`https://nu-soins.com/*/shop/${slug}`),
      },
    })),
  ];
}
