import Image from "next/image";
import Section from "./Section";
import Typography from "./Typography";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ProductsPresentationProps extends React.HTMLAttributes<HTMLInputElement> {}
export interface PresentationProps extends React.HTMLAttributes<HTMLInputElement> {}
export interface PresentationDetailsProps extends React.HTMLAttributes<HTMLInputElement> {
  title: string;
  description: string;
  button: string;
  slug: string;
}

export default function ProductsPresentation() {
  return (
    <>
      <Typography variant="h2" className="text-center">{`Bienvenue dans le monde de la beauté avec\nnotre shampoing solide exclusif`}</Typography>
      <Typography variant="p" affects={"subTitle"} className=" font-semibold text-center ">
        - Explorez Nu, Vivez Nu, Soyez Nu -
      </Typography>
      <div className="relative w-full max-w-xl mx-auto mt-12 h-[500px] drop-shadow-xl">

        <Presentation className="group/topLeft left-0 -translate-x-1/2">
          <PresentationDetails
            className="text-nowrap z-10"
            title="Le Shampoing NYX"
            slug="product1"
            button="Voir le produit"
            description="Bienvenue dans le monde de la beauté naturelle avec notre shampoing solide exclusif, conçu spécialement pour les cheveux normaux. Notre formule unique marie les bienfaits de la levure de bière "
          />
            <Image
            className="object-cover  group-hover/topLeft:-translate-x-2 group-hover/topLeft:-translate-y-2 hover:-translate-x-2 hover:-translate-y-2 transition-transform ease-out duration-500"
            alt="produit 1"
            src="/main_savon1.png"
            width={270}
            height={750}
          />
        </Presentation>

        <Presentation className="group/topRight right-0 translate-x-1/2 items-start">
          <Image
            className="object-cover   group-hover/topRight:translate-x-2 group-hover/topRight:-translate-y-2 hover:translate-x-2 hover:-translate-y-2 transition-transform ease-out duration-500"
            alt="produit 1"
            src="/main_savon2.png"
            width={270}
            height={750}
          />
          <PresentationDetails
            className=" "
            title="Le Shampoing CHAOS"
            slug="product1"
            button="Voir le produit"
            description="Découvrez la Magie de notre Shampoing Solide pour Cheveux Normaux à la Levure de Bière et à l'Huile d'Olive de la Vallée des Baux"
          />
        </Presentation>
        
        <Presentation className="group/bottomLeft bottom-0 left-0 -translate-x-1/2 items-end">
          <PresentationDetails
            className="  "
            title="Boîte en Liège"
            slug="product1"
            button="Voir le produit"
            description="Découvrez la Magie de notre Shampoing Solide pour Cheveux Normaux à la Levure de Bière et à l'Huile d'Olive de la Vallée des Baux"
          />
          <Image className="object-cover  group-hover/bottomLeft:-translate-x-2 group-hover/bottomLeft:translate-y-2 hover:-translate-x-2 hover:translate-y-2 transition-transform ease-out duration-500" alt="produit 1" src="/main_boite.png" width={350} height={600} />
        </Presentation>
        <Presentation className="group/bottomRight bottom-0 right-0 translate-x-[55%] items-end">
          <Image
            className=" object-cover  group-hover/bottomRight:translate-x-2 group-hover/bottomRight:translate-y-2 hover:translate-x-2 hover:translate-y-2 transition-transform ease-out duration-500 "
            alt="produit 1"
            src="/main_crochet.png"
            width={200}
            height={750}
          />
          <PresentationDetails
            className="  "
            title="Porte Savon"
            slug="product1"
            button="Voir le produit"
            description="Les levures de bière récupérées apportent souplesse, vitalité et brillance à vos cheveux tout en réduisant notre impact sur l'environnement."
          />
        </Presentation>
      </div>
    </>
  );
}

export function PresentationDetails({ title, description, button, slug, className }: PresentationDetailsProps) {
  return (
    <div className={cn("text-center space-y-4 text-balance relative min-w-72", className)}>
      <Typography variant={"h3"}>{title}</Typography>
      <Typography variant={"p"} className="text-sm text-balance mx-auto">
        {description}
      </Typography>
      <Button asChild className="mx-auto">
        <Link href={slug}>{button}</Link>
      </Button>
    </div>
  );
}

export function Presentation({ children, className }: PresentationProps) {
  return <div className={cn("absolute flex gap-8", className)}>{children}</div>;
}
