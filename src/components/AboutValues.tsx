"use client";
import { cn } from "@/lib/utils";
import Typography from "./Typography";
import Image from "next/image";
import { altImageType, localeStringType, localeType } from "@/sanity/lib/interface";
import { useMediaQuery } from "usehooks-ts";
import NuLogo from "./NuLogo";

export interface AboutValuesProps extends React.HTMLAttributes<HTMLDivElement> {
  locale: localeType;
  valueInfo: {
    title: localeStringType;
    description: localeStringType;
    prefix: localeStringType;
    values: {
      description: localeStringType;
      title: localeStringType;
      altImage: altImageType;
    }[];
  };
}
export interface ValueProps extends React.HTMLAttributes<HTMLDivElement> {
  value: {
    description: localeStringType;
    title: localeStringType;
    altImage: altImageType;
    prefix: localeStringType;
  };
  locale: localeType;
}

export default function AboutValues({ locale, valueInfo: { title, description, prefix, values }, className, ...props }: AboutValuesProps) {
  // const mdScreen = useMediaQuery("(min-width: 1024px)");

  const styles: string[] = ["mt-20 lg:mt-48", "mt-4 lg:mt-24", "mt-20 lg:mt-36", "-mt-6 lg:-mt-6"];
  return (
    <div className={cn("w-full", className)} {...props}>
      <Typography variant="h2">{title?.[locale]}</Typography>
      <Typography variant={"p"} affects={"subTitle"} className="max-w-prose">
        {description?.[locale]}
      </Typography>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-2 w-full lg:-mt-10">
        {values.map((value, index) => (
          <Value key={index} value={{ ...value, prefix: prefix }} locale={locale} className={styles[index]} />
        ))}
      </div>
    </div>
  );
}

export function Value({ value: { title, description, altImage, prefix }, locale, className, ...props }: ValueProps) {
  return (
    <div className={cn("text-center space-y-8 lg:p-2 ", className)}>
      <Typography variant={"p"} affects={"muted"} role="decoration">
        {/* <span className=""> */}
        <NuLogo className="w-5 mx-auto fill-nu-black/40" />
        {/* </span> */}
        {prefix?.[locale]}
      </Typography>
      <Typography variant={"h3"} className="hyphens-auto">
        {title?.[locale]}
      </Typography>
      <Typography variant={"p"} className="leading-6 text-justify hyphens-auto  md:text-center md:hyphens-manual  text-sm md:text-base text-balance">
        {description?.[locale]}
      </Typography>
      <Image
        src={altImage.image.url}
        placeholder="blur"
        blurDataURL={altImage.image.metadata.lqip}
        alt={altImage.alt?.[locale]}
        width="200"
        height="200"
        className="w-full aspect-square"></Image>
    </div>
  );
}
