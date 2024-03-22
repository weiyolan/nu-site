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

export default function Page({ params: { locale } }: { params: { locale: string } }) {
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
        <AboutTiles />
      </Section>
      <Section className="max-w-screen overflow-hidden w-full px-0 md:px-0 ">
        <ValueBar />
      </Section>
      <Section>
        <AboutBeer />
      </Section>
      <Section>
        <ImagePop
          title={"Je Suis Lou, Pharmacienne\net Fondatrice de NU"}
          text={`Salut à tous ! Je suis Lou, et aujourd'hui, je veux partager avec vous mon histoire. En 2019, j'ai entamé une aventure passionnante. Mon objectif était de c\n
Cette aventure n'a pas été sans son lot de défis, mais ma détermination à créer quelque chose d'extraordinaire persistait. Aujourd'hui, je suis fière de vous présenter un produit qui est le fruit de ma persévéran`}
          button={"En lire plus"}
          color="bg-nu-peach"
          img={{ src: "/about_Lou.jpg", alt: "peaceful dunes" }}></ImagePop>
      </Section>
      <Section>
        <AboutValues />
      </Section>
      <Section>
        <NuLine big></NuLine>
      </Section>
      <div className="relative">
        <Image src="/about_ingredients.png" alt="spoons filled with spices" width={1460 / 3} height={2735 / 3} className="w-1/6 h-auto absolute left-0  top-24 " />
        <Section>
          <AboutIngredients />
        </Section>
      </div>
      <Section>
        <AboutBref />
      </Section>
      <Footer />
    </>
  );
}
