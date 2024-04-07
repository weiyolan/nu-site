import { cn } from "@/lib/utils";
import Typography from "./Typography";
import { Button } from "./ui/button";
import Link from "next/link";
import { localeStringType, localeType } from "@/sanity/lib/interface";

export interface FooterListProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  locale: localeType;
  items: (
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
}

export default function FooterList({ locale, children, title, items, className, ...props }: FooterListProps) {
  return (
    <div className={cn("", className)} {...props}>
      <Typography variant={"h3"} className="text-3xl mb-4">
        {title}
      </Typography>
      <ul className="">
        {items.map((link, i) =>
          link._type === "link" ? (
            <li key={i + link.text?.[locale]}>
              {/* <Typography variant={"p"} affects={"small"} className="font-bold">
            </Typography> */}
              <Button asChild variant={"link"} className="p-0 font-semibold">
                <Link href={link.url} className="p-0 h-fit ">
                  {link.text?.[locale]}
                </Link>
              </Button>
            </li>
          ) : (
            <li key={i + link.text?.[locale]}>
              {/* <Typography variant={"p"} affects={"small"} className="font-bold">
            </Typography> */}
              <Button asChild variant={"link"} className="p-0 font-semibold">
                <Link href={link.doc.url?.[locale]} title={`${locale === "fr" ? "Télécharger" : "Download"} ${link.doc.title?.[locale]}`} className="p-0 h-fit ">
                  {link.text?.[locale]}
                </Link>
              </Button>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
