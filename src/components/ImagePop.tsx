import { cn } from "@/lib/utils";
import Image from "next/image";
import Typography from "./Typography";
import { Button } from "./ui/button";
import { AspectRatio } from "./ui/aspect-ratio";

export interface ImagePopProps extends React.HTMLAttributes<HTMLInputElement> {
  img: { src: string; alt: string };
  title: string;
  text: string;
  imgRight?: boolean;
  button: string;
  color: "bg-nu-yellow" | "bg-nu-green" | "bg-nu-blue" | "bg-nu-peach" | "bg-nu-purple";
}

export default function ImagePop({ children, img, imgRight, color, title, text, button, className, ...props }: ImagePopProps) {
  return (
    // 32 if colored square behind has border of 16
    <div className={cn("flex w-full gap-32 mb-48", imgRight && "flex-row-reverse", className)} {...props}>
      <div className={`flex-1 relative w-1/2 `}>
        <AspectRatio ratio={1} className="after:block after:w-full after:h-full after:shadow-lg after:absolute after:top-0">
          <div className={`block w-full h-full ${color} relative top-16 ${imgRight ? "-left-16 " : "-right-16"}`}></div>
          <Image src={img.src} fill sizes="50vw" alt={img.alt} className="object-cover object-center"></Image>
        </AspectRatio>
      </div>
      <div className={`flex-1 flex flex-col justify-center gap-6 ${imgRight ? "text-right items-end" : ""}`}>
        <Typography variant={"h2"} className="">
          {title}
        </Typography>
        <Typography variant={"p"} className="whitespace-pre-wrap">
          {text}
        </Typography>
        <Button className="w-fit">{button}</Button>
      </div>
    </div>
  );
}
