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
import Image from "next/image";
import { getBeerInfo, getBrefInfo, getHero, getImagePop, getIngredientInfo, getIngredients, getSquareInfo, getValueInfo, localeType } from "@/sanity/lib/interface";
// import { client } from "@/sanity/lib/client";

export default async function Page({ params: { locale } }: { params: { locale: localeType } }) {
  const imagePop = await getImagePop();
  const squareInfo = await getSquareInfo();
  const beerInfo = await getBeerInfo();
  const valueInfo = await getValueInfo();
  const ingredientInfo = await getIngredientInfo();
  const ingredients = await getIngredients();
  const brefInfo = await getBrefInfo();
  const hero = await getHero();
  return (
    <>
      <Hero locale={locale} hero={hero} />
      <Section id="nu" className="mt-16">
        <AboutTiles locale={locale} squareInfo={squareInfo} />
      </Section>
      <Section className="max-w-screen overflow-hidden w-full px-0 md:px-0 ">
        <ValueBar locale={locale} />
      </Section>
      <Section id="beer">
        <AboutBeer locale={locale} beerInfo={beerInfo} />
      </Section>
      <Section id={imagePop.title.fr}>
        <ImagePop locale={locale} imagePop={imagePop} />
      </Section>
      <Section id="valeurs">
        <AboutValues locale={locale} valueInfo={valueInfo} />
      </Section>
      <Section>
        <NuLine />
      </Section>
      <div className="relative">
        <Image
          src="/about_ingredients.png"
          alt="spoons filled with spices"
          width={1460 / 3}
          height={2735 / 3}
          className="w-1/6 h-auto absolute left-0 top-0 -translate-y-1/3 md:top-24 "
        />
        <Section id="ingredients">
          <AboutIngredients ingredientInfo={ingredientInfo} ingredients={ingredients} locale={locale} />
        </Section>
      </div>
      <Section id="bref">
        <AboutBref locale={locale} brefInfo={brefInfo} />
      </Section>
      {/* <Footer /> */}
    </>
  );
}
