import PortableText from "@/components/PortableText";
import Section from "@/components/Section";
import Typography from "@/components/Typography";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getFAQ, getHelpInfo, localeType } from "@/sanity/lib/interface";
import Image from "next/image";

export default async function Page({ params: { locale } }: { params: { locale: localeType } }) {
  const helpInfo = await getHelpInfo();
  const faq = await getFAQ();
  // console.log(faq.items);
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
        <Typography variant="h1" className="text-center relative md:w-[25ch] mx-auto">
          FAQ
        </Typography>
        <Accordion type="multiple" className=" w-full ">
          {/* {console.log(faq.items)} */}
          {faq.items.map((item, i) => (
            <AccordionItem key={i + item.title?.fr} value={`item-${i}`} className="border-nu-black/30">
              <AccordionTrigger>
                <Typography variant={"h2"} className="text-2xl">
                  {item.title?.[locale]}
                </Typography>
              </AccordionTrigger>
              <AccordionContent className="text-base">
                <PortableText value={item.description?.[locale]} locale={locale} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>
    </>
  );
}
