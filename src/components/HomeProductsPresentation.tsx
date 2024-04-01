import Image from "next/image";
import Section from "./Section";
import Typography from "./Typography";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { altImageType, localeStringType } from "@/sanity/lib/interface";

type presentationType = {
  title: localeStringType;
  description: localeStringType;
  button: localeStringType;
  slug: { current: string };
  altImage: altImageType;
};

export interface ProductsPresentationProps extends React.HTMLAttributes<HTMLDivElement> {
  locale: "en" | "fr";
  sanityData: {
    title: localeStringType;
    description: localeStringType;
    topLeft: presentationType;
    topRight: presentationType;
    bottomLeft: presentationType;
    bottomRight: presentationType;
  };
}
export interface PresentationProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface PresentationDetailsProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  button: string;
  slug: { current: string };
}

export default function ProductsPresentation({ sanityData: { title, description, topLeft, topRight, bottomLeft, bottomRight }, locale, className }: ProductsPresentationProps) {
  return (
    <>
      <Typography variant="h2" className="text-center max-w-3xl mx-auto text-balance">
        {title?.[locale]}
      </Typography>
      <Typography variant="p" affects={"subTitle"} className=" font-semibold text-center max-w-prose mx-auto text-balance ">
        {description?.[locale]}
      </Typography>
      <div className="relative w-full max-w-xl mx-auto mt-12 h-[500px] drop-shadow-xl">
        <Presentation className="group/topLeft left-0 -translate-x-1/2">
          <PresentationDetails
            className="text-nowrap z-10"
            title={topLeft.title?.[locale]}
            slug={topLeft.slug}
            button={topLeft.button?.[locale]}
            description={topLeft.description?.[locale]}
          />
          <Image
            className="object-cover  group-hover/topLeft:-translate-x-2 group-hover/topLeft:-translate-y-2 hover:-translate-x-2 hover:-translate-y-2 transition-transform ease-out duration-500"
            alt={topLeft.altImage.alt?.[locale]}
            src={topLeft.altImage.image.url}
            placeholder="blur"
            blurDataURL={topLeft.altImage.image.metadata.lqip}
            width={270}
            height={750}
          />
        </Presentation>

        <Presentation className="group/topRight right-0 translate-x-1/2 items-start">
          <Image
            className="object-cover   group-hover/topRight:translate-x-2 group-hover/topRight:-translate-y-2 hover:translate-x-2 hover:-translate-y-2 transition-transform ease-out duration-500"
            alt={topRight.altImage.alt?.[locale]}
            src={topRight.altImage.image.url}
            placeholder="blur"
            blurDataURL={topRight.altImage.image.metadata.lqip}
            width={270}
            height={750}
          />
          <PresentationDetails
            className=" "
            title={topRight.title?.[locale]}
            slug={topRight.slug}
            button={topRight.button?.[locale]}
            description={topRight.description?.[locale]}
          />
        </Presentation>

        <Presentation className="group/bottomLeft bottom-0 left-0 -translate-x-1/2 items-end">
          <PresentationDetails
            className="  "
            title={bottomLeft.title?.[locale]}
            slug={bottomLeft.slug}
            button={bottomLeft.button?.[locale]}
            description={bottomLeft.description?.[locale]}
          />
          <Image
            className="object-cover  group-hover/bottomLeft:-translate-x-2 group-hover/bottomLeft:translate-y-2 hover:-translate-x-2 hover:translate-y-2 transition-transform ease-out duration-500"
            alt={bottomLeft.altImage.alt?.[locale]}
            src={bottomLeft.altImage.image.url}
            placeholder="blur"
            blurDataURL={bottomLeft.altImage.image.metadata.lqip}
            width={350}
            height={600}
          />
        </Presentation>
        <Presentation className="group/bottomRight bottom-0 right-0 translate-x-[55%] items-end">
          <Image
            className=" object-cover  group-hover/bottomRight:translate-x-2 group-hover/bottomRight:translate-y-2 hover:translate-x-2 hover:translate-y-2 transition-transform ease-out duration-500 "
            alt={bottomRight.altImage.alt?.[locale]}
            src={bottomRight.altImage.image.url}
            placeholder="blur"
            blurDataURL={bottomRight.altImage.image.metadata.lqip}
            width={200}
            height={750}
          />
          <PresentationDetails
            className="  "
            title={bottomRight.title?.[locale]}
            slug={bottomRight.slug}
            button={bottomRight.button?.[locale]}
            description={bottomRight.description?.[locale]}
          />
        </Presentation>
      </div>
    </>
  );
}

export function PresentationDetails({ title, description, button, slug, className }: PresentationDetailsProps) {
  return (
    <div className={cn("text-center space-y-4 text-balance relative min-w-72", className)}>
      <Typography variant={"h3"}>{title}</Typography>
      <Typography variant={"p"} className="text-sm text-balance mx-auto">
        {description}
      </Typography>
      <Button asChild className="mx-auto">
        <Link href={slug.current}>{button}</Link>
      </Button>
    </div>
  );
}

export function Presentation({ children, className }: PresentationProps) {
  return <div className={cn("absolute flex gap-8", className)}>{children}</div>;
}
