import { cn } from "@/lib/utils";
import Stars from "./Stars";
import Typography from "./Typography";
import { Button } from "./ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
export interface ProductProps extends React.HTMLAttributes<HTMLDivElement> {
  product: {
    slug: string;
    title: string;
    description: string;
    price: number;
    rating: number;
    type: "title" | "product" | "article";
    color?: "bg-nu-yellow" | "bg-nu-green" | "bg-nu-blue" | "bg-nu-peach" | "bg-nu-purple";
  };
}

export default function Product({ product: { slug, title, type, description, price, rating, color }, className, ...props }: ProductProps) {
  return (
    <div
      className={cn(
        `flex relative flex-col group w-full gap-2 sm:gap-3 lg:gap-4  ${type === "title" ? " justify-center text-center  px-2 sm:px-3 lg:px-4" : " items-start"}`,
        className
      )}
      {...props}>
      {type !== "title" && <div className="bg-nu-blue w-full aspect-square" />}
      {type === "title" && <div className={`absolute z-0 top-0 left-0 right-0 bottom-0 ${color}`} />}
      {type === "product" && <Stars rating={rating} dark />}
      <Typography variant={type === "title" ? "h2" : "h3"} className="relative">
        {title}
      </Typography>
      <Typography variant={"p"} className={`relative  ${type === "title" ? "text-center " : "text-justify text-sm"}`}>
        {description}
      </Typography>

      {type === "product" && (
        <div className="flex gap-16 items-center w-full p-1 relative">
          <Typography variant={"h4"} className="font-corben font-normal w-[4ch]">
            €{price.toFixed(2)}
          </Typography>
          <Button asChild className="flex-1 group-hover:opacity-100 transition-opacity opacity-0">
            <Link className="" href={`/shop/${slug}`}>
              Voir Produit
            </Link>
          </Button>
        </div>
      )}
      {type === "title" && (
        <Button asChild className="mx-auto mt-4 relative">
          <Link className="" href={`/shop#${slug}`}>
            Voir Le Shop
          </Link>
        </Button>
      )}
      {type === "article" && (
        <Button variant="link" asChild size="sm" className=" relative items-center -mt-2 -ml-2 group/button text-base">
          <Link className="" href={`/shop#${slug}`}>
          Lire article <ChevronRight className="size-4 group-hover/button:translate-x-1 transition-transform duration-200  mt-1" />
          </Link>
        </Button>
      )}
    </div>
  );
}

// product:{slug, title,description},
