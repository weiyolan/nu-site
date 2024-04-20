import { cn } from "@/lib/utils";
import Typography from "./Typography";
import Section from "./Section";
import { Button } from "./ui/button";
import { altImageType, buttonType, localeStringType, localeType } from "@/sanity/lib/interface";
import { desc } from "drizzle-orm";
import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";

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
    <div className={cn("w-full", className)} {...props}>
      <div className="bg-nu-blue w-full overflow-hidden">
        <Section className="mt-0 lg:px-16 xl:px-16 2xl:px-16">
          <span className="text-[9rem] sm:text-[15rem] leading-[0.87] font-corben text-nu-beige block pt-8 sm:-mt-24">Bref.</span>
        </Section>
      </div>

      <Section className={cn("flex flex-col lg:flex-row w-full gap-24 lg:gap-16 xl:gap-32 text-right mt-8 md:mt-8 pb-16 ", className)} {...props}>
        <div className={`flex-1 flex flex-col justify-center gap-6 `}>
          <Typography variant={"h2"} className="">
            {title?.[locale]}
          </Typography>
          <Typography variant={"p"} className="whitespace-pre-wrap">
            {description?.[locale]}
          </Typography>
          <Button className="w-fit ml-auto">{button.text?.[locale]}</Button>
        </div>
        <div className={`lg:flex-1 w-full md:w-4/5 md:mr-auto lg:w-1/2 relative h-40 min-[420px]:h-60  lg:h-80 2xl:mb-24`}>
          <div className="w-2/3 lg:w-[70%] md:w-80 absolute bg-nu-green top-0 left-0 mb-[10%] translate-y-16 lg:-translate-y-24 lg:right-0 lg:left-auto ">
            <AspectRatio ratio={1}>
              <Image
                alt={altImages[1].alt?.[locale]}
                src={altImages[1].image.url}
                className="object-cover"
                placeholder="blur"
                blurDataURL={altImages[1].image.metadata.lqip}
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
              />
            </AspectRatio>
          </div>
          <div className="w-2/3 lg:w-[70%] md:w-80 absolute bg-nu-purple top-0 right-0 -translate-y-16 lg:left-0 lg:right-auto lg:translate-y-24 shadow-lg">
            <AspectRatio ratio={1}>
              <Image
                alt={altImages[0].alt?.[locale]}
                src={altImages[0].image.url}
                className="object-cover"
                placeholder="blur"
                blurDataURL={altImages[0].image.metadata.lqip}
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
              />
            </AspectRatio>
          </div>
          {/* <Image src={img.src} fill sizes="50vw" alt={img.alt} className="object-cover object-center"></Image> */}
        </div>
      </Section>
    </div>
  );
}
