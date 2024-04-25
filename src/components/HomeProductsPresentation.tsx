import Image from "next/image";
import Typography from "./Typography";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { altImageType, localeStringType } from "@/sanity/lib/interface";
import { AspectRatio } from "./ui/aspect-ratio";
import ConditionalLink from "./ConditionalLink";

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
      <div className="relative w-full sm:px-12 lg:mb-28 lg:px-0 lg:w-1/2 lg:h-[500px]  mx-auto mt-12  lg:aspect-square ">
        {/* <AspectRatio ratio={1} className="relative mx-auto "> */}
        <Presentation className="group/topLeft items-center flex-col-reverse sm:flex-row-reverse  left-0 lg:-translate-x-1/2  lg:items-end mr-auto mt-0     ">
          <PresentationDetails
            className="text-nowrap text-left mr-auto group-focus/topLeft:visible sm:text-center xl:-translate-y-16 2xl:-translate-y-16 "
            title={topLeft.title?.[locale]}
            slug={topLeft.slug}
            button={topLeft.button?.[locale]}
            // description={
            //   "Découvre le Shampoing Solide Nyx, spécialement conçu pour les cheveux à tendance grasse. Cette formule associe la levure de bière, l'huile d'olive de Provence, l'argile blanche du bassin méditerrannéen et la poudre d'ortie bio. Ensemble, ces"
            // }
            description={topLeft.description?.[locale]}
          />
          <Image
            className="cursor-pointer w-1/2  sm:w-[40%] mr-auto lg:mx-0 lg:ml-auto lg:w-[45%] 2xl:w-[270px] drop-shadow-xl h-auto lg:-mb-6 group-hover/topLeft:-translate-x-2 group-hover/topLeft:-translate-y-2 hover:-translate-x-2 hover:-translate-y-2 transition-transform ease-out duration-500"
            alt={topLeft.altImage.alt?.[locale]}
            src={topLeft.altImage.image.url}
            placeholder="empty"
            blurDataURL={topLeft.altImage.image.metadata.lqip}
            width={270}
            height={750}
          />
        </Presentation>

        <Presentation className="group/topRight min-[300px]:-mt-12  ml-auto   lg:translate-x-1/2 lg:items-end flex-col sm:flex-row-reverse   justify-end items-center right-0 ">
          <Image
            className="cursor-pointer w-1/2  sm:w-[40%]  ml-auto lg:mx-0 lg:mr-auto lg:w-[45%] 2xl:w-[270px] h-auto drop-shadow-xl lg:-mb-6 group-hover/topRight:translate-x-2 group-hover/topRight:-translate-y-2 hover:translate-x-2 hover:-translate-y-2 transition-transform ease-out duration-500"
            alt={topRight.altImage.alt?.[locale]}
            src={topRight.altImage.image.url}
            placeholder="empty"
            blurDataURL={topRight.altImage.image.metadata.lqip}
            width={270}
            height={750}
          />
          <PresentationDetails
            className=" group-focus/topRight:visible text-right sm:text-center xl:-translate-y-16 2xl:-translate-y-16 "
            title={topRight.title?.[locale]}
            slug={topRight.slug}
            button={topRight.button?.[locale]}
            // description={
            //   "Découvre le Shampoing Solide Nyx, spécialement conçu pour les cheveux à tendance grasse. Cette formule associe la levure de bière, l'huile d'olive de Provence, l'argile blanche du bassin méditerrannéen et la poudre d'ortie bio. Ensemble, ces"
            // }
            description={topRight.description?.[locale]}
          />
        </Presentation>

        <Presentation className="lg:-mt-8  mr-auto group/bottomLeft sm:flex-row-reverse  flex-col-reverse  left-0 lg:translate-y-1/2 lg:-translate-x-1/2 items-center lg:items-start bottom-0">
          <PresentationDetails
            className="  text-left mr-auto  sm:text-center group-focus/bottomLeft:visible lg:translate-y-12  "
            title={bottomLeft.title?.[locale]}
            slug={bottomLeft.slug}
            button={bottomLeft.button?.[locale]}
            // description={
            //   "Découvre le Shampoing Solide Nyx, spécialement conçu pour les cheveux à tendance grasse. Cette formule associe la levure de bière, l'huile d'olive de Provence, l'argile blanche du bassin méditerrannéen et la poudre d'ortie bio. Ensemble, ces"
            // }
            description={bottomLeft.description?.[locale]}
          />
          <Image
            className=" mr-auto lg:mx-0 lg:-mr-14 cursor-pointer w-3/4 sm:w-[45%] lg:w-[55%] xl:w-[50%] drop-shadow-xl lg:-mt-10  h-auto group-hover/bottomLeft:-translate-x-2 group-hover/bottomLeft:translate-y-2 hover:-translate-x-2 hover:translate-y-2 transition-transform ease-out duration-500"
            alt={bottomLeft.altImage.alt?.[locale]}
            src={bottomLeft.altImage.image.url}
            placeholder="empty"
            blurDataURL={bottomLeft.altImage.image.metadata.lqip}
            width={350}
            height={600}
          />
        </Presentation>
        <Presentation className=" sm:mt-16  flex-col sm:flex-row-reverse justify-end  group/bottomRight right-0 ml-auto lg:translate-y-1/2 lg:translate-x-1/2   items-start lg:items-center bottom-0">
          <Image
            className=" ml-auto sm:mt-16 xl:mt-18  cursor-pointer w-3/5 sm:w-[40%] xl:w-[35%] lg:mx-0 lg:w-2/5 lg:mr-auto lg:ml-8  lg:mt-0 h-auto drop-shadow-xl  group-hover/bottomRight:translate-x-2 group-hover/bottomRight:translate-y-2 hover:translate-x-2 hover:translate-y-2 transition-transform ease-out duration-500 "
            alt={bottomRight.altImage.alt?.[locale]}
            src={bottomRight.altImage.image.url}
            placeholder="empty"
            blurDataURL={bottomRight.altImage.image.metadata.lqip}
            width={200}
            height={750}
          />
          <PresentationDetails
            className="  ml-auto lg:ml-0 text-right sm:text-center group-focus/bottomRight:visible lg:translate-y-12 "
            title={bottomRight.title?.[locale]}
            slug={bottomRight.slug}
            button={bottomRight.button?.[locale]}
            // description={
            //   "Découvre le Shampoing Solide Nyx, spécialement conçu pour les cheveux à tendance grasse. Cette formule associe la levure de bière, l'huile d'olive de Provence, l'argile blanche du bassin méditerrannéen et la poudre d'ortie bio. Ensemble, ces"
            // }
            description={bottomRight.description?.[locale]}
          />
        </Presentation>
        {/* </AspectRatio> */}
      </div>
    </div>
  );
}

export function PresentationDetails({ title, description, button, slug, className }: PresentationDetailsProps) {
  return (
    <div className={cn("text-center w-full lg:w-64 min-[1200px]:w-72 xl:w-96 lg:flex-shrink-0 space-y-4 text-balance relative  ", className)}>
      <Typography variant={"h3"} className="whitespace-pre-wrap text-balance">
        {title}
      </Typography>
      <Typography variant={"p"} className="sm:text-base xl:leading-7 text-balance mx-auto">
        {description}
      </Typography>
      <Button asChild className="mx-auto">
        <ConditionalLink href={slug.current}>{button}</ConditionalLink>
      </Button>
    </div>
  );
}

export function Presentation({ children, className }: PresentationProps) {
  return <div className={cn("lg:absolute w-full sm:mt-6   flex lg:flex-row lg:flex lg:w-full gap-4 sm:gap-8 md:gap-16 lg:gap-0 ", className)}>{children}</div>;
}
