import { groq } from "next-sanity";
import { supportedLanguages } from "../supportedLanguages";
import { client } from "./client";

export function getColor(color: colorSanityType): colorBgType {
  switch (color) {
    case "blue":
      return "bg-nu-blue";
    case "peach":
      return "bg-nu-peach";
    case "green":
      return "bg-nu-green";
    case "purple":
      return "bg-nu-purple";
    case "yellow":
      return "bg-nu-yellow";
  }
  return "bg-nu-peach";
}

export type colorBgType = "bg-nu-yellow" | "bg-nu-green" | "bg-nu-blue" | "bg-nu-peach" | "bg-nu-purple";
export type colorSanityType = "yellow" | "green" | "blue" | "peach" | "purple";
export type localeType = "en" | "fr";
export type localeStringType = { en: string; fr: string };
// export type buttonType = { ext: boolean; text: localeStringType; url: string };
export type buttonType = {  text: localeStringType; url: string };
export type altImageType = {
  alt: localeStringType;
  image: {
    url: string;
    metadata: {
      lqip: string;
    };
  };
};
export type localeBlockContentType = { en: []; fr: [] };
// ======================================= ROOT LAYOUT =======================================
export async function getBannerInfo() {
  const banner = await client.fetch(`*[_type=='navigationBanner'][0]`);
  // console.log(banner);
  return banner;
}

export async function getNavbarInfo(): Promise<{
  logoToggle: boolean;
  links: (
    | { _type: "navigationButtonTrigger"; title: localeStringType; url: string }
    | {
        _type: "navigationButtonComplex";
        title: localeStringType;
        url: string;
        color: colorSanityType;
        altImage: altImageType;
        links: { title: localeStringType; description: localeStringType; url: string }[];
      }
  )[];
}> {
  // Fetch shopSection with ID homeBlogs or something
  const navbarInfo = await client.fetch(`*[_type=='navigationBar'][0]{...,links[]{...,altImage{
          alt, 'image':image.asset->{url,metadata{lqip}}
        }}}`);
  // console.log(reviews)
  return navbarInfo;
}

export async function getFooterInfo(): Promise<{
  messages: { text: localeStringType; icon: { name: string } }[];
  quote: { by: localeStringType; quote: localeStringType };
  newsletter: {
    text: localeStringType;
    title: localeStringType;
    confidential: { title: localeStringType; text: localeStringType; url: localeStringType };
    general: { title: localeStringType; text: localeStringType; url: localeStringType };
  };
}> {
  let langObj = "";

  supportedLanguages.forEach((lang) => {
    langObj = langObj + `'${lang.id}':document.${lang.id}.asset->url,`;
  });
  // Fetch shopSection with ID homeBlogs or something
  const footerQuote = await client.fetch(`*[_type=='footerQuote'][0]`);
  const footerNewsletter = await client.fetch(`*[_type=='footerNewsletter'][0]{...,confidential{...,...ref->
          {title,
           'url':{
              ${langObj}}
          }},
          general{...,...ref->
          {title,
           'url':{
              ${langObj}}
          }}
  }`);
  const footerMessages = await client.fetch(`*[_type=='footerMessages'][0]{messages}`);
  // console.log(reviews)
  return { quote: footerQuote, ...footerMessages, newsletter: footerNewsletter };
}

export async function getFooterLists(): Promise<{
  footerLists: {
    title: localeStringType;
    links: (
      | {
          _type: "link";
          ext: boolean;
          url: string;
          text: localeStringType;
          doc: null;
        }
      | {
          _type: "linkDoc";
          ext: boolean;
          url: null;
          text: localeStringType;
          doc: { title: localeStringType; url: localeStringType };
        }
    )[];
  }[];
}> {
  let langObj = "";

  supportedLanguages.forEach((lang) => {
    langObj = langObj + `'${lang.id}':document.${lang.id}.asset->url,`;
  });

  // langObj Structure:
  //   'url':url->
  //   {
  //       'en':document.en.asset->url,
  //       'nl':document.nl.asset->url
  //       }

  return client.fetch(
    groq`*[_type=='footerLists'][0]{footerLists[]{...,links[]{...,'doc':ref->
          {title,
           'url':{
              ${langObj}}
              }
  }}}`
  );
}

// ================================================== About Page ==================================================

export async function getImagePop(): Promise<{
  color: colorSanityType;
  title: localeStringType;
  button: buttonType;
  description: localeBlockContentType;
  altImage: altImageType;
}> {
  // Fetch shopSection with ID homeBlogs or something
  const imagePop = await client.fetch(`*[_type=='imagePop'][_id=='about'][0]{...,altImage{
          alt, 'image':image.asset->{url, metadata{lqip}}
        }}`);
  // console.log(reviews)
  return imagePop;
}

