import { cn } from "@/lib/utils";
import Product from "./Product";

export interface HomeBlogsProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function HomeBlogs({ children, className, ...props }: HomeBlogsProps) {
  return (
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
  );
}
