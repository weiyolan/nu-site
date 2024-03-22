import { cn } from "@/lib/utils";
import Typography from "./Typography";
import { Button } from "./ui/button";
import Link from "next/link";

export interface FooterListProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  items: { text: string; link: string }[];
}

export default function FooterList({ children, title, items, className, ...props }: FooterListProps) {
  return (
    <div className={cn("", className)} {...props}>
      <Typography variant={"h3"} className="text-3xl mb-4">
        {title}
      </Typography>
      <ul className="">
        {items.map((i) => (
          <li key={i.text}>
            {/* <Typography variant={"p"} affects={"small"} className="font-bold">
            </Typography> */}
            <Button asChild variant={"link"} className="p-0 font-semibold">
              <Link href={i.link} className="p-0 h-fit ">
                {i.text}
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
