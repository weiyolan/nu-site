import { cn } from "@/lib/utils";
import Product from "./Product";
import Typography from "./Typography";

export interface HomeBlogsProps extends React.HTMLAttributes<HTMLDivElement> {title:string,description:string}

export default async function HomeBlogs({title, description,  children, className, ...props }: HomeBlogsProps) {
  return (
    <>
      {" "}
      <Typography variant="h2" className="text-center">
        En savoir plus?
      </Typography>
      <Typography variant={"p"} affects={"subTitle"} className="text-center mb-12 max-w-prose mx-auto">
        Explorez le monde de NU à travers nos articles de haut qualité. Lisez en plus de détails sur vos sujets favoris
      </Typography>
      <div className={cn("grid grid-cols-4 grid-flow-row gap-4 sm:gap-6", className)} {...props}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Product
            key={index}
            product={{
              price: 0,
              rating: 0,
              type: "article",
              slug: "/article",
              title: "La magie de la levure de bière pour le corps.",
              description:
                "Alors, prêts à rejoindre l'aventure NU, où l'art, la science et la nature se rencontrent pour créer quelque chose de vraiment spécial ? Essayez mon shampoing solide, et comme  moi, vous allez l'adorer. Vos cheveux vous remercieront, et la planète aussi !",
            }}
          />
        ))}
      </div>
    </>
  );
}
