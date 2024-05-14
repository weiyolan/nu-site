import { cn } from "@/lib/utils";
import Product from "./Product";
import Typography from "./Typography";
import { client } from "@/sanity/lib/client";
import { altImageType, buttonType, colorSanityType, getColor, localeStringType, localeType } from "../sanity/lib/interface";

export interface ProductsRecommendedProps extends React.HTMLAttributes<HTMLInputElement> {
  locale: localeType;
  // type?: "shopTitle";
  currentProduct: { slug: string; category: string };
  shopSection: {
    color: colorSanityType;
    integrated: boolean;
    title: localeStringType;
    // button: buttonType;
    description: localeStringType;
  };
}

async function getRecommendedProducts({ slug, category }: { slug: string; category: string }): Promise<
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
    `*[_type=='product'][slug.current!='${slug}'][0..3]{rating, title, price,slug,description,subTitle,images[0..1]{alt,'image':image.asset->{url, metadata{lqip}}}}`
    // category === "bons-cadeau"
    // ? `*[_type=='product'][slug.current!='${slug}'][category=='bons-cadeau'||category=='packs'][0..3]{rating, title, price,slug,description,subTitle,images[0..1]{alt,'image':image.asset->{url, metadata{lqip}}}}`
    // : category === "packs"
    // ? `*[_type=='product'][slug.current!='${slug}'][category=='packs'||category=='bons-cadeau'][0..3]{rating, title, price,slug,description,subTitle,images[0..1]{alt,'image':image.asset->{url, metadata{lqip}}}}`
    // : `*[_type=='product'][slug.current!='${slug}'][category=='${category === "shampoings-solides" ? "shampoings-solides" : "accessoires"}'||category=='category==${category === "shampoings-solides" ? "accessoires" : "shampoings-solides"}][0..3]{rating, title, price,slug,description,subTitle,images[0..1]{alt,'image':image.asset->{url, metadata{lqip}}}}`
  );
  // altImage{
  // alt, 'image':image.asset->{url, metadata{lqip}}
  //
  return products;
}

export default async function ProductsRecommended({
  currentProduct,
  locale,
  shopSection: { color, integrated, title, description },
  children,
  className,
  ...props
}: ProductsRecommendedProps) {
  const products = await getRecommendedProducts(currentProduct);

  return (
    // <>
    //   {!integrated && (
    //     <>
    //       <Typography variant="h2" className={cn("text-center", className)}>
    //         {title?.[locale]}
    //       </Typography>
    //       <Typography variant="p" affects="subTitle" className={cn("text-center max-w-prose mx-auto text-balance mb-8", className)}>
    //         {description?.[locale]}
    //       </Typography>
    //     </>
    //   )}
    //   <div className={cn("grid grid-cols-4 grid-flow-row gap-4 sm:gap-6", className)} {...props}>
    //     {integrated && (
    //       <Product
    //         locale={locale}
    //         product={{
    //           type: "shopTitle",
    //           color: getColor(color),
    //           // slug: "product-slug",
    //           // rating: 1,
    //           // price: 15,
    //           title: title?.[locale],
    //           description: description?.[locale],
    //         }}
    //       />
    //     )}
    //     {products.map((product, i) => (
    //       // <div key={index} className="bg-nu-purple h-96"></div>
    //       <Product
    //         locale={locale}
    //         key={i}
    //         product={{
    //           type: "product",
    //           slug: product.slug,
    //           rating: product.rating,
    //           price: product.price,
    //           title: product.title?.[locale],
    //           description: product.description?.[locale],
    //           images: product.images,
    //           // button: button,
    //         }}
    //       />
    //     ))}
    //   </div>
    // </>
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
      <div className={cn("grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-4  scroll-mt-20", className)} {...props}>
        {integrated && (
          <Product
            locale={locale}
            product={{
              type: "shopTitle",
              color: getColor(color),
              // slug: "product-slug",
              // rating: 1,
              // price: 15,
              title: title?.[locale],
              description: description?.[locale],
              button: undefined,
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
