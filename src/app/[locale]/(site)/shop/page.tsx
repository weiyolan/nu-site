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

async function getEco(): Promise<{
  description: { en: string; fr: string };
  title: { en: string; fr: string };
  cards: {
    title: { en: string; fr: string };
    description: { en: string; fr: string };
    text: { en: string; fr: string };
    icon: { name: string };
  }[];
}> {
  const eco = await client.fetch(`*[_type=='ecology'][0]`);
  // console.log(eco.cards);
  return eco;
}

async function getReviews(id: string): Promise<{
  citationsOn: boolean;
  title: { en: string; fr: string };
  description: { en: string; fr: string };
}> {
  const reviews = await client.fetch(`*[_type=='reviews'][_id=="${id}"][0]`);
  // console.log(reviews)
  return reviews;
}

async function getShopSections(): Promise<
  {
    color: string;
    category: string;
    integrated: boolean;
    title: { en: string; fr: string };
    button: { ext: boolean; text: { en: string; fr: string }; url: string };
    description: { en: string; fr: string };
  }[]
> {
  const shopSections = await client.fetch(`*[_type=='shopSection']|order(orderRank)`);
  // console.log(reviews)
  return shopSections;
}

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  const eco = await getEco();
  const reviews = await getReviews("shopReviews");
  const shopSections = await getShopSections();
  return (
    <>
      <Hero src="/shop_hero.jpg" alt="women with beautiful curly hair" link="/shop" button="Essayer maintenant" text={"Nu, le shampoing solide\nà base de levure de bière"} />
      <Section>
        <Products locale={locale} shopSection={shopSections[0]} type='shopTitle' />
      </Section>
      <Section className="max-w-screen overflow-hidden w-full px-0 md:px-0 ">
        <ValueBar />
      </Section>
      <Section>
        <Products locale={locale} shopSection={shopSections[1]} type='shopTitle' />
      </Section>
      <Section>
        <Reviews reviews={reviews} />
      </Section>
      <Section>
        <Products locale={locale} shopSection={shopSections[2]} type='shopTitle' />
      </Section>
      <Section className="text-center">
        {/* <Typography variant={"h2"}>Un Cadeau, Un Tas De Plaisir</Typography>
        <Typography variant={"p"} affects={"subTitle"} className="max-w-prose mx-auto">
          Bienvenue dans le monde de la beauté naturelle avec notre shampoing solide exclusif, conçu spécialement pour les cheveux normaux
        </Typography> */}
        <Products className="" locale={locale} shopSection={shopSections[3]} type='shopTitle' />
      </Section>
      <Section className="">
        <ShopEco eco={eco} />
      </Section>
      <Footer />
    </>
  );
}
