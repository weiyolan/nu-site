import { cn } from "@/lib/utils";
import Typography from "./Typography";
import { desc } from "drizzle-orm";
import Image from "next/image";
import { altImageType, localeStringType, localeType } from "@/sanity/lib/interface";

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

const styles: string[] = ["mt-48", "mt-24", "mt-36", "-mt-6"];
export default function AboutValues({ locale, valueInfo: { title, description, prefix, values }, className, ...props }: AboutValuesProps) {
  return (
    <div className={cn("w-full ", className)} {...props}>
      <Typography variant="h2">{title?.[locale]}</Typography>
      <Typography variant={"p"} affects={"subTitle"} className="max-w-prose">
        {description?.[locale]}
      </Typography>
      <div className="grid grid-cols-4 gap-6 w-full -mt-10">
        {values.map((value, index) => (
          <Value key={index} value={{ ...value, prefix: prefix }} locale={locale} className={styles[index]} />
        ))}
      </div>
    </div>
  );
}

export function Value({ value: { title, description, altImage, prefix }, locale, className, ...props }: ValueProps) {
  return (
    <div className={cn("text-center space-y-8 p-2 ", className)}>
      <Typography variant={"p"} affects={"muted"}>
        {prefix?.[locale]}
      </Typography>
      <Typography variant={"h3"}>{title?.[locale]}</Typography>
      <Typography variant={"p"} className="leading-6">
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
