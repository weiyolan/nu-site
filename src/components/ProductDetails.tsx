import { cn } from "@/lib/utils";
import Typography from "./Typography";
import ProductGallery from "./ProductGallery";
import PortableText from "./PortableText";
import slugify from "slugify";
import { altImageType, localeBlockContentType, localeStringType, localeType } from "@/sanity/lib/interface";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

export interface ProductDetailsProps extends React.HTMLAttributes<HTMLDivElement> {
  images: altImageType[];
  details: { title: localeStringType; details: localeBlockContentType }[];
  locale: localeType;
}

export default function ProductDetails({ locale, images, details, children, className, ...props }: ProductDetailsProps) {
  return (
    <div className={cn("w-full flex flex-col-reverse md:flex-row relative gap-12", className)} {...props}>
      <div className="flex-1 w-full ">
        {/* {details.map((section) => (
          <ProductDetail locale={locale} key={section.title?.[locale]} title={section.title?.[locale]} details={section.details?.[locale]} />
        ))} */}
        <Accordion type="multiple" className="w-full " defaultValue={[""]}>
          {details.map((section, i) => (
            <AccordionItem key={`item-${i}`} value={`item-${i}`} id={slugify(section.title?.[locale], { lower: true })} className="border-nu-black/30 scroll-m-32">
              {/* border-nu-black/30 */}
              <AccordionTrigger>
                <Typography variant={"h2"} className="text-left text-2xl">
                  {section.title?.[locale]}
                </Typography>
              </AccordionTrigger>
              <AccordionContent className="text-base">
                <PortableText value={section.details?.[locale]} locale={locale} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
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

      <PortableText value={details} locale={locale} />
    </div>
  );
}

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
