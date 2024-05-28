import { cn } from "@/lib/utils";
import Section from "./Section";
import Typography from "./Typography";
// import { BaggageClaim, Banana, Banknote, Lock } from "lucide-react";
// import { Separator } from "../ui/separator";
import Nu from "./NuLogo";
import Quote from "./Quote";
import FooterList from "./FooterList";
import Newsletter from "./FooterNewsletter";
import Credits from "./FooterCredits";
// import LucideIcon from "./LucideIcon";
import { localeStringType, localeType } from "@/sanity/lib/interface";
// import { Separator } from "./ui/separator";
// import { useMediaQuery } from "usehooks-ts";
import FooterMessages from "./FooterMessages";

export interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
  locale: localeType;
  footerInfo: {
    messages: { text: localeStringType; icon: { name: string } }[];
    quote: { by: localeStringType; quote: localeStringType };
    newsletter: {
      text: localeStringType;
      title: localeStringType;
      confidential: { title: localeStringType; text: localeStringType; url: localeStringType };
      general: { title: localeStringType; text: localeStringType; url: localeStringType };
    };
  };
  footerLists: {
    title: localeStringType;
    links: (
      | {
          _type: "link";
          ext: boolean;
          url: string;
          text: localeStringType;
          doc: null;
        }
      | {
          _type: "linkDoc";
          ext: boolean;
          url: null;
          text: localeStringType;
          doc: { title: localeStringType; url: localeStringType };
        }
    )[];
  }[];
}

export default function Footer({ footerLists, footerInfo: { messages, quote, newsletter }, locale, children, className, ...props }: FooterProps) {
  // <div className={cn("flex-1", className)} {...props}>
  //         {children}
  //       </div>

  return (
    <footer className={cn("relative overflow-hidden ", className)}>
      <FooterMessages locale={locale} messages={messages} />

      <div className="w-full bg-nu-peach relative">
        <Nu className="absolute fill-nu-purple opacity-10 h-auto w-full md:w-auto md:h-full bottom-0 top-auto md:top-0 md:bottom-auto" />

        <Section className="flex flex-col items-end sm:flex-row gap-2 sm:gap-0 sm:justify-between sm:items-center py-16 pb-8 md:pb-16 mt-0 md:mt-0 ">
          <Nu className="shrink-0 " />
          <div className="opacity-85 relative translate-x-4 max-w-62 sm:max-w-[52ch]">
            <Quote className="opacity-20" />
            <Typography variant={"h3"} className="text-lg leading-snug whitespace-pre-wrap">
              {quote.quote?.[locale]}
            </Typography>
            <Typography variant={"p"} className="text-sm pt-1">
              {quote.by?.[locale]}
            </Typography>
          </div>
        </Section>

        <Section className="flex-col lg:flex-row flex gap-8 lg:gap-12 xl:gap-16 lg:px-16 min-[1100px]:px-24 mt-0 md:mt-0 pb-12">
          <Newsletter newsletter={newsletter} locale={locale} />
          {/* Correct for documents */}
          {/* <pre>{console.log(footerLists)}</pre> */}
          {footerLists.map((list, i) => (
            <FooterList locale={locale} key={`list-${i}`} title={list.title?.[locale]} items={list.links} />
          ))}
        </Section>

        <Credits className="pb-1" />
      </div>
    </footer>
  );
}

