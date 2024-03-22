import { cn } from "@/lib/utils";
import Typography from "./Typography";
import Section from "./Section";
import { Button } from "./ui/button";

export interface AboutBrefProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function AboutBref({ children, className, ...props }: AboutBrefProps) {
  return (
    <div className={cn("w-full ", className)} {...props}>
      <div className="bg-nu-blue w-[120%] -ml-[10%] overflow-hidden  ">
        <Section className="mt-0">
          <span className="text-[15rem] leading-[0.88] font-corben text-nu-beige block mt-4 ">Bref.</span>
        </Section>
      </div>

      <div className={cn("flex w-full gap-32 text-right mt-8 pb-16", className)} {...props}>
        <div className={`flex-1 flex flex-col justify-center gap-6 `}>
          <Typography variant={"h2"} className="">
            Prêt à essayer NU?
          </Typography>
          <Typography variant={"p"} className="whitespace-pre-wrap">
            {
              "Alors, prêts à rejoindre l'aventure NU, où l'art, la science et la nature se rencontrent pour créer quelque chose de vraiment spécial ? Essayez mon shampoing solide, et comme moi, vous allez l'adorer. Vos cheveux vous remercieront, et la planète aussi !"
            }
          </Typography>
          <Button className="w-fit ml-auto">Essayer maintenant</Button>
        </div>
        <div className={`flex-1 w-1/2 relative h-80`}>
          <div className="w-80 h-80 absolute bg-nu-green top-0 -translate-y-24 right-0"></div>
          <div className="w-80 h-80 absolute bg-nu-purple bottom-0 translate-y-24"></div>
          {/* <Image src={img.src} fill sizes="50vw" alt={img.alt} className="object-cover object-center"></Image> */}
        </div>
      </div>
    </div>
  );
}
