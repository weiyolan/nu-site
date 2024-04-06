import { cn } from "@/lib/utils";
import Section from "./Section";
import Typography from "./Typography";
import { BaggageClaim, Banana, Banknote, Lock } from "lucide-react";
// import { Separator } from "../ui/separator";
import Nu from "./NuLogo";
import Quote from "./Quote";
import FooterList from "./FooterList";
import Newsletter from "./FooterNewsletter";
import Credits from "./FooterCredits";
import LucideIcon from "./LucideIcon";
import { localeStringType, localeType } from "@/sanity/lib/interface";
import footerLists from "@/sanity/schemaTypes/footerLists";
export interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
  locale: localeType;
  footerInfo: {
    messages: { text: localeStringType; icon: { name: string } }[];
    lists: { title: localeStringType; links: { ext: boolean; url: string; text: localeStringType }[] }[];
    quote: { by: localeStringType; quote: localeStringType };
    newsletter: { text: localeStringType; title: localeStringType };
  };
}

export default function Footer({ footerInfo: { messages, lists, quote, newsletter }, locale, children, className, ...props }: FooterProps) {
  // <div className={cn("flex-1", className)} {...props}>
  //         {children}
  //       </div>
  return (
    <footer className={cn("relative", className)}>
      <Section className="grid grid-cols-4 grid-flow-row w-full divide-x-2 divide-nu-black p-6 gap-6 items-center ">
        {messages.map((message, i) => (
          <Message key={i} name={message.icon.name} text={message.text?.[locale]} />
        ))}
      </Section>
      <div className="w-full bg-nu-peach relative">
        <Nu className="absolute fill-nu-purple opacity-10 h-full w-auto" />

        <Section className="flex justify-between items-center py-16  mt-0">
          <Nu />
          <div className="opacity-85 relative ">
            <Quote className="opacity-20" />
            <Typography variant={"h3"} className="text-lg leading-snug whitespace-pre-wrap">
              {quote.quote?.[locale]}
            </Typography>
            <Typography variant={"p"} className="text-sm pt-1">
              {quote.by?.[locale]}
            </Typography>
          </div>
        </Section>

        <Section className="flex gap-16 mt-0 pb-12">
          <Newsletter />
          {/* Correct for documents */}
          {/* {lists.map((list, i) => (
            <FooterList locale={locale} key={`list-${i}`} title={list.title?.[locale]} items={list.links} />
          ))} */}
        </Section>

        <Credits className="pb-1" />
      </div>
    </footer>
  );
}

function Message({ text, name }: { text: string; name: string }) {
  // const Comp = icon || "BaggageClaim";
  return (
    <div className=" flex items-start justify-end gap-3 h-fit ">
      <LucideIcon name={name} className="w-8 h-8" />
      <Typography variant={"p"} className="inline-flex whitespace-pre-wrap w-[16ch]">
        {text}
      </Typography>
    </div>
  );
}
