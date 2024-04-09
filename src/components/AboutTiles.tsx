import { cn } from "@/lib/utils";
import Typography from "./Typography";
import Image from "next/image";
import NuLogo from "./NuLogo";
import { altImageType, colorSanityType, getColor, localeStringType, localeType } from "@/sanity/lib/interface";

export interface AboutTilesProps extends React.HTMLAttributes<HTMLDivElement> {
  locale: localeType;
  squareInfo: {
    title: localeStringType;
    description: localeStringType;
    colors: colorSanityType[];
    altImages: altImageType[];
    square: {
      title: localeStringType;
      description: localeStringType;
    };
  };
}

export default function AboutTiles({ locale, squareInfo: { title, description, altImages, colors, square }, children, className, ...props }: AboutTilesProps) {
  return (
    <div className={cn("", className)} {...props}>
      <Typography variant="h2" className="text-center">
        {title?.[locale]}
      </Typography>
      <Typography variant="p" affects={"subTitle"} className=" font-semibold text-center whitespace-pre-wrap">
        {description?.[locale]}
      </Typography>
      <div className="w-auto grid grid-cols-4 grid-rows-2 gap-4  mt-8 xl:px-24">
        <div className="relative bg-nu-blue row-start-1 col-span-2 col-start-1 h-200 ">
          <Image
            placeholder="blur"
            blurDataURL={altImages[0].image.metadata.lqip}
            alt={altImages[0].alt?.[locale]}
            src={altImages[0].image.url}
            fill
            className="object-cover object-center"
          />
        </div>
        <div className={`relative text-center ${getColor(colors[0])} flex flex-col justify-center row-start-2 col-span-2 col-start-1 min-h-200 p-8`}>
          <Typography variant={"h3"} className="mb-4 text-3xl">
            {square.title?.[locale]}
          </Typography>
          <Typography variant={"p"} className="">
            {square.description?.[locale]}
          </Typography>
        </div>
        <div className={`relative ${getColor(colors[1])} col-span-1 col-start-3 flex items-center justify-center `}>
          <NuLogo />
        </div>
        <div className="relative bg-nu-peach row-start-2 col-span-1 col-start-3  ">
          <Image
            placeholder="blur"
            blurDataURL={altImages[1].image.metadata.lqip}
            alt={altImages[1].alt?.[locale]}
            src={altImages[1].image.url}
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="relative bg-nu-yellow row-start-1 row-span-2 col-start-4  ">
          <Image
            placeholder="blur"
            blurDataURL={altImages[2].image.metadata.lqip}
            alt={altImages[2].alt?.[locale]}
            src={altImages[2].image.url}
            fill
            className="object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
}
