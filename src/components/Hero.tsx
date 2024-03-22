import { cn } from "@/lib/utils";
import Image from "next/image";
import Typography from "./Typography";
import { Button } from "./ui/button";
import Link from "next/link";
// import { PropsWithChildren } from "react";
export interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  text: string;
  link: string;
  button: string;
  increasedContrast?: boolean;
}

export default function Hero({ src, alt, text, button, link, increasedContrast, children, className, ...props }: HeroProps) {
  return (
    <div className={cn("w-full h-screen relative overflow-x-hidden ", className)} {...props}>
      <Image priority src={src} fill sizes="100vw" alt={alt} className="object-cover object-center "></Image>
      <div className="absolute top-2/3 md:top-1/2 ml-6 sm:ml-12 md:ml-24 ">
        {increasedContrast && <div className="rounded-full w-64 h-64 absolute blur-3xl bg-white/50 -right-12 top-0"></div>}
        <Typography variant="h1" className="relative whitespace-pre-wrap leading-normal">
          {text}
        </Typography>
        <Button asChild className="relative">
          <Link href={link}>{button}</Link>
        </Button>
      </div>
      {children}
    </div>
  );
}
