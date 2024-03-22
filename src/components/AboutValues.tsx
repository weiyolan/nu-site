import { cn } from "@/lib/utils";
import Typography from "./Typography";
import { desc } from "drizzle-orm";
import Image from "next/image";

export interface AboutValuesProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface ValueProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  prefix: string;
}
const values: { title: string; description: string; prefix: string }[] = [
  {
    title: "Le Corps",
    description:
      "Un Élixir d'Éclat, L'huile d'olive de notre région, la Vallée des Baux, est réputée pour ses propriétés nourrissantes et hydratantes. Elle donne à vos cheveux une brillance naturelle, tout en les protégeant des agressions extérieures.",
    prefix: "NU pour",
  },
  {
    title: "La Transparence",
    description:
      "Un Élixir d'Éclat, L'huile d'olive de notre région, la Vallée des Baux, est réputée pour ses propriétés nourrissantes et hydratantes. Elle donne à vos cheveux une brillance naturelle, tout en les protégeant des agressions extérieures.",
    prefix: "NU pour",
  },
  {
    title: "La Nature",
    description:
      "Un Élixir d'Éclat, L'huile d'olive de notre région, la Vallée des Baux, est réputée pour ses propriétés nourrissantes et hydratantes. Elle donne à vos cheveux une brillance naturelle, tout en les protégeant des agressions extérieures.",
    prefix: "NU pour",
  },
  {
    title: "La Bière",
    description:
      "Un Élixir d'Éclat, L'huile d'olive de notre région, la Vallée des Baux, est réputée pour ses propriétés nourrissantes et hydratantes. Elle donne à vos cheveux une brillance naturelle, tout en les protégeant des agressions extérieures.",
    prefix: "NU pour",
  },
];

const styles: string[] = ["mt-48", "mt-24", "mt-36", "-mt-6"];
export default function AboutValues({ className, ...props }: AboutValuesProps) {
  return (
    <div className={cn("w-full ", className)} {...props}>
      <Typography variant="h2">Nos Valeurs</Typography>
      <Typography variant={"p"} affects={"subTitle"} className="max-w-prose">
        La transparence de Nu! Ah, et avez-vous déjà pensé à la levure de bière comme ingrédient magique pour vos cheveux?
      </Typography>
      <div className="grid grid-cols-4 gap-6 w-full -mt-10">
        {values.map((value, index) => (
          <Value key={`${value.title + index}`} title={value.title} description={value.description} prefix={value.prefix} className={styles[index]} />
        ))}
      </div>
    </div>
  );
}

export function Value({ title, description, prefix, className, ...props }: ValueProps) {
  return (
    <div className={cn("text-center space-y-8 p-2 ", className)}>
      <Typography variant={"p"} affects={"muted"}>
        {prefix}
      </Typography>
      <Typography variant={"h3"}>{title}</Typography>
      <Typography variant={"p"} className="leading-6">
        {description}
      </Typography>
      <Image src="/about_transparent.jpg" alt="nature" width="200" height="200" className="w-full aspect-square"></Image>
    </div>
  );
}
