import { cn } from "@/lib/utils";
import Typography from "./Typography";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
export interface AboutIngredientsProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface PercentageProps extends React.HTMLAttributes<HTMLDivElement> {
  p: number;
}

export default function AboutIngredients({ children, className, ...props }: AboutIngredientsProps) {
  return (
    <div className={cn("text-center ", className)} {...props}>
      <Typography variant={"h2"}>Des Ingrédients Locaux & Naturels</Typography>
      <Typography variant={"p"} affects={"subTitle"} className="max-w-prose mx-auto">
        La transparence de Nu! Ah, et avez-vous déjà pensé à la levure de bière comme ingrédient magique pour vos cheveux ?
      </Typography>

      <div className="text-left mx-auto w-4/5 max-w-4xl 2xl:max-w-5xl mt-12 flex items-center gap-6  lg:gap-10">
        <Percentage p={90} />
        <Accordion type="single" collapsible className="flex-1 pl-6  lg:pl-10 border-l-nu-black border-l-2 ">
          <AccordionItem value="item-1" className="border-nu-black/30">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-nu-black/30">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-nu-black/30">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="text-left mx-auto w-4/5 max-w-4xl 2xl:max-w-5xl mt-12 flex items-center gap-6 lg:gap-10">
        <Percentage p={10} />
        <Accordion type="single" collapsible className="flex-1 pl-6 lg:pl-10 border-l-nu-black border-l-2 ">
          <AccordionItem value="item-1" className="border-nu-black/30">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-nu-black/30">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-nu-black/30">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export function Percentage({ p, className, ...props }: PercentageProps) {
  return (
    <Typography variant={"h2"} className="w-[3ch] text-right">
      {p}%
    </Typography>
  );
}
// border-transparent hover:border-nu-black/5 focus-within:border-nu-black/5 transition-colors duration-300
