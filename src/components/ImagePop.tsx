import { cn } from "@/lib/utils";
import Image from "next/image";
import Typography from "./Typography";
import { Button } from "./ui/button";
import { AspectRatio } from "./ui/aspect-ratio";
import { colorSanityType, getColor } from "@/sanity/lib/interface";
import Link from "next/link";

export interface ImagePopProps extends React.HTMLAttributes<HTMLInputElement> {
  imgRight?: boolean;
  locale: "en" | "fr";
  imagePop: {
    altImage: {
      alt: { en: string; fr: string };
      image: {
        url: string;
        metadata: {
          lqip: string;
        };
      };
    };
    title: { en: string; fr: string };
    description: { en: string; fr: string };
    button: { ext: boolean; text: { en: string; fr: string }; url: string };
    color: colorSanityType;
  };
}

export default function ImagePop({ children, locale, imgRight, imagePop: { altImage, color, title, description, button }, className, ...props }: ImagePopProps) {
  return (
    // 32 if colored square behind has border of 16
    <div className={cn("flex w-full gap-32 mb-48", imgRight && "flex-row-reverse", className)} {...props}>
      <div className={`flex-1 relative w-1/2 `}>
        <AspectRatio ratio={1} className="after:block after:w-full after:h-full after:shadow-lg after:absolute after:top-0">
          <div className={`block w-full h-full ${getColor(color)} relative top-16 ${imgRight ? "-left-16 " : "-right-16"}`}></div>
          <Image
            src={altImage.image.url}
            placeholder="blur"
            blurDataURL={altImage.image.metadata.lqip}
            fill
            sizes="50vw"
            alt={altImage.alt?.[locale]}
            className="object-cover object-center"></Image>
        </AspectRatio>
      </div>
      <div className={`flex-1 flex flex-col justify-center gap-6 ${imgRight ? "text-right items-end" : ""}`}>
        <Typography variant={"h2"} className="text-balance">
          {title?.[locale]}
        </Typography>
        <Typography variant={"p"} className=" text-balance">
          {description?.[locale]}
        </Typography>
        <Button asChild className="w-fit">
          <Link href={button.url}>{button.text?.[locale]}</Link>
        </Button>
      </div>
    </div>
  );
}
