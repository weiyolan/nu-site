import { cn } from "@/lib/utils";
import Image from "next/image";
import Typography from "./Typography";
import { Button } from "./ui/button";
import Link from "next/link";
import { AspectRatio } from "./ui/aspect-ratio";
import { altImageType, buttonType, colorSanityType, localeBlockContentType, localeStringType, localeType } from "@/sanity/lib/interface";
import { useMediaQuery } from "usehooks-ts";
import PortableText from "./PortableText";
import ConditionalLink from "./ConditionalLink";

export interface AboutBeerProps extends React.HTMLAttributes<HTMLDivElement> {
  locale: localeType;
  beerInfo: {
    title: localeStringType;
    description: localeBlockContentType;
    color: colorSanityType;
    altImage: altImageType;
    button: buttonType;
  };
}

export default function AboutBeer({ locale, beerInfo: { title, description, color, altImage, button }, children, className, ...props }: AboutBeerProps) {
  // const mdScreen = useMediaQuery("(min-width: 1024px)");
  return (
    <div className={cn("w-full h-[120vh] md:h-[550px] xl:h-[720px] 2xl:w-[120%] 2xl:-ml-[10%] relative md:mt-48 xl:mt-56", className)} {...props}>
      {/* <AspectRatio ratio={mdScreen ? 16 / 9 : undefined} className="h-full relative"> */}
      <div className="h-full reltaive">
        <Image placeholder="blur" sizes="100vw" blurDataURL={altImage.image.metadata.lqip} src={altImage.image.url} className="object-cover" fill alt={altImage.alt?.[locale]} />
        {/* </AspectRatio> */}
      </div>
      <div className="bg-nu-yellow text-center shadow-lg w-[85%] md:min-w-[500px] max-w-prose absolute p-4 md:p-8 left-1/2 top-1/2 md:top-0 -translate-x-1/2 -translate-y-1/2 md:-translate-y-16 xl:-translate-y-24 flex flex-col items-center">
        <Typography variant="h2" className="text-center whitespace-pre-wrap ">
          {title?.[locale]}
        </Typography>

        <PortableText value={description?.[locale]} locale={locale}></PortableText>

        <Button asChild className="w-fit mx-auto relative mt-6">
          <ConditionalLink className="w-fit mx-auto relative mt-6" href={button.url}>
            {button.text?.[locale]}
          </ConditionalLink>
        </Button>
      </div>
    </div>
  );
}
