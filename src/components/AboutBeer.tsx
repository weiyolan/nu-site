import { cn } from "@/lib/utils";
import Image from "next/image";
import Typography from "./Typography";
import { Button } from "./ui/button";
import Link from "next/link";
import { AspectRatio } from "./ui/aspect-ratio";
import { altImageType, buttonType, colorSanityType, localeStringType, localeType } from "@/sanity/lib/interface";

export interface AboutBeerProps extends React.HTMLAttributes<HTMLDivElement> {
  locale: localeType;
  beerInfo: {
    title: localeStringType;
    description: localeStringType;
    color: colorSanityType;
    altImage: altImageType;
    button: buttonType;
  };
}

export default function AboutBeer({ locale, beerInfo: { title, description, color, altImage, button }, children, className, ...props }: AboutBeerProps) {
  return (
    <div className={cn("w-[120%] -left-[10%] relative mt-48", className)} {...props}>
      <AspectRatio ratio={19 / 9}>
        <Image placeholder="blur" blurDataURL={altImage.image.metadata.lqip} src={altImage.image.url} className="object-cover" fill alt={altImage.alt?.[locale]} />
      </AspectRatio>
      <div className="bg-nu-yellow shadow-lg min-w-[500px] max-w-prose absolute p-8 left-1/2 top-0 -translate-x-1/2 -translate-y-24 flex flex-col items-center">
        <Typography variant="h2" className="text-center whitespace-pre-wrap">
          {title?.[locale]}
        </Typography>
        <Typography variant="p" affects={"withPMargin"} className=" font-semibold text-center whitespace-wrap">
          {description?.[locale]}
        </Typography>
        <Button asChild className="w-fit mx-auto relative mt-6">
          <Link className="w-fit mx-auto relative mt-6" href={button.url}>
            {button.text?.[locale]}
          </Link>
        </Button>
      </div>
    </div>
  );
}
