import { cn } from "@/lib/utils";
import Image from "next/image";
import Typography from "./Typography";
import { Button } from "./ui/button";
import Link from "next/link";
import { AspectRatio } from "./ui/aspect-ratio";

export interface AboutBeerProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function AboutBeer({ children, className, ...props }: AboutBeerProps) {
  return (
    <div className={cn("w-[120%] -left-[10%] relative mt-48", className)} {...props}>
      <AspectRatio ratio={19 / 9}>
        <Image src="/about_yiest.png" className="object-cover" fill alt="levure de bière" />
      </AspectRatio>

      <div className="bg-nu-yellow shadow-lg min-w-[500px] max-w-prose absolute p-8 left-1/2 top-0 -translate-x-1/2 -translate-y-24 flex flex-col items-center">
        <Typography variant="h2" className="text-center whitespace-pre-wrap">{`Un shampoing solide a\nbase de levure de bière`}</Typography>
        <Typography variant="p" affects={"withPMargin"} className=" font-semibold text-center whitespace-wrap">
          {`Ah, et avez-vous déjà pensé à la levure de bière comme ingrédient magique pour vos cheveux ? En collaboration avec une brasserie locale, j'ai décidé de donner une seconde vie à ces trésors souvent négligés. Les levures de bière récupérées apportent souplesse, vitalité et brillance à vos cheveux tout en réduisant notre impact sur l'environnement.`}
        </Typography>
        <Button asChild className="w-fit mx-auto relative mt-6">
          <Link className="w-fit mx-auto relative mt-6" href="/">
            En lire plus
          </Link>
        </Button>
      </div>
    </div>
  );
}
