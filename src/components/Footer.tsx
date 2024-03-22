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

export interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Footer({ children, className, ...props }: FooterProps) {
  // <div className={cn("flex-1", className)} {...props}>
  //         {children}
  //       </div>
  return (
    <footer className={cn("relative", className)}>
      <Section className="grid grid-cols-4 grid-flow-row w-full divide-x-2 divide-nu-black p-6 gap-6 items-center ">
        <Message icon={<BaggageClaim className="inline-flex w-8 h-auto " />} text="Envoi gratuit à partir de €40" />
        {/* <Separator orientation="vertical" className="bg-nu-black h-24 w-0.5" /> */}
        <Message icon={<Banknote className="inline-flex w-8 h-auto " />} text="30 jours satisfait ou remboursé" />
        {/* <Separator orientation="vertical" className="bg-nu-black h-24 w-0.5" /> */}
        <Message icon={<Banana className="inline-flex w-8 h-auto " />} text="Envoi et emballage écologique" />
        {/* <Separator orientation="vertical" className="bg-nu-black h-24 w-0.5" /> */}
        <Message icon={<Lock className="inline-flex w-8 h-auto " />} text="Transactions 100% sécurisé" />
      </Section>
      <div className="w-full bg-nu-peach relative">
        <Nu className="absolute fill-nu-purple opacity-10 h-full w-auto" />

        <Section className="flex justify-between items-center py-16  mt-0">
          <Nu />
          <div className="opacity-85 relative ">
            <Quote className="opacity-20" />
            <Typography variant={"h3"} className="text-lg leading-snug whitespace-pre-wrap">{`La vie est belle comme vous\nsi vous utiliser le shampoing NU`}</Typography>
            <Typography variant={"p"} className="text-sm pt-1">
              - Bienvenue dans le monde Nu
            </Typography>
          </div>
        </Section>

        <Section className="flex gap-16 mt-0 pb-12">
          <Newsletter />
          <FooterList
            title="Navigation"
            items={[
              { text: "Le Shop", link: "/" },
              { text: "A propos", link: "/" },
              { text: "Les Shampoings", link: "/" },
              { text: "Les Packs", link: "/" },
            ]}
          />
          <FooterList
            title="Aide"
            items={[
              { text: "FAQ", link: "/" },
              { text: "A propos", link: "/" },
              { text: "Les Shampoings", link: "/" },
              { text: "Les Packs", link: "/" },
              { text: "Cookie Notice", link: "/" },
              { text: "Termes de Ventes", link: "/" },
            ]}
          />
          <FooterList
            title="Socials"
            items={[
              { text: "Le Shop", link: "/" },
              { text: "A propos", link: "/" },
              { text: "Les Shampoings", link: "/" },
              { text: "Les Packs", link: "/" },
            ]}
          />
        </Section>

        <Credits className="pb-1" />
      </div>
    </footer>
  );
}

function Message({ text, icon }: { text: string; icon: React.AllHTMLAttributes<HTMLOrSVGElement> }) {
  // const Comp = icon || "BaggageClaim";
  return (
    <div className=" flex items-start justify-end gap-3 h-fit ">
      {<>{icon}</>}
      <Typography variant={"p"} className="inline-flex whitespace-pre-wrap w-[16ch]">
        {text}
      </Typography>
    </div>
  );
}
