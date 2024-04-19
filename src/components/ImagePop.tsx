import { cn } from "@/lib/utils";
import Image from "next/image";
import Typography from "./Typography";
import { Button } from "./ui/button";
import { AspectRatio } from "./ui/aspect-ratio";
import { altImageType, buttonType, colorSanityType, getColor, localeBlockContentType, localeStringType } from "@/sanity/lib/interface";
import Link from "next/link";
import PortableText from "./PortableText";

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
      className={cn(
        "flex flex-col md:flex-row w-full gap-12 md:gap-24 lg:gap-32 xl:gap-48 mt-24 md:mt-0 md:mb-48",
        imgRight && "mb-24 flex-col-reverse md:flex-row-reverse",
        className
      )}
      {...props}>
      <div className={`flex-1 relative w-4/5 md:w-1/2 `}>
        <AspectRatio ratio={1} className="after:block after:w-full after:h-full after:shadow-lg after:absolute after:top-0">
          <div
            className={`block w-full h-full ${getColor(color)} relative  ${imgRight ? "top-12 md:top-12 lg:top-16 -right-12 md:-left-12 lg:-left-16" : "-top-12 md:top-12 lg:top-16 -right-12 md:-right-12 lg:-right-12"}`}></div>
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
          <Link href={button.url}>{button.text?.[locale]}</Link>
        </Button>
      </div>
    </div>
  );
}
