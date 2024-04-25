import { cn } from "@/lib/utils";
import Image from "next/image";
import Typography from "./Typography";
import { Button } from "./ui/button";
import { AspectRatio } from "./ui/aspect-ratio";
import { altImageType, buttonType, colorSanityType, getColor, localeBlockContentType, localeStringType } from "@/sanity/lib/interface";
import Link from "next/link";
import PortableText from "./PortableText";
import ConditionalLink from "./ConditionalLink";

export interface ImagePopProps extends React.HTMLAttributes<HTMLDivElement> {
  imgRight?: boolean;
  locale: "en" | "fr";
  imagePop: {
    altImage: altImageType;
    title: localeStringType;
    description: localeBlockContentType;
    button: buttonType;
    color: colorSanityType;
  };
}

export default function ImagePop({ children, locale, imgRight, imagePop: { altImage, color, title, description, button }, className, ...props }: ImagePopProps) {
  return (
    // 32 if colored square behind has border of 16
    <div
      className={cn("flex flex-col lg:flex-row w-full gap-12 lg:gap-24 xl:gap-32 2xl:gap-48 xl:mb-44", imgRight && " flex-col-reverse lg:flex-row-reverse", className)}
      {...props}>
      <div className={`flex-1 relative w-[90%] sm:w-4/5 lg:w-1/2   ${imgRight ? "ml-auto mb-24 " : "mt-16 lg:mt-0"}`}>
        <AspectRatio ratio={1} className="after:block after:w-full after:h-full after:shadow-lg after:absolute after:top-0">
          <div
            className={`block w-full h-full ${getColor(color)} relative  ${imgRight ? "  top-8 md:top-12 xl:top-16 -left-8 md:-left-12 xl:-left-16" : " -top-8 md:-top-12 lg:top-12 xl:top-16 -right-8 md:-right-12 xl:-right-16"}`}></div>
          <Image
            src={altImage.image.url}
            placeholder="blur"
            blurDataURL={altImage.image.metadata.lqip}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            alt={altImage.alt?.[locale]}
            className="object-cover object-center"></Image>
        </AspectRatio>
      </div>
      <div className={`flex-1 flex flex-col justify-center gap-6 ${imgRight ? "text-right items-end" : ""}`}>
        <Typography variant={"h2"} className="text-balance">
          {title?.[locale]}
        </Typography>
        <div>
          <PortableText value={description?.[locale]} locale={locale}></PortableText>
        </div>
        <Button asChild className="w-fit">
          <ConditionalLink href={button.url}>{button.text?.[locale]}</ConditionalLink>
        </Button>
      </div>
    </div>
  );
}
