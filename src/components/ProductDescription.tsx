import { cn } from "@/lib/utils";
import Image from "next/image";
import Typography from "./Typography";
import Stars from "./Stars";
import { Button } from "./ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import slugify from "slugify";
import { altImageType, localeStringType, localeType } from "@/sanity/lib/interface";
// import { toPlainText } from "@portabletext/react";

export interface ProductDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
  locale: localeType;
  altImage: altImageType;
  product: {
    title: string;
    subTitle: string;
    rating: number;
    description: string;
    // weight: number;
    extraInfo: { title: localeStringType; description: localeStringType }[];
    price: number;
    details: { title: localeStringType; details: { fr: []; en: [] } }[];
  };
}

export default function ProductDescription({
  locale,
  altImage: { image, alt },
  product: { title, subTitle, rating, price, description, extraInfo, details },
  className,
  ...props
}: ProductDescriptionProps) {
  return (
    <div className={cn("w-full flex gap-8", className)} {...props}>
      <div className="flex-1 w-full relative flex items-center justify-center ">
        <Image src={image.url} alt={alt?.[locale]} fill priority className="object-contain drop-shadow-lg" />
        {/* placeholder="blur" blurDataURL={image.metadata.lqip} */}
      </div>
      <div className="flex-1 w-full flex-col flex items-start justify-start gap-2">
        <Typography variant={"h1"} className="mb-0">
          {title}
        </Typography>
        <Typography variant={"h2"} className="mt-0 mb-1">
          {subTitle}
        </Typography>
        <Stars rating={rating} options={{ dark: true }} className="my-2" />
        <Typography variant={"p"} className="mb-2">
          {description}
        </Typography>
        {extraInfo && (
          <div className="flex-col gap-2">
            {extraInfo.map((info, i) => (
              <Typography key={"info-" + (i + 1)} variant={"p"} className="font-bold text-sm ">{`${info?.title?.[locale]}: ${info?.description?.[locale]}`}</Typography>
            ))}
          </div>
        )}
        <div className="flex my-6 gap-6">
          <Button className="" size="lg">
            {locale === "en" ? "Add to basket" : "Ajouter au panier"}
          </Button>
          <Typography variant={"h2"}>€{price.toFixed(2)}</Typography>
        </div>

        <div className="flex ">
          {details.map((section, i) => (
            <Button variant="link" key={i} asChild className=" relative items-center -mt-2 -ml-2 group/button text-base">
              <Link className="" href={`#${slugify(section.title?.[locale], { lower: true })}`}>
                {section.title?.[locale]}
                <ChevronRight className="size-4 group-hover/button:translate-x-1 transition-transform duration-200 ease-out  mt-1" />
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
