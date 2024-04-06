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
import { altImageType, buttonType, colorSanityType, localeStringType } from "@/sanity/lib/interface";

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
  description: localeStringType;
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
  description: localeStringType;
  altImage: altImageType;
}> {
  // Fetch shopSection with ID homeBlogs or something
  const imagePop = await client.fetch(`*[_type=='imagePop'][_id=='article2'][0]{...,altImage{
          alt, 'image':image.asset->{url, metadata{lqip}}
        }}`);
  // console.log(reviews)
  return imagePop;
}

async function getHero(): Promise<{
  title: localeStringType;
  button: buttonType;
  altImage: altImageType;
}> {
  // Fetch shopSection with ID homeBlogs or something
  const hero = await client.fetch(`*[_type=='hero'][_id=='homeHero'][0]{...,altImage{
          alt, 'image':image.asset->{url, metadata{lqip}}
        }}`);
  // console.log(reviews)
  return hero;
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
      {/* <Section>
        <pre>{JSON.stringify(productPresentation, null, 2)}</pre>
      </Section> */}
      <Section className="mt-16 md:px-24 2xl:px-24">
        <ProductsPresentation locale={locale} sanityData={productPresentation} />
      </Section>
      <Section className="max-w-screen overflow-hidden w-full px-0 md:px-0 ">
        <ValueBar />
      </Section>
      <Section>
        <Reviews reviews={reviews} />
      </Section>
      <Section className="max-w-screen bg-nu-blue px-0 w-full">
        <HomeEssayerNu locale={locale} cta={cta} />
      </Section>
      <Section>
        <ImagePop locale={locale} imagePop={imagePop1} />
      </Section>
      <Section>
        <NuLine big className="flex justify-center " />
      </Section>
      {favoEnabled && (
        <Section>
          <Products locale={locale} shopSection={favos} />
        </Section>
      )}
      <Section className="-mb-8">
        <ImagePop locale={locale} imgRight imagePop={imagePop2} />
      </Section>

      {/* <Section> */}
      {/* <HomeBlogs locale={locale} /> */}
      {/* </Section> */}
    </>
  );
}
