import AboutBeer from "@/components/AboutBeer";
import AboutBref from "@/components/AboutBref";
import AboutIngredients from "@/components/AboutIngredients";
import AboutTiles from "@/components/AboutTiles";
import AboutValues from "@/components/AboutValues";
import Hero from "@/components/Hero";
import ImagePop from "@/components/ImagePop";
import NuLine from "@/components/NuLine";
import Section from "@/components/Section";
import ValueBar from "@/components/ValueBar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { altImageType, buttonType, colorSanityType, localeStringType, localeType } from "@/sanity/lib/interface";
// import { client } from "@/sanity/lib/client";

async function getImagePop(): Promise<{
  color: colorSanityType;
  title: localeStringType;
  button: buttonType;
  description: localeStringType;
  altImage: altImageType;
}> {
  // Fetch shopSection with ID homeBlogs or something
  const imagePop = await client.fetch(`*[_type=='imagePop'][_id=='about'][0]{...,altImage{
          alt, 'image':image.asset->{url, metadata{lqip}}
        }}`);
  // console.log(reviews)
  return imagePop;
}

async function getSquareInfo(): Promise<{
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
  const squareInfo = await client.fetch(`*[_type=='aboutSquares'][0]{...,altImages[]{
          alt, 'image':image.asset->{url, metadata{lqip}}
        }}`);
  // console.log(reviews)
  return squareInfo;
}

async function getBeerInfo(): Promise<{
  title: localeStringType;
  description: localeStringType;
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

async function getValueInfo(): Promise<{
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
async function getIngredientInfo(): Promise<{
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
async function getIngredients(): Promise<{
  major: { title: localeStringType; description: localeStringType }[];
  minor: { title: localeStringType; description: localeStringType }[];
}> {
  // Fetch shopSection with ID homeBlogs or something
  // const ingredientInfo = await client.fetch(`*[_type=='aboutIngredientSection'][_id=='ingredients'][0]`);
  const ingredients = await client.fetch(`*[_type=='aboutIngredient']|order(orderRank)`);
  // console.log(reviews)
  return {
    major: ingredients.filter((ingredient) => ingredient.category === "major"),
    minor: ingredients.filter((ingredient) => ingredient.category === "minor"),
  };
}
export default async function Page({ params: { locale } }: { params: { locale: localeType } }) {
  const imagePop = await getImagePop();
  const squareInfo = await getSquareInfo();
  const beerInfo = await getBeerInfo();
  const valueInfo = await getValueInfo();
  const ingredientInfo = await getIngredientInfo();
  const ingredients = await getIngredients();
  return (
    <>
      <Hero
        src="/about_heroDesert.jpg"
        alt="femme dans le bain avec shampoing"
        text={`Nu, le shampoing solide\nqui rend les cheveux pas sec`}
        link={"/shop"}
        button="Essayer maintenant"
      />
      <Section className="mt-16">
        <AboutTiles locale={locale} squareInfo={squareInfo} />
      </Section>
      <Section className="max-w-screen overflow-hidden w-full px-0 md:px-0 ">
        <ValueBar />
      </Section>
      <Section>
        <AboutBeer locale={locale} beerInfo={beerInfo} />
      </Section>
      <Section>
        <ImagePop locale={locale} imagePop={imagePop} />
      </Section>
      <Section>
        <AboutValues locale={locale} valueInfo={valueInfo} />
      </Section>
      <Section>
        <NuLine big></NuLine>
      </Section>
      <div className="relative">
        <Image src="/about_ingredients.png" alt="spoons filled with spices" width={1460 / 3} height={2735 / 3} className="w-1/6 h-auto absolute left-0  top-24 " />
        <Section>
          <AboutIngredients ingredientInfo={ingredientInfo} ingredients={ingredients} locale={locale} />
        </Section>
      </div>
      <Section>
        <AboutBref />
      </Section>
      <Footer />
    </>
  );
}
