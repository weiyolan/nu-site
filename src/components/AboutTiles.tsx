import { cn } from "@/lib/utils";
import Typography from "./Typography";

export interface AboutTilesProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function AboutTiles({ children, className, ...props }: AboutTilesProps) {
  return (
    <div className={cn("", className)} {...props}>
      <Typography variant="h2" className="text-center">{`Quoi, un shampoing solide à base de levure de bière!`}</Typography>
      <Typography variant="p" affects={"subTitle"} className=" font-semibold text-center whitespace-pre-wrap">
        {"La Levure de bière vitalisant la poile, un shampoing solide, c'est une\ndéclaration d'amour direct envers le corps et la nature."}
      </Typography>
      <div className="w-full grid grid-cols-4 grid-rows-2 gap-4 min-h-[400px] mt-8 px-24">
        <div className="bg-nu-blue row-start-1 col-span-2 col-start-1 h-200 "></div>
        <div className="bg-nu-green row-start-2 col-span-2 col-start-1 h-200 "></div>
        <div className="bg-nu-purple col-span-1 col-start-3 aspect-square  "></div>
        <div className="bg-nu-peach row-start-2 col-span-1 col-start-3 aspect-square  "></div>
        <div className="bg-nu-yellow row-start-1 row-span-2 col-start-4  "></div>
      </div>
    </div>
  );
}
