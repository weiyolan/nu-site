import { cn } from "@/lib/utils";
import Product from "./Product";

export interface ProductsProps extends React.HTMLAttributes<HTMLInputElement> {}

export default function Products({ children, className, ...props }: ProductsProps) {
  return (
    <div className={cn("grid grid-cols-4 grid-flow-row gap-4 sm:gap-6", className)} {...props}>
      <Product
        product={{
          type: "title",
          color: "bg-nu-peach",
          slug: "product-slug",
          rating: 4.5 / 5,
          price: 15,
          title: "Découvrez les\nPacks Préférés",
          description:
            "Alors, prêts à rejoindre l'aventure NU, où l'art, la science et la nature se rencontrent pour créer quelque chose de vraiment spécial ? Essayez mon shampoing solide, et koi",
        }}
      />
      {Array.from({ length: 3 }).map((_, index) => (
        // <div key={index} className="bg-nu-purple h-96"></div>
        <Product
          key={index}
          product={{
            type: "product",
            slug: "product-slug",
            rating: 3.5 / 5,
            price: 15,
            title: "Pack 1: Shampoing",
            description:
              "Alors, prêts à rejoindre l'aventure NU, où l'art, la science et la nature se rencontrent pour créer quelque chose de vraiment spécial ? Essayez mon shampoing solide, et koi",
          }}
        />
      ))}
    </div>
  );
}
