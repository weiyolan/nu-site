import { cn } from "@/lib/utils";
import Product from "./Product";
import Typography from "./Typography";
import { client } from "@/sanity/lib/client";
import slugify from "slugify";
import { altImageType, buttonType, colorSanityType, getColor, localeStringType, localeType } from "../sanity/lib/interface";

export interface ProductsProps extends React.HTMLAttributes<HTMLInputElement> {
  locale: localeType;
  type?: "shopTitle";
  shopSection: {
    color: colorSanityType;
    category: string;
    integrated: boolean;
    title: localeStringType;
    button: buttonType;
    description: localeStringType;
  };
}

async function getProducts(category: string): Promise<
  {
    slug: { current: string };
    description: localeStringType;
    subTitle: localeStringType;
    title: localeStringType;
    price: number;
    rating: number;
    images: altImageType[];
  }[]
> {
  let products = await client.fetch(
    category === "favorites"
      ? `*[_type=='product'][favorite==true]{rating, title, price,slug,description,subTitle,images[0..1]{alt,'image':image.asset->{url, metadata{lqip}}}}`
      : category === "recommended"
        ? `*[_type=='product'][category=='${"shampoings-solides"}']{rating, title, price,slug,description,subTitle,images[0..1]{alt,'image':image.asset->{url, metadata{lqip}}}}`
        : `*[_type=='product'][category=='${category}']{rating, title, price,slug,description,subTitle,images[0..1]{alt,'image':image.asset->{url, metadata{lqip}}}}`
  );
  // altImage{
  // alt, 'image':image.asset->{url, metadata{lqip}}
  //
  return products;
}

export default async function Products({ locale, type, shopSection: { color, category, integrated, title, button, description }, children, className, ...props }: ProductsProps) {
  const products = await getProducts(category);
  return (
    <>
      {!integrated && (
        <>
          <Typography variant="h2" className={cn("text-center", className)}>
            {title?.[locale]}
          </Typography>
          <Typography variant="p" affects="subTitle" className={cn("text-center max-w-prose mx-auto text-balance mb-8", className)}>
            {description?.[locale]}
          </Typography>
        </>
      )}
      <div id={slugify(category)} className={cn("grid grid-cols-2 md:grid-cols-4 grid-flow-row gap-4 sm:gap-6 xl:gap-10 scroll-mt-20", className)} {...props}>
        {integrated && (
          <Product
            locale={locale}
            product={{
              type: type || "title",
              color: getColor(color),
              // slug: "product-slug",
              // rating: 1,
              // price: 15,
              title: title?.[locale],
              description: description?.[locale],
              button: type === "shopTitle" ? undefined : button,
            }}
          />
        )}
        {products.map((product, i) => (
          // <div key={index} className="bg-nu-purple h-96"></div>
          <Product
            locale={locale}
            key={i}
            product={{
              type: "product",
              slug: product.slug,
              rating: product.rating,
              price: product.price,
              title: product.title?.[locale],
              description: product.description?.[locale],
              images: product.images,
              // button: button,
            }}
          />
        ))}
      </div>
    </>
  );
}
