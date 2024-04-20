import { cn } from "@/lib/utils";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import LucideIcon from "./LucideIcon";
import Link from "next/link";
import NuLogo from "./NuLogo";
import Typography from "./Typography";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { localeType } from "@/sanity/lib/interface";
import { ShoppingBagIcon, ShoppingBasketIcon, ShoppingCartIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface ShoppingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  locale: localeType;
  scrolled: boolean;
}

export default function ShoppingCard({ children, className, scrolled, locale, ...props }: ShoppingCardProps) {
  return (
    <Sheet key={"right"}>
      <Tooltip>
        <SheetTrigger asChild>
          <TooltipTrigger asChild>
            <Button className="bg-transparent border-transparent p-3" variant="outline">
              <ShoppingBasketIcon className={`size-5 transition-all ${scrolled ? "stroke-[1.5]" : "stroke-2"}`} />
            </Button>
          </TooltipTrigger>
        </SheetTrigger>
        <TooltipContent className="">
          <p>{locale === "en" ? "Open shopping cart" : "Ouvrir le panier"}</p>
        </TooltipContent>
      </Tooltip>
      <SheetContent side={"right"}>
        <SheetHeader>
          <SheetTitle>
            {/* <SheetClose asChild> */}
            <ShoppingBasketIcon className="mx-auto " />
            {/* </SheetClose> */}
          </SheetTitle>
          <SheetDescription className="mx-auto">{locale === "fr" ? "Votre panier est vide." : "Your shopping cart is empty."}</SheetDescription>
        </SheetHeader>

        <div className=" gap-4 py-4 hidden">
          {/* grid */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        {/* FOOTER */}
        <SheetFooter>
          <SheetClose asChild>
            <Button asChild className="mt-6 mx-auto" type="submit">
              <Link title={locale === "fr" ? "Aller au shop" : "To the shop"} href="/shop">
                {locale === "fr" ? "Aller au shop" : "To the shop"}
              </Link>
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
