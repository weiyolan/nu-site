import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Typography from "./Typography";

export interface HomeEssayerNuProps extends React.HTMLAttributes<HTMLInputElement> {}

export default function HomeEssayerNu({ children, className, ...props }: HomeEssayerNuProps) {
  return (
    <div className={cn("max-w-7xl mx-auto justify-center flex gap-16 py-16 h-full", className)} {...props}>
      <div className="w-1/2 max-w-prose flex flex-col justify-start items-start">
        <Typography variant={"h2"}>Prêt à essayer NU?</Typography>
        <Typography
          variant={"p"}
          affects={"subTitle"}
          className="text-nu-black">{`Essayez mon shampoing solide, et comme  moi, vous allez l'adorer. Vos cheveux vous remercieront, et la planète aussi !`}</Typography>
      </div>
      <div className="flex-col flex justify-center items-center">
        <Button>Essayer NU Maintenant</Button>
        <Typography variant={"p"} className="text-sm font-bold w-fit">
          {" "}
          Et profitez de -10%!{" "}
        </Typography>
      </div>
    </div>
  );
}
