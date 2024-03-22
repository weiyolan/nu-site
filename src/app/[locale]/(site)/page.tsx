import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ImagePop from "@/components/ImagePop";
import NuLine from "@/components/NuLine";
import Reviews from "@/components/Reviews";
import Section from "@/components/Section";
import Typography from "@/components/Typography";
import ValueBar from "@/components/ValueBar";
import ProductsPresentation from "@/components/HomeProductsPresentation";
import Products from "@/components/Products";
import HomeBlogs from "@/components/HomeBlogs";
import HomeEssayerNu from "@/components/HomeEssayerNu";
import { client } from "@/sanity/lib/client";

async function getReviews(id: string): Promise<{
  citationsOn: boolean;
  title: { en: string; fr: string };
  description: { en: string; fr: string };
}> {
  const reviews = await client.fetch(`*[_type=='reviews'][_id=="${id}"][0]`);
  // console.log(reviews)
  return reviews;
}

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  const reviews = await getReviews("homeReviews");

  return (
    <>
      <Hero
        src="/main_heroHair.jpg"
        alt="femme dans le bain avec shampoing"
        text={`Le shampoing solide\naux levures de bières`}
        link={"/"}
        button="Voir les produits"
        increasedContrast
      />
      <Section className="mt-16 md:px-24 2xl:px-24">
        <ProductsPresentation />
      </Section>
      <Section className="max-w-screen overflow-hidden w-full px-0 md:px-0 ">
        <ValueBar />
      </Section>
      <Section>
        <Reviews reviews={reviews} />
      </Section>
      <Section className="max-w-screen bg-nu-blue px-0 w-full">
        <HomeEssayerNu />
      </Section>
      <Section>
        <ImagePop
          img={{ src: "/main_beer.jpg", alt: "beer" }}
          text={`Alors, prêts à rejoindre l'aventure NU, où l'art, la science et la nature se rencontrent pour créer quelque chose de vraiment spécial ? Essayez mon shampoing solide, et comme  moi, vous allez l'adorer. Vos cheveux vous remercieront, et la planète aussi !`}
          title={`Un shampoing solide à\nbase de levure de bière`}
          button={"Découvrez les bienfaits"}
          color="bg-nu-yellow"
        />
      </Section>
      <Section>
        <NuLine big className="flex justify-center " />
      </Section>
      <Section>
        <Products />
      </Section>
      <Section>
        <ImagePop
          imgRight
          img={{ src: "/main_dog.jpg", alt: "dog" }}
          text={`Mais mon engagement ne s'arrête pas là. Les emballages que j'utilise sont faits à partir de matériaux recyclés, car la préservation de notre planète est au cœur de ma démarche. Mon shampoing NU n'est pas simplement un produit, c'est une invitation à rejoindre une communauté engagée. C'est une histoire d'amour pour la nature et d'engagement envers notre belle planète. Chaque fois que vous utilisez mon shampoing solide, vous `}
          title={`Nu est un shampoing pour le corps et la nature`}
          color="bg-nu-green"
          button={"Essayer Maintenant"}
        />
      </Section>

      <Section>
        <Typography variant="h2" className="text-center">
          En savoir plus?
        </Typography>
        <Typography variant={"p"} affects={"subTitle"} className="text-center mb-12 max-w-prose mx-auto">
          Explorez le monde de NU à travers nos articles de haut qualité. Lisez en plus de détails sur vos sujets favoris
        </Typography>
        <HomeBlogs />
        {/* Products with articles */}
      </Section>

      <Footer className="-mt-8" />
    </>
  );
}
