import { cn } from "@/lib/utils";
import Product from "./Product";
import Typography from "./Typography";
import { client } from "@/sanity/lib/client";
import slugify from "slugify";

export interface ProductsProps extends React.HTMLAttributes<HTMLInputElement> {
  locale: string;
  type?: "shopTitle";
  shopSection: {
    color: string;
    category: string;
    integrated: boolean;
    title: { en: string; fr: string };
    button: { ext: boolean; text: { en: string; fr: string }; url: string };
    description: { en: string; fr: string };
  };
}

function getColor(color: string): string {
  switch (color) {
    case "blue":
      return "bg-nu-blue";
    case "peach":
      return "bg-nu-peach";
    case "green":
      return "bg-nu-green";
    case "purple":
      return "bg-nu-purple";
    case "yellow":
      return "bg-nu-yellow";
  }
  return "bg-nu-peach";
}

async function getProducts(category: string) {
  let products = await client.fetch(`*[_type=='product'][category=='${category}']{rating, title, price,slug,description,subTitle,images[0..1]{...,'asset':image.asset->{...}}}`);
  return products;
}

export default async function Products({ locale, type, shopSection: { color, category, integrated, title, button, description }, children, className, ...props }: ProductsProps) {
  const products = await getProducts(category);
  return (
    <>
      {!integrated && (
        <>
          <Typography variant="h2" className="text-center">
            {title[locale || "fr"]}
          </Typography>
          <Typography variant="p" affects="subTitle" className="max-w-prose text-center mx-auto mb-8">
            {description[locale || "fr"]}
          </Typography>
        </>
      )}
      <div id={slugify(category)} className={cn("grid grid-cols-4 grid-flow-row gap-4 sm:gap-6", className)} {...props}>
        {integrated && (
          <Product
            product={{
              type: type || "title",
              color: getColor(color),
              slug: "product-slug",
              rating: 1,
              price: 15,
              title: title?.[locale],
              description: description?.[locale],
            }}
          />
        )}
        {products.map((product, i) => (
          // <div key={index} className="bg-nu-purple h-96"></div>
          <Product
            key={i}
            product={{
              type: "product",
              slug: product.slug.current,
              rating: product.rating,
              price: product.price,
              title: product.title?.[locale],
              description: product.description?.[locale],
              images: product.images,
            }}
          />
        ))}
      </div>
    </>
  );
}
