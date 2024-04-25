import { cn } from "@/lib/utils";
import Image from "next/image";
import Typography from "./Typography";
import { Button } from "./ui/button";
import Link from "next/link";
import { altImageType, buttonType, colorSanityType, getColor, localeStringType, localeType } from "@/sanity/lib/interface";
import ConditionalLink from "./ConditionalLink";
// import { PropsWithChildren } from "react";
export interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  locale: localeType;
  hero: {
    title: localeStringType;
    button: buttonType;
    altImage: altImageType;
    color: colorSanityType;
  };
  increasedContrast?: boolean;
}

export default function Hero({ locale, hero: { title, button, altImage, color }, increasedContrast, children, className, ...props }: HeroProps) {
  return (
    <div className={cn("w-full h-screen relative overflow-hidden ", className)} {...props}>
      <Image
        priority
        src={altImage.image.url}
        blurDataURL={altImage.image.metadata.lqip}
        placeholder="blur"
        fill
        sizes="100vw"
        alt={altImage.alt?.[locale]}
        className="object-cover object-center select-none "></Image>
      <div className="absolute top-2/3 md:top-auto md:bottom-12 ml-6 sm:ml-12 md:ml-24 -translate-y-1/2">
        <div className={`w-[200vw] h-52 ${getColor(color)} lg:hidden absolute rotate-12 -translate-x-48 translate-y-[15vw] `}></div>
        {/* {increasedContrast && <div className="rounded-full w-64 h-64 absolute blur-3xl bg-white/50 -right-12 top-0"></div>} */}
        <Typography variant="h1" className="relative text-balance text-4xl md:text-4xl leading-normal max-w-[25ch]">
          {title?.[locale]}
        </Typography>
        <Button asChild className="relative">
          <ConditionalLink href={button.url}>{button.text?.[locale]}</ConditionalLink>
        </Button>
      </div>
      {children}
    </div>
  );
}
