"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Typography from "./Typography";
import { Button } from "./ui/button";
import Link from "next/link";
import { AspectRatio } from "./ui/aspect-ratio";
import { altImageType, buttonType, colorSanityType, localeStringType, localeType } from "@/sanity/lib/interface";
import { useMediaQuery } from "usehooks-ts";

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
  const mdScreen = useMediaQuery("(min-width: 1024px)");
  return (
    <div className={cn("w-screen -ml-[16px] h-[50vh] lg:w-[120%] lg:-left-[10%] relative mt-48", className)} {...props}>
      <AspectRatio ratio={mdScreen ? 19 / 9 : undefined}>
        <Image placeholder="blur" blurDataURL={altImage.image.metadata.lqip} src={altImage.image.url} className="object-cover" fill alt={altImage.alt?.[locale]} />
      </AspectRatio>
      <div className="bg-nu-yellow shadow-lg w-4/5 lg:min-w-[500px] max-w-prose absolute p-2 lg:p-8 left-1/2 top-0 -translate-x-1/2 -translate-y-24 flex flex-col items-center">
        <Typography variant="h2" className="text-center whitespace-pre-wrap ">
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
