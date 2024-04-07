import { cn } from "@/lib/utils";
import Stars from "./Stars";
import Typography from "./Typography";
import { Button } from "./ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";
import { altImageType, buttonType, localeType } from "@/sanity/lib/interface";

type productType =
  | {
      type: "title";
      color: "bg-nu-yellow" | "bg-nu-green" | "bg-nu-blue" | "bg-nu-peach" | "bg-nu-purple";
      button: buttonType;
      title: string;
      description: string;
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
      images?: never;
    }
  | {
      type: "product";
      color?: never;
      button?: never;
      title: string;
      description: string;
      price: number;
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
      price?: never;
      rating?: never;
      slug: { current: string };
      images: altImageType[];
    };

export interface ProductProps extends React.HTMLAttributes<HTMLDivElement> {
  product: productType;
  locale: localeType;
}

export default function Product({ product: { slug, title, type, description, price, rating, button, color, images }, locale, className, ...props }: ProductProps) {
  return (
    <div
      className={cn(
        `flex relative flex-col group w-full gap-2 sm:gap-3 lg:gap-4  ${type === "title" || type === "shopTitle" ? " col-span-2 md:col-span-1 justify-center text-center py-4 px-2 sm:px-3 lg:px-4" : " items-start"}`,
        className
      )}
      {...props}>
      {type !== "title" && type !== "shopTitle" && (
        <div className="w-full">
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
        </div>
      )}
      {(type === "title" || type === "shopTitle") && <div className={`absolute z-0 top-0 left-0 right-0 bottom-0 ${color}`} />}
      {type === "product" && <Stars className="mr-auto" rating={rating} dark />}
      <Typography variant={type === "title" || type === "shopTitle" ? "h2" : "h3"} className={`relative text-balance ${type === "title" || type === "shopTitle" ? "" : "mr-auto"}`}>
        {title}
      </Typography>
      <Typography variant={"p"} className={`relative  ${type === "title" || type === "shopTitle" ? "text-center " : "text-justify text-sm"}`}>
        {description}
      </Typography>

      {type === "product" && (
        <div className="flex flex-col justify-end md:justify-between md:flex-row gap-4  items-center w-full p-1 relative mt-auto">
          {/* gap-16 */}
          <Typography variant={"h4"} className="font-corben font-normal w-4/5 md:w-[4ch] text-left ">
            €{price.toFixed(2)}
          </Typography>
          <Button asChild className="flex-1 w-full md:w-fit">
            {/* group-hover:opacity-100  transition-all duration-300 opacity-20 */}
            <Link className="" href={`/shop/${slug.current}`}>
              {locale === "fr" ? "Voir Produit" : "See Product"}
            </Link>
          </Button>
        </div>
      )}
      {type === "title" && (
        <Button asChild className="mx-auto mt-4 relative mt-auto">
          <Link className="" href={`/shop#${button.url}`}>
            {button.text?.[locale]}
          </Link>
        </Button>
      )}
      {type === "article" && (
        <Button variant="link" asChild size="sm" className=" relative items-center -mt-2 -ml-2 group/button text-base mt-auto">
          <Link className="" href={`/shop#${slug}`}>
            {locale === "fr" ? "Lire article" : "Read article"}
            <ChevronRight className="size-4 group-hover/button:translate-x-1 transition-transform   mt-1" />
          </Link>
        </Button>
      )}
    </div>
  );
}

// product:{slug, title,description},
