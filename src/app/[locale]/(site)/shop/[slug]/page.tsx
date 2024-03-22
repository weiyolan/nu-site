import Link from "next/link";
import { BreadcrumbPage, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
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

import slugify from "slugify";
import { Share } from "lucide-react";

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

async function getProduct(slug: string) {
  const product = await client.fetch(`*[_type=='product'][slug.current=='${slug}'][0]{...,'images':images[]{alt,'image':image.asset->{...,url}}}`);
  // console.log(product)
  return product;
}

export default async function Page({ params: { slug, locale } }: { params: { slug: string; locale: string } }) {
  const { price, cat, images, details, rating, weight, reviews, description, title, subTitle } = await getProduct(slug);
  // const { locale } = useRouter();
  // const reviews = getReviews()
  // console.log(product)
  return (
    <>
      {/* <Section>
        <pre className="bg-secondary/50 p-4 rounded-lg my-2 ">{JSON.stringify(details, null, 2)}</pre>
      </Section> */}
      <Section className="">
        <BreadcrumbWithCustomSeparator category={cat} title={title} />
      </Section>
      <Section>
        <ProductDescription
          image={{ src: images[0].image.url, alt: images[0].alt?.[locale] }}
          product={{
            price: price,
            weight: weight,
            title: title,
            subTitle: subTitle?.[locale],
            rating: rating,
            description: description?.[locale],
            details: details,
          }}
        />
      </Section>
      <Section>
        <NuLine big />
      </Section>
      <Section>
        <ProductDetails images={images.slice(1, images.length)} details={details} />
      </Section>
      <Section className="max-w-none px-0 md:px-0 2xl:px-0 overflow-hidden">
        <ValueBar />
      </Section>
      <Section>
        <Reviews reviews={reviews} />
      </Section>
      <Section>
        <Products />
      </Section>
      <Footer />
    </>
  );
}

export function BreadcrumbWithCustomSeparator({ category, title }: { category: string; title: string }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/shop">Shop</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/shop#${slugify(category, { lower: true })}`}>{category}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{title}</BreadcrumbPage> <Share className="size-4" />
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
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
