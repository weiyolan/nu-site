import Hero from "@/components/Hero";
import Products from "@/components/Products";
// import ReviewNotFirst from "@/components/ReviewNotFirst";
import Section from "@/components/Section";
import ShopEco from "@/components/ShopEco";
// import Typography from "@/components/Typography";
import ValueBar from "@/components/ValueBar";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import Reviews from "@/components/Reviews";
import { altImageType, buttonType, colorSanityType, getHero, localeStringType, localeType } from "@/sanity/lib/interface";
import slugify from "slugify";
import type { Metadata } from "next";

type Props = {
  params: { locale: localeType };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const seo: { title: localeStringType; description: localeStringType } = await client.fetch(`*[_id=='seoShop'][0]{title,description}`);

  return {
    title: seo?.title?.[locale],
    description: seo?.description?.[locale],
    alternates: {
      canonical: "https://nu-soins.com",
      languages: {
        en: "./en",
        fr: "./",
      },
    },
  };
}
async function getEco(): Promise<{
  description: localeStringType;
  title: localeStringType;
  cards: {
    title: localeStringType;
    description: localeStringType;
    text: localeStringType;
    icon: { name: string };
  }[];
}> {
  const eco = await client.fetch(`*[_type=='ecology'][0]`);
  // console.log(eco.cards);
  return eco;
}

async function getReviews(id: string): Promise<{
  citationsOn: boolean;
  title: localeStringType;
  description: localeStringType;
}> {
  const reviews = await client.fetch(`*[_type=='reviews'][_id=="${id}"][0]`);
  // console.log(reviews)
  return reviews;
}

async function getShopSections(): Promise<
  {
    color: colorSanityType;
    category: string;
    integrated: boolean;
    title: localeStringType;
    button: buttonType;
    description: localeStringType;
  }[]
> {
  const shopSections = await client.fetch(`*[_type=='shopSection']|order(orderRank)`);
  // console.log(reviews)
  return shopSections;
}

export default async function Page({ params: { locale } }: { params: { locale: "en" | "fr" } }) {
  const eco = await getEco();
  const reviews = await getReviews("shopReviews");
  const shopSections = await getShopSections();
  const hero = await getHero("shopHero");
  return (
    <>
      <Hero locale={locale} hero={hero} className="max-h-[500px]" />
      <Section id={slugify(shopSections[0].title.fr, { lower: true })} className="text-center">
        <Products locale={locale} shopSection={shopSections[0]} type="shopTitle" />
      </Section>
      <Section className="max-w-screen overflow-hidden w-full px-0 md:px-0 ">
        <ValueBar locale={locale} />
      </Section>
      <Section id={slugify(shopSections[1].title.fr, { lower: true })} className="text-center">
        <Products locale={locale} shopSection={shopSections[1]} type="shopTitle" />
      </Section>
      <Section>
        <Reviews id="reviews" reviews={reviews} />
      </Section>
      <Section id={slugify(shopSections[2].title.fr, { lower: true })} className="text-center">
        <Products locale={locale} shopSection={shopSections[2]} type="shopTitle" />
      </Section>
      <Section id={slugify(shopSections[3].title.fr, { lower: true })} className="text-center self-center">
        <Products className="" locale={locale} shopSection={shopSections[3]} type="shopTitle" />
      </Section>
      <Section id="eco" className="bg-nu-blue md:bg-none">
        <ShopEco locale={locale} eco={eco} />
      </Section>
      {/* <Footer /> */}
    </>
  );
}
