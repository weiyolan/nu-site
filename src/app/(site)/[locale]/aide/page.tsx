import Section from "@/components/Section";
import Typography from "@/components/Typography";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getFAQ, getHelpInfo, localeType } from "@/sanity/lib/interface";
import Image from "next/image";

export default async function Page({ params: { locale } }: { params: { locale: localeType } }) {
  const helpInfo = await getHelpInfo();
  const faq = await getFAQ();
  return (
    <>
      {/* <Hero locale={locale} hero={hero} /> */}
      <div className="h-auto w-full relative">
        <Image
          fill
          src={helpInfo.altImage.image.url}
          placeholder="blur"
          blurDataURL={helpInfo.altImage.image.metadata.lqip}
          alt={helpInfo.altImage.alt?.[locale]}
          className="object-cover"
        />
        <Section className="py-24 pt-36 md:py-48 relative mt-0 md:mt-0">
          <Typography variant="h1" className="text-center relative md:w-[25ch] mx-auto">
            {helpInfo.title?.[locale]}
          </Typography>
          <Typography variant="p" affects={"subTitle"} className=" font-semibold text-center whitespace-pre-wrap relative">
            {helpInfo.description?.[locale]}
          </Typography>
        </Section>
      </div>

      <Section>
        <Accordion type="multiple" className=" w-full ">
          {faq.items.map((item, i) => (
            <AccordionItem key={i + item.title?.[locale]} value={`item-${i}`} className="border-nu-black/30">
              <AccordionTrigger>
                <Typography variant={"h2"} className="text-2xl">
                  {item.title?.[locale]}
                </Typography>
              </AccordionTrigger>
              <AccordionContent className="text-base">{item.description?.[locale]}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>
    </>
  );
}
