import { cn } from "@/lib/utils";
import { localeType } from "@/sanity/lib/interface";
import { PortableText as DefaultPortableText } from "@portabletext/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import Typography from "./Typography";

export interface PortableTextProps extends React.HTMLAttributes<HTMLDivElement> {
  locale: localeType;
  value: any;
}

export default function PortableText({ value, locale, ...props }: PortableTextProps) {
  return <DefaultPortableText value={value} components={components(locale)} {...props} />;
}

const components = (locale: localeType) => {
  return {
    types: {
      // normal:({children})=><Typography variant={'p'} affects={"withPMargin"}>{children}</Typography>,
      accordion: ({ value: { items } }) => (
        <Accordion type="single" collapsible className=" w-full ">
          {items.map((item, i) => (
            <AccordionItem key={item.title?.[locale] + i} value={`item-${i}`} className="border-nu-black/30">
              <AccordionTrigger>{item.title?.[locale]}</AccordionTrigger>
              <AccordionContent>{item.description?.[locale]}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ),
    },

    list: {
      bullet: ({ children }) => <ul className="my-6 ml-12 list-disc [&>li]:mt-2">{children}</ul>,
    },
    block: {
      normal: ({ children }) => (
        <Typography variant={"p"} affects={"withPMargin"}>
          {children}
        </Typography>
      ),
      small: ({ children }) => (
        <Typography variant={"p"} affects={"withPMargin"} className="text-sm">
          {children}
        </Typography>
      ),
      subTitle: ({ children }) => (
        <Typography variant={"p"} affects={"subTitle"} className="text-nu-black">
          {children}
        </Typography>
      ),
    },
    marks: {
      // strong: ()=>{}
      // link? list? normal p?
    },
  };
};
