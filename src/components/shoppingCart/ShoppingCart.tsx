// import { cn } from "@/lib/utils";
"use client";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
// import LucideIcon from "./LucideIcon";
import Link from "next/link";
// import NuLogo from "./NuLogo";
// import Typography from "./Typography";
// import { Label } from "./ui/label";
// import { Input } from "./ui/input";
import { localeType } from "@/sanity/lib/interface";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  Cross,
  DeleteIcon,
  MinusIcon,
  MoreVerticalIcon,
  PlusIcon,
  ShoppingBagIcon,
  ShoppingBasketIcon,
  ShoppingCartIcon,
  Trash2Icon,
  Truck,
  X,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
// import { ChevronLeft, ChevronRight, Copy, CreditCard, MoreVertical, Truck } from "lucide-react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
// import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { Product } from "use-shopping-cart/core";
import { useShoppingCart } from "use-shopping-cart";
import { Form } from "../ui/form";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import Typography from "../Typography";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Checkout } from "@/components/shoppingCart/Checkout";
import NuLogo from "../NuLogo";

export interface ShoppingCartProps extends React.HTMLAttributes<HTMLDivElement> {
  locale: localeType;
  scrolled: boolean;
}

export default function ShoppingCart({ children, className, scrolled, locale, ...props }: ShoppingCartProps) {
  const { cartDetails, cartCount = 0 } = useShoppingCart();

  const [itemAdded, setItemAdded] = useState(false);

  useEffect(() => {
    setItemAdded(true);

    const timer = setTimeout(() => setItemAdded(false), 3000);

    return () => clearTimeout(timer);
  }, [cartCount]);

  return (
    <Sheet key={"right"}>
      <Tooltip>
        <TooltipTrigger asChild>
          <SheetTrigger asChild>
            <Button className="bg-transparent border-transparent p-3" variant="outline">
              <ShoppingBasketIcon className={`size-6 sm:size-5 transition-all ${scrolled ? "stroke-[1.5]" : "stroke-2"}`} />

              <div className={`absolute top-0.5 right-0.5 rounded-full size-[16px] bg-nu-black ${itemAdded && "animate-ping"} ${cartCount > 0 ? "" : "hidden"}`}></div>
              <div
                className={`absolute top-0.5 right-0.5 rounded-full text-xs font-black bg-nu-blue size-[16px] border-nu-black border-[2px] shadow-sm text-center ${cartCount > 0 ? "" : "hidden"}`}>
                <span className="absolute center-left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">{cartCount}</span>
              </div>
            </Button>
          </SheetTrigger>
        </TooltipTrigger>
        <TooltipContent className="">
          <p>{locale === "en" ? "Open shopping cart" : "Ouvrir le panier"}</p>
        </TooltipContent>
      </Tooltip>

      <SheetContent side={"right"} className="w-full sm:max-w-lg overflow-auto  ">
        <SheetHeader>
          <SheetTitle>
            <ShoppingBasketIcon className="mx-auto " />
          </SheetTitle>
          <SheetDescription className="mx-auto">
            {cartCount > 0
              ? locale === "fr"
                ? `Votre panier contient ${cartCount} produit${cartCount === 1 ? "" : "s"}. C'est parti!`
                : `Your cart contains ${cartCount} item${cartCount === 1 ? "" : "s"}. Let's go!`
              : locale === "fr"
                ? `Votre panier est vide.`
                : `Your shopping cart is empty.`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 mt-8">
          {cartDetails && Object.keys(cartDetails).map((id) => <CartItem locale={locale} key={cartDetails[id].name} product={cartDetails[id]} />)}
          {/* {console.log(cartDetails)} */}
          <Separator className="bg-muted-foreground" />
          <CartSubtotal locale={locale} />
          <Separator className="bg-muted-foreground" />
          <CartTotal locale={locale} />
        </div>

        {/* <Separator className="bg-foreground" /> */}
        {/* FOOTER */}
        <SheetFooter>
          <SheetClose asChild>
            {cartCount === 0 ? (
              <Button asChild className="mt-6 mx-auto">
                <Link title={locale === "fr" ? "Aller au shop" : "To the shop"} href="/shop">
                  {locale === "fr" ? "Aller au shop" : "To the shop"}
                </Link>
              </Button>
            ) : (
              // <Button asChild className="mt-6 mx-auto ">
              //   <Link title={locale === "fr" ? "Commander" : "Checkout"} href="/checkout">
              //     {locale === "fr" ? "Commander" : "Checkout"}
              //   </Link>
              // </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="mt-6 mx-auto ">{locale === "fr" ? "Commander" : "Checkout"}</Button>
                </AlertDialogTrigger>

                <AlertDialogContent className="rlative max-w-[1200px] w-full max-h-[80vh] overflow-auto p-20">
                  <AlertDialogHeader className="mb-10 text-center mx-auto ">
                    <NuLogo className="size-10 mx-auto" />
                    <AlertDialogTitle className="font-normal font-corben text-3xl text-center">{locale === "fr" ? "Finalisez la commande" : "Checkout"}</AlertDialogTitle>
                    <AlertDialogDescription className="text-center">
                      {locale === "fr" ? "Merci de nous confiez pour le soin de vos cheveux!" : "Thanks for trusting us your hair care."}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <Checkout locale={locale} cartDetails={cartDetails} />
                  <AlertDialogCancel tabIndex={9000} className="absolute top-8 left-8 text-base  font-corben align-middle">
                    <ArrowLeft className="size-5 mr-1" /> Retour
                  </AlertDialogCancel>

                  {/* <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter> */}
                </AlertDialogContent>
              </AlertDialog>
            )}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function CartItem({ product, locale }: { product: Product; locale: localeType }) {
  const { incrementItem, decrementItem, setItemQuantity, removeItem, storeLastClicked } = useShoppingCart();
  return (
    <Card className=" hover:shadow-sm bg-card/0 shadow-none rounded-[--radius] hover:bg-card/30 border-none  transition-all duration-150">
      <CardContent className="relative flex p-2 bg-transparent border-none h-28 sm:h-28 items-start  gap-2  ">
        <Image alt={product.name} className=" p-2 object-contain size-24 rounded-[--radius] shrink-0" src={product.image + "?fit=clip&h=80&w=80"} width={80} height={80} />
        <div className="w-full h-full flex flex-col select-none">
          {/* <Link href={"nu-soins.com"}> */}
          {/* {console.log(product.product_data)} */}
          <CardTitle className="text-lg">{product.name}</CardTitle>
          <CardDescription style={{ overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, lineClamp: 2, WebkitBoxOrient: "vertical" }}>
            {product.description}
          </CardDescription>
          {/* </Link> */}
          <Button
            variant="ghost"
            size="icon"
            className=" h-6 w-fit p-1 gap-1 mt-auto"
            onClick={() => {
              removeItem(product.id);
            }}>
            <Trash2Icon className="size-4" /> {locale === "fr" ? "Supprimer" : "Remove"}
          </Button>
        </div>

        <div className="w-24 h-full shrink-0 flex flex-col relative justify-between">
          <Typography variant="h2" className="text-lg text-right">{`€ ${(product.value / 100).toFixed(2)}`}</Typography>
          <div className="w-full h-8 mt-auto rounded-[--radius] overflow-hidden flex border border-muted-foreground/50 items-center">
            <Button variant="outline" size="icon" className="h-full w-1/3 " disabled={product.quantity === 1} onClick={() => decrementItem(product.id)}>
              <MinusIcon className="size-4 h-auto" />
            </Button>
            <Separator orientation="vertical" className="bg-muted-foreground/50" />
            {/* <Form> */}
            <Input
              // type="number"
              min={1}
              value={product.quantity}
              onChange={(e) => {
                if (+e.target.value > 1) {
                  setItemQuantity(product.id, +e.target.value);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && product.quantity > 1) {
                  decrementItem(product.id);
                }
              }}
              className="h-full w-1/3 ring-0 active:ring-0 p-0 inline-flex text-center rounded-none font-bold font-mulish focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:underline"
            />
            {/* </Form> */}
            <Separator orientation="vertical" className="bg-muted-foreground/50" />
            <Button variant="outline" size="icon" className="h-full w-1/3" onClick={() => incrementItem(product.id)}>
              <PlusIcon className="size-4 h-auto" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CartSubtotal({ locale }: { locale: localeType }) {
  const { totalPrice } = useShoppingCart();
  return (
    <div className="p-6 bg- flex  flex-col gap-2 w-full  bg-card/0   ">
      <div className="flex justify-between w-full">
        <Typography variant={"p"} className="inline-block text-base text-muted-foreground">
          {locale === "en" ? "Subtotal" : "Sous-total"}
        </Typography>
        <Typography variant={"p"} className="inline-block text-base text-muted-foreground">
          {"€ " + (totalPrice / 120 ?? 0).toFixed(2)}
        </Typography>
      </div>
      <div className="flex justify-between w-full">
        <Typography variant={"p"} className="inline-block text-base text-muted-foreground">
          {locale === "en" ? "Shipping" : "Envoie"}
        </Typography>
        <Typography variant={"p"} className="text-right inline-block text-base text-muted-foreground">
          {totalPrice < 4000 ? "€ " + ((0 / 120) | 0).toFixed(2) : locale === "en" ? "Free!" : "Offert!"}

          <span
            className={`text-xs font-bold flex ${totalPrice < 4000 ? "" : "hidden"}`}>{`€ ${(40 - totalPrice / 100).toFixed(2)} ${locale === "en" ? "more for free shipping" : "plus pour envoie gratuit!"}`}</span>
        </Typography>
      </div>
      <div className="flex justify-between w-full">
        <Typography variant={"p"} className="inline-block text-base text-muted-foreground">
          {locale === "en" ? "VAT 20% (incl)" : "TVA 20% (inclu)"}
        </Typography>
        <Typography variant={"p"} className="inline-block text-base text-muted-foreground">
          {"€ " + (((totalPrice / 120) * 0.2) | 0).toFixed(2)}
        </Typography>
      </div>
    </div>
  );
}

function CartTotal({ locale }: { locale: localeType }) {
  const { totalPrice } = useShoppingCart();
  return (
    <div className="p-6 py-2 bg- flex  flex-col gap-2 w-full  bg-card/0   ">
      <div className="flex justify-between w-full">
        <Typography variant={"h3"} className="inline-block  ">
          {"Total"}
        </Typography>
        <Typography variant={"h3"} className="inline-block  ">
          {"€ " + (totalPrice / 100).toFixed(2)}
        </Typography>
      </div>
    </div>
  );
}
