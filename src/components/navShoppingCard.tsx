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

export interface ShoppingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  locale: localeType;
}

export default function ShoppingCard({ children, className, locale, ...props }: ShoppingCardProps) {
  return (
    <Sheet key={"right"}>
      <SheetTrigger className=" " asChild>
        <Button className=" bg-transparent border-transparent" variant="outline">
          <ShoppingBasketIcon className="w-6 h-6" />
        </Button>
      </SheetTrigger>
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
