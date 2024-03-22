import { cn } from "@/lib/utils";
import Image from "next/image";
import Typography from "./Typography";
import { Button } from "./ui/button";

export interface ImagePopProps extends React.HTMLAttributes<HTMLInputElement> {
  img: { src: string; alt: string };
  title: string;
  text: string;
  imgRight?: boolean;
  button: string;
  color: "before:bg-nu-yellow" | "before:bg-nu-green" | "before:bg-nu-blue" | "before:bg-nu-peach" | "before:bg-nu-purple";
}

export default function ImagePop({ children, img, imgRight, color, title, text, button, className, ...props }: ImagePopProps) {
  return (
    // 32 if colored square behind has border of 16
    <div className={cn("flex w-full gap-32 mb-48", imgRight && "flex-row-reverse", className)} {...props}>
      <div
        className={`flex-1 w-1/2 relative after:block after:pt-[100%] before:block before:w-full before:h-full ${color} before:absolute before:top-16 ${imgRight ? "before:-left-16 " : "before:-right-16"}`}>
        <Image src={img.src} fill sizes="50vw" alt={img.alt} className="object-cover object-center"></Image>
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
