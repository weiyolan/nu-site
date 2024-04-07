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
import { altImageType, buttonType, colorSanityType, localeStringType } from "@/sanity/lib/interface";

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
async function getHero(): Promise<{
  title: localeStringType;
  button: buttonType;
  altImage: altImageType;
}> {
  // Fetch shopSection with ID homeBlogs or something
  const hero = await client.fetch(`*[_type=='hero'][_id=='shopHero'][0]{...,altImage{
          alt, 'image':image.asset->{url, metadata{lqip}}
        }}`);
  // console.log(reviews)
  return hero;
}
export default async function Page({ params: { locale } }: { params: { locale: "en" | "fr" } }) {
  const eco = await getEco();
  const reviews = await getReviews("shopReviews");
  const shopSections = await getShopSections();
  const hero = await getHero();
  return (
    <>
      <Hero locale={locale} hero={hero} />
      <Section className="text-center">
        <Products locale={locale} shopSection={shopSections[0]} type="shopTitle" />
      </Section>
      <Section className="max-w-screen overflow-hidden w-full px-0 md:px-0 ">
        <ValueBar locale={locale} />
      </Section>
      <Section className="text-center">
        <Products locale={locale} shopSection={shopSections[1]} type="shopTitle" />
      </Section>
      <Section>
        <Reviews reviews={reviews} />
      </Section>
      <Section className="text-center">
        <Products locale={locale} shopSection={shopSections[2]} type="shopTitle" />
      </Section>
      <Section className="text-center self-center">
        <Products className="" locale={locale} shopSection={shopSections[3]} type="shopTitle" />
      </Section>
      <Section className="">
        <ShopEco eco={eco} />
      </Section>
      {/* <Footer /> */}
    </>
  );
}
