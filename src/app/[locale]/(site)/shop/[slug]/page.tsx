// import Link from "next/link";
// import { BreadcrumbPage, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Section from "@/components/Section";
import ProductDescription from "@/components/ProductDescription";
import NuLine from "@/components/NuLine";
// import Image from "next/image";
import ProductDetails from "@/components/ProductDetails";
import ValueBar from "@/components/ValueBar";
import Reviews from "@/components/Reviews";
import Products from "@/components/Products";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";

// import slugify from "slugify";
// import { Share } from "lucide-react";
import BreadcrumbWithCustomSeparator from "@/components/BreadCrumbs";
import { altImageType, buttonType, colorSanityType, localeStringType } from "@/sanity/lib/interface";
import ProductsRecommended from "@/components/ProductsRecommended";

// async function getData() {
//   // const res = await fetch('https://api.example.com/...')
//   // // The return value is *not* serialized
//   // // You can return Date, Map, Set, etc.
//   // if (!res.ok) {
//   //   // This will activate the closest `error.js` Error Boundary
//   //   throw new Error('Failed to fetch data')
//   // }
//   // return res.json()
//   return { product: { title: "Chaos", category: "Shampoing Solide", slug: "shampoing-solide" } };
// }

async function getRecommendedProducts(): Promise<{
  color: colorSanityType;
  integrated: boolean;
  title: localeStringType;
  description: localeStringType;
  // button: buttonType;
}> {
  const recommendedProducts = await client.fetch(`*[_type=='productRecommended'][0]`);
  // console.log(reviews)
  return { ...recommendedProducts, category: "recommended" };
}

async function getProduct(slug: string): Promise<{
  rating: number;
  weight: number;
  slug: { current: string };
  price: number;
  reviews: { description: localeStringType; title: localeStringType; citationsOn: boolean };
  title: localeStringType;
  description: localeStringType;
  color: colorSanityType;
  images: altImageType[];
  subTitle: localeStringType;
  category: string;
  details: { title: localeStringType; details: { fr: []; en: [] } }[];
}> {
  const product = await client.fetch(`*[_type=='product'][slug.current=='${slug}'][0]{...,'images':images[]{alt,'image':image.asset->{metadata{lqip},url}}}`);
  // console.log(product)
  return product;
}

export default async function Page({ params: { slug, locale } }: { params: { slug: string; locale: "en" | "fr" } }) {
  const { price, category, images, details, rating, weight, reviews, description, title, subTitle } = await getProduct(slug);

  const recommendedProducts = await getRecommendedProducts();
  // console.log("recommendedProducts", recommendedProducts);

  return (
    <>
      {/* <Section>
        <pre className="bg-secondary/50 p-4 rounded-lg my-2 ">{JSON.stringify(details, null, 2)}</pre>
      </Section> */}
      <Section className="">
        <BreadcrumbWithCustomSeparator category={category} title={title?.[locale]} />
      </Section>
      <Section id="description">
        <ProductDescription
          locale={locale}
          altImage={images[0]}
          product={{
            price: price,
            weight: weight,
            title: title?.[locale],
            subTitle: subTitle?.[locale],
            rating: rating,
            description: description?.[locale],
            details: details,
          }}
        />
      </Section>
      <Section>
        <NuLine />
      </Section>
      <Section id="details">
        <ProductDetails locale={locale} images={images.slice(1, images.length)} details={details} />
      </Section>
      <Section className="max-w-none px-0 md:px-0 2xl:px-0 overflow-hidden">
        <ValueBar locale={locale} />
      </Section>
      <Section id="reviews">
        <Reviews reviews={reviews} />
      </Section>
      <Section id="recommended">
        <ProductsRecommended currentProduct={{ slug: slug, category: category }} className="text-left mr-auto ml-0" locale={locale} shopSection={recommendedProducts} />
      </Section>
    </>
  );
}

export async function generateStaticParams() {
  const slugs = await client.fetch(`*[_type=='product']{'slug':slug.current}`);
  // console.log(slugs)
  // const posts = await fetch('https://.../posts').then((res) => res.json())
  // const posts = [
  //   { slug: "product1", category: "Shampoing-solide" },
  //   { slug: "product2", category: "accessoires" },
  // ];

  return slugs;
  // return posts.map(() => ({
  //   slug: 'product1',
  //   // category: post.category,
  // }));
}