export async function getSquareInfo(): Promise<{
  title: localeStringType;
  description: localeStringType;
  colors: colorSanityType[];
  altImages: altImageType[];
  square: {
    title: localeStringType;
    description: localeStringType;
  };
}> {
  // Fetch shopSection with ID homeBlogs or something
  const squareInfo = await client.fetch(`*[_type=='aboutSquares'][_id=='intro'][0]{...,altImages[]{
          alt, 'image':image.asset->{url, metadata{lqip}}
        }}`);
  // console.log(reviews)
  return squareInfo;
}

export async function getBeerInfo(): Promise<{
  title: localeStringType;
  description: localeBlockContentType;
  color: colorSanityType;
  altImage: altImageType;
  button: buttonType;
}> {
  // Fetch shopSection with ID homeBlogs or something
  const beerInfo = await client.fetch(`*[_type=='imagePop'][_id=='aboutHorizontal'][0]{...,altImage{
          alt, 'image':image.asset->{url, metadata{lqip}}
        }}`);
  // console.log(reviews)
  return beerInfo;
}

export async function getValueInfo(): Promise<{
  title: localeStringType;
  description: localeStringType;
  prefix: localeStringType;
  values: {
    description: localeStringType;
    title: localeStringType;
    altImage: altImageType;
  }[];
}> {
  // Fetch shopSection with ID homeBlogs or something
  const valueInfo = await client.fetch(`*[_type=='aboutValuesSection'][0]{...,values[]{...,altImage{
          alt, 'image':image.asset->{url, metadata{lqip}}}
        }}`);
  // console.log(reviews)
  return valueInfo;
}
export async function getIngredientInfo(): Promise<{
  title: localeStringType;
  description: localeStringType;
  majorTitle: localeStringType;
  minorTitle: localeStringType;
}> {
  // Fetch shopSection with ID homeBlogs or something
  // const ingredientInfo = await client.fetch(`*[_type=='aboutIngredientSection'][_id=='ingredients'][0]`);
  const ingredientInfo = await client.fetch(`*[_type=='aboutIngredientSection'][_id=='ingredients'][0]`);
  // console.log(reviews)
  return ingredientInfo;
}
export async function getIngredients(): Promise<{
  major: { title: localeStringType; description: localeBlockContentType }[];
  minor: { title: localeStringType; description: localeBlockContentType }[];
}> {
  // Fetch shopSection with ID homeBlogs or something
  // const ingredientInfo = await client.fetch(`*[_type=='aboutIngredientSection'][_id=='ingredients'][0]`);
  const ingredients = await client.fetch(`*[_type=='aboutIngredient']|order(orderRank)`);
  // console.log(reviews)
  return {
    major: ingredients.filter((ingredient: { category: string; title: localeStringType; description: localeStringType }) => ingredient.category === "major"),
    minor: ingredients.filter((ingredient: { category: string; title: localeStringType; description: localeStringType }) => ingredient.category === "minor"),
  };
}

export async function getBrefInfo(): Promise<{
  title: localeStringType;
  description: localeStringType;
  button: buttonType;
  altImages: altImageType[];
}> {
  // Fetch shopSection with ID homeBlogs or something
  const brefInfo = await client.fetch(`*[_type=='aboutBref'][0]{...,altImages[]{
          alt, 'image':image.asset->{url, metadata{lqip}}
        }}`);
  // console.log(reviews)
  return brefInfo;
}

export async function getHero(): Promise<{
  title: localeStringType;
  button: buttonType;
  altImage: altImageType;
  color: colorSanityType;
}> {
  // Fetch shopSection with ID homeBlogs or something
  const hero = await client.fetch(`*[_type=='hero'][_id=='aboutHero'][0]{...,altImage{
          alt, 'image':image.asset->{url, metadata{lqip}}
        }}`);
  // console.log(reviews)
  return hero;
}

// ============================================= Help =============================================
export async function getHelpInfo(): Promise<{
  title: localeStringType;
  description: localeStringType;
  altImage: altImageType;
}> {
  const helpInfo = await client.fetch(`*[_type=='helpTitle'][0]{...,altImage{
          alt, 'image':image.asset->{url, metadata{lqip}}
        }}`);
  return helpInfo;
}
export async function getFAQ(): Promise<{
  items: {
    title: localeStringType;
    description: localeStringType;
  }[];
}> {
  const faq = await client.fetch(`*[_type=='accordion'][0]{items}`);
  return faq;
}
