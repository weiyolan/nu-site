import Hero from "@/components/Hero";
import Products from "@/components/Products";
// import ReviewNotFirst from "@/components/ReviewNotFirst";
import Section from "@/components/Section";
import ShopEco from "@/components/ShopEco";
import Typography from "@/components/Typography";
import ValueBar from "@/components/ValueBar";
import Footer from "@/components/Footer";
import { client } from "../../../sanity/lib/client";
import Reviews from "@/components/Reviews";

export async function getEco(): Promise<{
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

export async function getReviews(id: string): Promise<{
  citationsOn: boolean;
  title: { en: string; fr: string };
  description: { en: string; fr: string };
}> {
  const reviews = await client.fetch(`*[_type=='reviews'][_id=="${id}"][0]`);
  // console.log(reviews)
  return reviews;
}

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  const eco = await getEco();
  const reviews = await getReviews("shopReviews");

  return (
    <>
      <Hero src="/shop_hero.jpg" alt="women with beautiful curly hair" link="/shop" button="Essayer maintenant" text={"Nu, le shampoing solide\nà base de levure de bière"} />
      <Section>
        <Products />
      </Section>
      <Section className="max-w-screen overflow-hidden w-full px-0 md:px-0 ">
        <ValueBar />
      </Section>
      <Section>
        <Products />
      </Section>
      <Section>
        <Reviews reviews={reviews} />
      </Section>
      <Section>
        <Products />
      </Section>
      <Section className="text-center">
        <Typography variant={"h2"}>Un Cadeau, Un Tas De Plaisir</Typography>
        <Typography variant={"p"} affects={"subTitle"} className="max-w-prose mx-auto">
          Bienvenue dans le monde de la beauté naturelle avec notre shampoing solide exclusif, conçu spécialement pour les cheveux normaux
        </Typography>
        <Products className="mt-8" />
      </Section>
      <Section className="">
        <ShopEco eco={eco} />
      </Section>
      <Footer />
    </>
  );
}
