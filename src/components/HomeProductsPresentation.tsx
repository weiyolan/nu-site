import Image from "next/image";
import Typography from "./Typography";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { altImageType, localeStringType } from "@/sanity/lib/interface";
import { AspectRatio } from "./ui/aspect-ratio";

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
    <div className="">
      <Typography variant="h2" className="text-center max-w-3xl mx-auto text-balance">
        {title?.[locale]}
      </Typography>
      <Typography variant="p" affects={"subTitle"} className=" font-semibold text-center max-w-prose mx-auto text-balance ">
        {description?.[locale]}
      </Typography>
      <div className="relative  w-full max-w-xl mx-auto mt-12  drop-shadow-xl">
        <AspectRatio ratio={1} className="relative mx-auto ">
          <Presentation className="group/topLeft w-[50%] xl:w-full left-0 xl:-translate-x-1/2 xl:flex">
            <PresentationDetails
              className="text-nowrap z-10 absolute xl:block invisible lg:visible xl:relative xl:w-1/2 group-focus/topLeft:visible"
              title={topLeft.title?.[locale]}
              slug={topLeft.slug}
              button={topLeft.button?.[locale]}
              description={topLeft.description?.[locale]}
            />
            <Image
              className="cursor-pointer w-full xl:w-[270px] h-auto group-hover/topLeft:-translate-x-2 group-hover/topLeft:-translate-y-2 hover:-translate-x-2 hover:-translate-y-2 transition-transform ease-out duration-500"
              alt={topLeft.altImage.alt?.[locale]}
              src={topLeft.altImage.image.url}
              placeholder="empty"
              blurDataURL={topLeft.altImage.image.metadata.lqip}
              width={270}
              height={750}
            />
          </Presentation>

          <Presentation className="group/topRight w-[50%] xl:w-full right-0 xl:translate-x-1/2 ">
            <Image
              className="cursor-pointer w-full xl:w-[270px] h-auto  group-hover/topRight:translate-x-2 group-hover/topRight:-translate-y-2 hover:translate-x-2 hover:-translate-y-2 transition-transform ease-out duration-500"
              alt={topRight.altImage.alt?.[locale]}
              src={topRight.altImage.image.url}
              placeholder="empty"
              blurDataURL={topRight.altImage.image.metadata.lqip}
              width={270}
              height={750}
            />
            <PresentationDetails
              className=" absolute invisible lg:visible xl:relative xl:w-1/2 group-focus/topRight:visible xl:block "
              title={topRight.title?.[locale]}
              slug={topRight.slug}
              button={topRight.button?.[locale]}
              description={topRight.description?.[locale]}
            />
          </Presentation>

          <Presentation className="w-[65%] xl:w-full group/bottomLeft bottom-0 left-0 xl:-translate-x-1/2 items-end">
            <PresentationDetails
              className=" absolute invisible lg:visible xl:relative xl:w-1/2 group-focus/bottomLeft:visible xl:block  "
              title={bottomLeft.title?.[locale]}
              slug={bottomLeft.slug}
              button={bottomLeft.button?.[locale]}
              description={bottomLeft.description?.[locale]}
            />
            <Image
              className="cursor-pointer w-full xl:w-[350px] h-auto group-hover/bottomLeft:-translate-x-2 group-hover/bottomLeft:translate-y-2 hover:-translate-x-2 hover:translate-y-2 transition-transform ease-out duration-500"
              alt={bottomLeft.altImage.alt?.[locale]}
              src={bottomLeft.altImage.image.url}
              placeholder="blur"
              blurDataURL={bottomLeft.altImage.image.metadata.lqip}
              width={350}
              height={600}
            />
          </Presentation>
          <Presentation className="w-[45%] xl:w-full group/bottomRight bottom-4 right-0 xl:translate-x-[55%] items-end">
            <Image
              className="cursor-pointer w-full xl:w-1/2 h-auto group-hover/bottomRight:translate-x-2 group-hover/bottomRight:translate-y-2 hover:translate-x-2 hover:translate-y-2 transition-transform ease-out duration-500 "
              alt={bottomRight.altImage.alt?.[locale]}
              src={bottomRight.altImage.image.url}
              placeholder="blur"
              blurDataURL={bottomRight.altImage.image.metadata.lqip}
              width={200}
              height={750}
            />
            <PresentationDetails
              className=" absolute  invisible lg:visible xl:relative xl:w-1/2  group-focus/bottomRight:visible xl:block  "
              title={bottomRight.title?.[locale]}
              slug={bottomRight.slug}
              button={bottomRight.button?.[locale]}
              description={bottomRight.description?.[locale]}
            />
          </Presentation>
        </AspectRatio>
      </div>
    </div>
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
