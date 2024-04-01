import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Typography from "./Typography";
import Link from "next/link";

export interface HomeEssayerNuProps extends React.HTMLAttributes<HTMLDivElement> {
  cta: {
    title: { en: string; fr: string };
    promotion: { en: string; fr: string };
    button: { ext: boolean; text: { en: string; fr: string }; url: string };
    description: { en: string; fr: string };
  };
  locale: "en" | "fr";
}

export default function HomeEssayerNu({ locale, cta: { title, description, button, promotion }, children, className, ...props }: HomeEssayerNuProps) {
  return (
    <div className={cn("max-w-7xl mx-auto justify-center flex gap-16 py-16 h-full", className)} {...props}>
      <div className="w-1/2 max-w-prose flex flex-col justify-start items-start">
        <Typography variant={"h2"}>{title?.[locale]}</Typography>
        <Typography variant={"p"} affects={"subTitle"} className="text-nu-black">
          {description?.[locale]}
        </Typography>
      </div>
      <div className="flex-col flex justify-center items-center">
        <Button asChild>
          <Link href={button.url}>{button.text?.[locale]}</Link>
        </Button>
        <Typography variant={"p"} className="text-sm font-bold w-fit">
          {promotion?.[locale]}
        </Typography>
      </div>
    </div>
  );
}
