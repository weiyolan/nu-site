import { cn } from "@/lib/utils";
import Image from "next/image";
import Typography from "./Typography";
import { Button } from "./ui/button";
import Link from "next/link";
import { altImageType, buttonType, localeStringType, localeType } from "@/sanity/lib/interface";
// import { PropsWithChildren } from "react";
export interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  locale: localeType;
  hero: {
    title: localeStringType;
    button: buttonType;
    altImage: altImageType;
  };
  increasedContrast?: boolean;
}

export default function Hero({ locale, hero: { title, button, altImage }, increasedContrast, children, className, ...props }: HeroProps) {
  return (
    <div className={cn("w-full h-screen relative overflow-x-hidden ", className)} {...props}>
      <Image
        priority
        src={altImage.image.url}
        blurDataURL={altImage.image.metadata.lqip}
        placeholder="blur"
        fill
        sizes="100vw"
        alt={altImage.alt?.[locale]}
        className="object-cover object-center "></Image>
      <div className="absolute top-2/3 md:top-1/2 ml-6 sm:ml-12 md:ml-24 ">
        {increasedContrast && <div className="rounded-full w-64 h-64 absolute blur-3xl bg-white/50 -right-12 top-0"></div>}
        <Typography variant="h1" className="relative text-balance text-4xl leading-normal max-w-[25ch]">
          {title?.[locale]}
        </Typography>
        <Button asChild className="relative">
          <Link href={button.url}>{button.text?.[locale]}</Link>
        </Button>
      </div>
      {children}
    </div>
  );
}
