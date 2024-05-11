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
import { altImageType, buttonType, colorSanityType, getHero, localeBlockContentType, localeStringType } from "@/sanity/lib/interface";

async function getReviews(id: string): Promise<{
  citationsOn: boolean;
  title: localeStringType;
  description: localeStringType;
}> {
  const reviews = await client.fetch(`*[_type=='reviews'][_id=="${id}"][0]`);
  // console.log(reviews)
  return reviews;
}

// async function getBlogs(): Promise<
//   {
//     color: string;
//     category: string;
//     integrated: boolean;
//     title: localeStringType;
//     button: buttonType;
//     description: localeStringType;
//   }[]
// > {
//   // Fetch shopSection with ID homeBlogs or something
//   const blogs = await client.fetch(`*[_type=='shopSection']|order(orderRank)`);
//   // console.log(reviews)
//   return blogs;
// }

async function getFavorites(): Promise<{
  color: colorSanityType;
  integrated: boolean;
  enabled: boolean;
  title: localeStringType;
  button: buttonType;
  description: localeStringType;
  category: string;
}> {
  // Fetch shopSection with ID homeBlogs or something
  const favos = await client.fetch(`*[_type=='homeFavorites'][0]`);
  // console.log(reviews)
  return { ...favos, category: "favorites" };
}

async function getProductPresentation(): Promise<{
  title: localeStringType;
  description: localeStringType;
  topLeft: {
    title: localeStringType;
    description: localeStringType;
    button: localeStringType;
    slug: { current: string };
    altImage: altImageType;
  };
  topRight: {
    title: localeStringType;
    description: localeStringType;
    button: localeStringType;
    slug: { current: string };
    altImage: altImageType;
  };
  bottomLeft: {
    title: localeStringType;
    description: localeStringType;
    button: localeStringType;
    slug: { current: string };
    altImage: altImageType;
  };
  bottomRight: {
    title: localeStringType;
    description: localeStringType;
    button: localeStringType;
    slug: { current: string };
    altImage: altImageType;
  };
}> {
  const productPresentation = await client.fetch(
    `*[_type=='homeProductPresentation'][0]{
      description,
      title,
      topLeft{
        button,
        title,
        description,
        'slug':url->slug,
        altImage{
          alt, 'image':image.asset->{url, metadata{lqip}}
        }
      },
      topRight{
        button,
        title,
        description,
        'slug':url->slug,
        altImage{
          alt,'image':image.asset->{url, metadata{lqip}}
        }
      },
      bottomLeft{
        button,
        title,
        description,
        'slug':url->slug,
        altImage{
          alt,'image':image.asset->{url, metadata{lqip}}
        }
      },
      bottomRight{
        button,
        title,
        description,
        'slug':url->slug,
        altImage{
          alt,'image':image.asset->{url, metadata{lqip}}
        }
      }
    }
    `
  );
  return productPresentation;
}

async function getCTA(): Promise<{
  title: localeStringType;
  promotion: localeStringType;
  button: buttonType;
  description: localeStringType;
}> {
  // Fetch shopSection with ID homeBlogs or something
  const cta = await client.fetch(`*[_type=='cta'][0]`);
  // console.log(reviews)
  return cta;
}

async function getImagePop1(): Promise<{
  color: colorSanityType;
  title: localeStringType;
  button: buttonType;
  description: localeBlockContentType;

  altImage: altImageType;
}> {
  // Fetch shopSection with ID homeBlogs or something
  const imagePop = await client.fetch(`*[_type=='imagePop'][_id=='article'][0]{...,altImage{
          alt, 'image':image.asset->{url, metadata{lqip}}
        }}`);
  // console.log(reviews)
  return imagePop;
}

async function getImagePop2(): Promise<{
  color: colorSanityType;
  title: localeStringType;
  button: buttonType;
  description: localeBlockContentType;
  altImage: altImageType;
}> {
  // Fetch shopSection with ID homeBlogs or something
  const imagePop = await client.fetch(`*[_type=='imagePop'][_id=='article2'][0]{...,altImage{
          alt, 'image':image.asset->{url, metadata{lqip}}
        }}`);
  // console.log(reviews)
  return imagePop;
}

export default async function Page({ params: { locale } }: { params: { locale: "en" | "fr" } }) {
  const reviews = await getReviews("homeReviews");
  const productPresentation = await getProductPresentation();
  const cta = await getCTA();
  const imagePop1 = await getImagePop1();
  const imagePop2 = await getImagePop2();
  const { enabled: favoEnabled, ...favos } = await getFavorites();
  const hero = await getHero();
  return (
    <>
      <Hero locale={locale} hero={hero} increasedContrast />

      <Section id="produits" className="mt-16 pb-8 sm:px-4 md:px-6 lg:px-12 xl:px-0 2xl:px-0 2xl:max-w-[1300px]">
        <ProductsPresentation locale={locale} sanityData={productPresentation} />
      </Section>
      <Section>
        <NuLine className="flex justify-center " />
      </Section>
      <Section id={"levure-de-bière"}>
        <ImagePop locale={locale} imagePop={imagePop1} />
      </Section>
      <Section className="max-w-screen overflow-hidden w-full px-0 md:px-0 ">
        <ValueBar locale={locale} />
      </Section>
      <Section id={"corps-et-nature"} className="-mb-8">
        <ImagePop locale={locale} imgRight imagePop={imagePop2} />
      </Section>
      <Section id="reviews">
        <Reviews reviews={reviews} />
      </Section>
      {favoEnabled && (
        <Section id="vitrine">
          <Products locale={locale} shopSection={favos} />
        </Section>
      )}
      <div className="w-full overflow-x-hidden py-12 md:py-16 md:-mb-16">
        <Section id={"essayer-nu"} className=" max-w-[110vw] w-[110vw] mx-auto bg-nu-blue rotate-2 -ml-[5vw] md:px-0 ">
          <HomeEssayerNu locale={locale} cta={cta} className="-rotate-2 px-12 " />
        </Section>
      </div>
      {/* <Section> */}
      {/* <HomeBlogs locale={locale} /> */}
      {/* </Section> */}
    </>
  );
}
