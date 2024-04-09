import * as React from "react";
import { cn } from "@/lib/utils";
import Typography from "./Typography";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Button } from "./ui/button";
import Stars from "./Stars";
import Quote from "./Quote";

export interface ReviewsProps extends React.HTMLAttributes<HTMLInputElement> {
  reviews: {
    citationsOn: boolean;
    title: { en: string; fr: string };
    description: { en: string; fr: string };
  };
}

export default function Reviews({ reviews: { title, description, citationsOn }, children, className, ...props }: ReviewsProps) {
  return (
    <div className={cn("text-center mx-auto", className)} {...props}>
      <Typography variant="h2" className="text-center">
        {title.fr}
      </Typography>
      <Typography variant="p" affects="subTitle" className="text-center max-w-prose mx-auto text-balance">
        {description.fr}
      </Typography>

      {citationsOn ? (
        <Carousel
          opts={{
            loop: true,
          }}
          className="w-[90%] mx-auto mt-8">
          <CarouselContent className="-ml-4 ">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="pl-2 md:basis-1/2 lg:basis-1/3">
                <div className="px-4">
                  <Card className="text-center bg-card/0 border-transparent shadow-none group">
                    <CardContent className=" space-y-4 relative p-0 px-2">
                      <Quote className="opacity-10 left-8 group-hover:opacity-30 transition-opacity duration-150" />
                      <Typography className="mt-0 text-balance" variant={"p"} affects={"large"}>
                        The React Framework - created and maintained by @vercelThe React Framework - created and maint ain ed by @vercel
                      </Typography>
                      <Stars className="" rating={0.8} />
                      <Typography className="text-sm text-muted-foreground" variant={"p"}>
                        @user123
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:inline-flex" />
          <CarouselNext className="hidden md:inline-flex" />
        </Carousel>
      ) : (
        <>
          <Stars className="text-xl mx-auto mt-6 mb-4" large rating={4.8 / 5} />
          <Typography variant={"h3"} className="">
            {`${35} avis sur nos produits`}
          </Typography>
        </>
      )}
    </div>
  );
}
