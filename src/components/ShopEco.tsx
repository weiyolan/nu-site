// "use client";
import { cn } from "@/lib/utils";
import Typography from "./Typography";
import NuLine from "./NuLine";
import LucideIcon from "./LucideIcon";
import { ChevronRight, Sprout } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import ConditionalLink from "./ConditionalLink";
import { localeType } from "@/sanity/lib/interface";
// import { useRouter } from "next/router";

export interface ShopEcoProps extends React.HTMLAttributes<HTMLDivElement> {
  locale: localeType;
  eco: {
    description: { en: string; fr: string };
    title: { en: string; fr: string };
    cards: {
      title: { en: string; fr: string };
      description: { en: string; fr: string };
      text: { en: string; fr: string };
      icon: { name: string };
    }[];
  };
}

export interface EcoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  text: string;
  locale: localeType;
  name: string;
}

export default function ShopEco({ eco, locale, children, className, ...props }: ShopEcoProps) {
  // const { locale } = useRouter();

  return (
    <div className={cn("text-center py-16 px-0 lg:p-16 lg:w-[120%] lg:-ml-[10%] bg-nu-blue", className)} {...props}>
      <Typography variant={"h2"}>{eco.title?.[locale || "fr"]}</Typography>
      <Typography variant={"p"} affects={"subTitle"} className="text-nu-black max-w-prose mx-auto">
        {eco.description?.[locale || "fr"]}
      </Typography>
      <NuLine className="mt-8 w-full px-8 mx-auto" />
      <div className="grid grid-cols-2 lg:grid-cols-4 grid-flow-row mt-8 gap-2 sm:gap-3 md:gap-4">
        {eco.cards.map((card, i) => (
          <EcoCard
            locale={locale}
            title={card.title?.[locale || "fr"]}
            text={card.text?.[locale || "fr"]}
            description={card.description?.[locale || "fr"]}
            name={card.icon.name}
            key={i}
          />
        ))}
      </div>
    </div>
  );
}

export function EcoCard({ title, locale, description, text, name, className, ...props }: EcoCardProps) {
  return (
    <div className="flex flex-col items-center group gap-4 p-2">
      <LucideIcon className="size-6" name={name} />
      <Typography variant={"h3"}>{title}</Typography>
      <Typography variant={"p"}>{description}</Typography>
      <Typography variant={"p"} className="text-sm text-justify">
        {text}
      </Typography>
      <Button variant="link" size="sm" asChild className=" relative items-center  -ml-2 group/button text-base mr-auto">
        <ConditionalLink className="">
          {locale === "fr" ? "Lire toute l'article " : "Read the whole article"}
          <ChevronRight className="size-4 group-hover/button:translate-x-1 transition-transform duration-200 mt-1" />
        </ConditionalLink>
      </Button>
    </div>
  );
}
