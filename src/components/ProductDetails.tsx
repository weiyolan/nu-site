import { cn } from "@/lib/utils";
import Typography from "./Typography";
import ProductGallery from "./ProductGallery";
import { PortableText, toPlainText } from "@portabletext/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import slugify from "slugify";
import { altImageType, localeType } from "@/sanity/lib/interface";

export interface ProductDetailsProps extends React.HTMLAttributes<HTMLDivElement> {
  images: altImageType[];
  details: {}[];
  locale: localeType;
}

export default function ProductDetails({ locale, images, details, children, className, ...props }: ProductDetailsProps) {
  return (
    <div className={cn("w-full flex relative gap-12", className)} {...props}>
      <div className="flex-1 w-full ">
        {details.map((section) => (
          <ProductDetail locale={locale} key={section.title?.[locale]} title={section.title?.[locale]} details={section.details?.[locale]} />
        ))}
      </div>
      <div className="flex-1 w-full ">
        <ProductGallery locale={locale} images={images} />
        {/* <AspectRatio ratio={1 / 1} className="">
          <Image src="/main_heroHair.jpg" alt="Women in bath shampoing her hair" fill className="object-cover" />
        </AspectRatio> */}
      </div>
    </div>
  );
}

export function ProductDetail({ locale, details, title }) {
  return (
    <div className="w-full [&:not(:first-child)]:mt-8 scroll-mt-20" id={slugify(title, { lower: true })}>
      <Typography variant={"h2"} className="">
        {title}
      </Typography>

      <PortableText value={details} components={components(locale)} />
    </div>
  );
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
    },
    // marks:{} link? list? normal p?
  };
};

export function ProductDetailExample() {
  return (
    <div className="w-full [&:not(:first-child)]:mt-8">
      <Typography variant={"h2"} className="">
        Bénéfices
      </Typography>
      <Typography variant={"p"} affects={"withPMargin"}>
        {
          "La Levure de bière vitalisant la poile, un shampoing solide, c'est une déclaration d'amour direct envers le corps et la nature. La Levure de bière vitalisant la poile, un shampoing solide, c'est une déclaration d'amour direct envers le corps et la nature."
        }
      </Typography>
      <Typography variant={"p"} affects={"withPMargin"}>
        {
          "La Levure de bière vitalisant la poile, un shampoing solide, c'est une déclaration d'amour direct envers le corps et la nature. La Levure de bière vitalisant la poile, un shampoing solide, c'est une déclaration d'amour direct envers le corps et la nature."
        }
      </Typography>
      <Typography variant={"p"} affects={"withPMargin"}>
        {
          "La Levure de bière vitalisant la poile, un shampoing solide, c'est une déclaration d'amour direct envers le corps et la nature. La Levure de bière vitalisant la poile, un shampoing solide, c'est une déclaration d'amour direct envers le corps et la nature."
        }
      </Typography>
      <Typography variant={"p"} affects={"withPMargin"}>
        {
          "La Levure de bière vitalisant la poile, un shampoing solide, c'est une déclaration d'amour direct envers le corps et la nature. La Levure de bière vitalisant la poile, un shampoing solide, c'est une déclaration d'amour direct envers le corps et la nature."
        }
      </Typography>
    </div>
  );
}
