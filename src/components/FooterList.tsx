import { cn } from "@/lib/utils";
import Typography from "./Typography";
import { Button } from "./ui/button";
import Link from "next/link";
import { localeStringType, localeType } from "@/sanity/lib/interface";

export interface FooterListProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  locale: localeType;
  items: { text: localeStringType; url: string; ext: boolean }[];
}

export default function FooterList({ locale, children, title, items, className, ...props }: FooterListProps) {
  console.log(items);
  return (
    <div className={cn("", className)} {...props}>
      <Typography variant={"h3"} className="text-3xl mb-4">
        {title}
      </Typography>
      <ul className="">
        {items.map((i) => (
          <li key={i.text?.[locale]}>
            {/* <Typography variant={"p"} affects={"small"} className="font-bold">
            </Typography> */}
            <Button asChild variant={"link"} className="p-0 font-semibold">
              <Link href={i.url} className="p-0 h-fit ">
                {i.text?.[locale]}
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
