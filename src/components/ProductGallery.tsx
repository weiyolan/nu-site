"use client";
import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import Image from "next/image";

export default function ProductGallery({images}) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <>
      <Carousel setApi={setApi} opts={{ loop: true }} className="sticky top-24 ml-8  ">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6 relative h-full w-full">
                  {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                    <Image placeholder="blur" blurDataURL={image.image.metadata.lqip} alt={image.alt.fr} src={image.image.url} sizes='50vw' fill className="object-cover"></Image>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="w-full flex gap-4 justify-center items-center ">
          <CarouselPrevious className="relative translate-x-0 left-0 translate-y-0 " />
          <div className="py-4 text-center text-xs text-muted-foreground">
            {current} / {count}
          </div>
          <CarouselNext className="relative translate-x-0 right-0 translate-y-0 " />
        </div>
      </Carousel>
    </>
  );
}
