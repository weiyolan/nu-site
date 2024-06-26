import { cn } from "@/lib/utils";
import Stars from "./Stars";
import Typography from "./Typography";
import { Button } from "./ui/button";
import Link from "next/link";
import { ChevronRight, PlusIcon, ShoppingCart } from "lucide-react";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";
import { altImageType, buttonType, getColor, localeType } from "@/sanity/lib/interface";
import ConditionalLink from "./ConditionalLink";
// import { useShoppingCart } from "use-shopping-cart";
import AddToCartButton from "./ProductAddToCart";
// import { Product } from "use-shopping-cart/core";

type productType =
  | {
      type: "title";
      color: "bg-nu-yellow" | "bg-nu-green" | "bg-nu-blue" | "bg-nu-peach" | "bg-nu-purple";
      button: buttonType;
      title: string;
      description: string;
      subTitle: never;
      price?: never;
      rating?: never;
      slug?: never;
      images?: never;
    }
  | {
      type: "shopTitle";
      color: "bg-nu-yellow" | "bg-nu-green" | "bg-nu-blue" | "bg-nu-peach" | "bg-nu-purple";
      button?: never;
      title: string;
      description: string;
      price?: never;
      rating?: never;
      slug?: never;
      subTitle: never;
      images?: never;
    }
  | {
      type: "product";
      color?: never;
      button?: never;
      title: string;
      description: string;
      price: number;
      subTitle: string;
      rating: number;
      slug: { current: string };
      images: altImageType[];
    }
  | {
      type: "article";
      color?: never;
      button?: never;
      title: string;
      description: string;
      subTitle: never;
      price?: never;
      rating?: never;
      slug: { current: string };
      images: altImageType[];
    };

export interface ProductProps extends React.HTMLAttributes<HTMLDivElement> {
  product: productType;
  locale: localeType;
}

export default function Product({ product: { slug, title, type, description, price, rating, button, color, images, subTitle }, locale, className, ...props }: ProductProps) {
  // let Cmp: React.ElementType = type === "title" || type === "shopTitle" ? "div" : "link";

  return (
    <div
      // href={type === "title" || type === "shopTitle" ? undefined : `/shop/${slug.current}`}
      className={cn(
        `flex  relative flex-col group w-full  gap-2 sm:gap-3 lg:gap-4 sm:px-3 ${type === "title" || type === "shopTitle" ? " col-span-2 md:col-span-1 justify-center text-center py-4 px-4 mb-8 md:mb-0 " : " items-start"}`,
        className
      )}
      {...props}>
      {type !== "title" && type !== "shopTitle" && (
        <Link title={locale === "en" ? "Go to product" : "Voir le produit"} href={`/shop/${slug.current}`} className="w-full ">
          <AspectRatio className="relative">
            {/* {console.log("images alt", images?.alt?.fr)} */}
            <Image
              src={images[0].image.url}
              alt={images[0].alt?.[locale]}
              fill
              sizes="25vw"
              // placeholder="blur"
              // blurDataURL={images[0].image.metadata.lqip}
              className="object-contain opacity-100 group-hover:opacity-0 blur-0 group-hover:blur transition-all duration-300"
            />
            <Image
              src={images[1].image.url}
              alt={images[1].alt?.[locale]}
              fill
              sizes="25vw"
              placeholder="blur"
              blurDataURL={images[1].image.metadata.lqip}
              className="object-cover opacity-0 group-hover:opacity-100 blur group-hover:blur-0  transition-all duration-300  "
            />
          </AspectRatio>
        </Link>
      )}
      {(type === "title" || type === "shopTitle") && <div className={`absolute z-0 top-0 left-0 right-0 bottom-0 ${color}`} />}

      {type === "product" && <Stars className="mr-auto mt-1" rating={rating} options={{ dark: true, full: true }} />}
      <ConditionalLink title={locale === "en" ? "Go to product" : "Voir le produit"} href={slug && `/shop/${slug?.current}`} className=" gap-2 sm:gap-3 lg:gap-4 flex flex-col">
        <Typography
          variant={type === "title" || type === "shopTitle" ? "h2" : "h3"}
          className={`relative text-balance  group-hover:border-b-nu-black transition-colors group-focus-within:border-b-nu-black border-b-2 border-b-transparent duration-200 ${type === "title" || type === "shopTitle" ? "" : "mr-auto"} `}>
          {title}
        </Typography>
        <Typography
          variant={"p"}
          style={{ overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 8, lineClamp: 8, WebkitBoxOrient: "vertical" }}
          className={`relative  ${type === "title" || type === "shopTitle" ? "text-center leading-normal font-normal " : "text-justify text-sm "}`}>
          {description}
        </Typography>
      </ConditionalLink>
      {type === "product" && (
        <div className="flex flex-col justify-end  gap-4 items-center w-full p-1 relative mt-auto">
          {/* gap-16 */}
          <Typography variant={"h4"} className="font-corben font-normal w-full   text-left ">
            {"€ "}
            {price.toFixed(2)}
          </Typography>
          <div className="w-full flex gap-2 md:gap-4 flex-col md:flex-row">
            <Button asChild variant="secondary" className="group/button1 flex-1 w-full md:w-0 min-w-fit    ">
              {/* group-hover:opacity-100  transition-all duration-300 opacity-20 */}
              <Link className="" href={`/shop/${slug.current}`}>
                {/* <span className="group-hover/button1:w-fit w-0 transition-all  inline-block duration-300 overflow-hidden">{locale === "fr" ? "Voir Plus" : "See More"}</span>{" "} */}
                {locale === "fr" ? "Voir Plus" : "See More"}
                {/* <PlusIcon /> */}
              </Link>
            </Button>
            {/* {console.log(`https://nu-soins.com/shop/${slug.current}`)} */}
            <AddToCartButton
              className={`group/button2 flex-1 w-full md:w-0 min-w-fit `}
              locale={locale}
              product={{
                currency: "EUR",
                id: slug.current,
                name: title,
                description: subTitle,
                price: price * 100,
                image: images[0].image.url,
                product_data: {
                  metadata: {
                    // type: "soap",
                  },
                },
                price_data: {
                  // recurring: {
                  //   interval: "week",
                  // },
                },
              }}>
              {locale === "fr" ? "Ajouter" : "Add"}
            </AddToCartButton>
          </div>
        </div>
      )}
      {type === "title" && (
        <Button asChild className="mx-auto my-3 relative ">
          <Link className="" href={`${button.url}`}>
            {button.text?.[locale]}
          </Link>
        </Button>
      )}
      {type === "article" && (
        <Button variant="link" asChild size="sm" className=" relative items-center -mt-2 -ml-2 group/button text-base ">
          <Link className="" href={`/shop#${slug}`} title="">
            {locale === "fr" ? "Lire plus" : "Read more"}
            <ChevronRight className="size-4 group-hover/button:translate-x-1 transition-transform   mt-1" />
          </Link>
        </Button>
      )}
    </div>
  );
}

// product:{slug, title,description},
