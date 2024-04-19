import { cn } from "@/lib/utils";
import Typography from "./Typography";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { localeBlockContentType, localeStringType, localeType } from "@/sanity/lib/interface";
import PortableText from "./PortableText";

export interface AboutIngredientsProps extends React.HTMLAttributes<HTMLDivElement> {
  locale: localeType;
  ingredientInfo: {
    title: localeStringType;
    description: localeStringType;
    majorTitle: localeStringType;
    minorTitle: localeStringType;
  };
  ingredients: {
    major: { title: localeStringType; description: localeBlockContentType }[];
    minor: { title: localeStringType; description: localeBlockContentType }[];
  };
}
export interface PercentageProps extends React.HTMLAttributes<HTMLDivElement> {
  p: string;
}

export default function AboutIngredients({
  locale,
  ingredients,
  ingredientInfo: { title, description, majorTitle, minorTitle },
  children,
  className,
  ...props
}: AboutIngredientsProps) {
  return (
    <div className={cn("text-center ", className)} {...props}>
      <Typography variant={"h2"}>{title?.[locale]}</Typography>
      <Typography variant={"p"} affects={"subTitle"} className="max-w-prose mx-auto">
        {description?.[locale]}
      </Typography>

      <div className="text-left mx-auto lg:w-4/5 max-w-4xl 2xl:max-w-5xl mt-12 flex flex-col md:flex-row w-full items-center gap-2 md:gap-6  lg:gap-10">
        <Percentage p={majorTitle?.[locale]} />
        <Accordion type="single" collapsible className="flex-1 w-full pl-2 md:pl-6 lg:pl-10 border-l-nu-black border-l-[1px] md:border-l-2 whitespace-pre-wrap">
          {ingredients.major.map((ingr, i) => (
            <AccordionItem key={`item-${i}`} value={`item-${i}`} className="border-nu-black/30">
              <AccordionTrigger>{ingr.title?.[locale]}</AccordionTrigger>
              <AccordionContent>{<PortableText value={ingr.description?.[locale]} locale={locale} />}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="text-left mx-auto lg:w-4/5 max-w-4xl 2xl:max-w-5xl mt-12 flex flex-col md:flex-row w-full items-center gap-2 md:gap-6 lg:gap-10">
        <Percentage p={minorTitle?.[locale]} />
        <Accordion type="single" collapsible className="flex-1 w-full pl-2 md:pl-6 lg:pl-10 border-l-nu-black border-l-[1px] md:border-l-2 whitespace-pre-wrap">
          {ingredients.minor.map((ingr, i) => (
            <AccordionItem key={`item-${i}`} value={`item-${i}`} className="border-nu-black/30">
              <AccordionTrigger>{ingr.title?.[locale]}</AccordionTrigger>
              <AccordionContent>{<PortableText value={ingr.description?.[locale]} locale={locale} />}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export function Percentage({ p, className, ...props }: PercentageProps) {
  return (
    <Typography variant={"h2"} className=" w-[3ch] text-right">
      {p}
    </Typography>
  );
}
// border-transparent hover:border-nu-black/5 focus-within:border-nu-black/5 transition-colors duration-300
