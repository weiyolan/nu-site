import { cn } from "@/lib/utils";
import Typography from "./Typography";
import Section from "./Section";
import { Button } from "./ui/button";
import { altImageType, buttonType, localeStringType, localeType } from "@/sanity/lib/interface";
import { desc } from "drizzle-orm";
import Image from "next/image";

export interface AboutBrefProps extends React.HTMLAttributes<HTMLDivElement> {
  locale: localeType;
  brefInfo: {
    title: localeStringType;
    description: localeStringType;
    button: buttonType;
    altImages: altImageType[];
  };
}

export default function AboutBref({ locale, brefInfo: { title, description, altImages, button }, children, className, ...props }: AboutBrefProps) {
  return (
    <div className={cn("w-full ", className)} {...props}>
      <div className="bg-nu-blue w-[120%] -ml-[10%] overflow-hidden  ">
        <Section className="mt-0">
          <span className="text-[15rem] leading-[0.88] font-corben text-nu-beige block mt-4 ">Bref.</span>
        </Section>
      </div>

      <div className={cn("flex w-full gap-32 text-right mt-8 pb-16", className)} {...props}>
        <div className={`flex-1 flex flex-col justify-center gap-6 `}>
          <Typography variant={"h2"} className="">
            {title?.[locale]}
          </Typography>
          <Typography variant={"p"} className="whitespace-pre-wrap">
            {description?.[locale]}
          </Typography>
          <Button className="w-fit ml-auto">{button.text?.[locale]}</Button>
        </div>
        <div className={`flex-1 w-1/2 relative h-80`}>
          <div className="w-80 h-80 absolute bg-nu-green top-0 -translate-y-24 right-0">
            <Image
              alt={altImages[1].alt?.[locale]}
              src={altImages[1].image.url}
              className="object-cover"
              placeholder="blur"
              blurDataURL={altImages[1].image.metadata.lqip}
              fill
              sizes="18vw"
            />
          </div>
          <div className="w-80 h-80 absolute bg-nu-purple bottom-0 translate-y-24 shadow-lg">
            <Image
              alt={altImages[0].alt?.[locale]}
              src={altImages[0].image.url}
              className="object-cover"
              placeholder="blur"
              blurDataURL={altImages[0].image.metadata.lqip}
              fill
              sizes="18vw"
            />
          </div>
          {/* <Image src={img.src} fill sizes="50vw" alt={img.alt} className="object-cover object-center"></Image> */}
        </div>
      </div>
    </div>
  );
}
