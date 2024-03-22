import { cn } from "@/lib/utils";
import Typography from "./Typography";
import Image from "next/image";
import NuLogo from "./NuLogo";

export interface AboutTilesProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function AboutTiles({ children, className, ...props }: AboutTilesProps) {
  return (
    <div className={cn("", className)} {...props}>
      <Typography variant="h2" className="text-center">{`Quoi, un shampoing solide à base de levure de bière!`}</Typography>
      <Typography variant="p" affects={"subTitle"} className=" font-semibold text-center whitespace-pre-wrap">
        {"La Levure de bière vitalisant la poile, un shampoing solide, c'est une\ndéclaration d'amour direct envers le corps et la nature."}
      </Typography>
      <div className="w-auto grid grid-cols-4 grid-rows-2 gap-4  mt-8 xl:px-24">
        <div className="relative bg-nu-blue row-start-1 col-span-2 col-start-1 h-200 ">
          <Image alt="shampoo" src="/about_body.jpg" fill className="object-cover object-center" />
        </div>
        <div className="relative text-center bg-nu-green flex flex-col justify-center row-start-2 col-span-2 col-start-1 min-h-200 p-8">
          <Typography variant={"h3"} className="mb-4 text-3xl">
            Pourquoi NU?
          </Typography>
          <Typography variant={"p"} className="">
            {
              "La réponse est simple. Cette aventure n'a pas été sans son lot de défis, mais ma détermination à créer quelque chose d'extraordinaire persistait. Aujourd'hui, je suis fière de vous présenter un produit qui est le fruit de ma persévéran"
            }
          </Typography>
        </div>
        <div className="relative bg-nu-purple col-span-1 col-start-3 aspect-square flex items-center justify-center ">
          <NuLogo />
        </div>
        <div className="relative bg-nu-peach row-start-2 col-span-1 col-start-3 aspect-square  ">
          <Image alt="shampoo" src="/about_body.jpg" fill className="object-cover object-center" />
        </div>
        <div className="relative bg-nu-yellow row-start-1 row-span-2 col-start-4  ">
          <Image alt="shampoo" src="/about_body.jpg" fill className="object-cover object-center" />
        </div>
      </div>
    </div>
  );
}
