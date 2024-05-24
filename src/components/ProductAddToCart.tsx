"use client";
import { Button, ButtonProps } from "./ui/button";
import Link from "next/link";
import { ChevronRight, PlusIcon, ShoppingCart } from "lucide-react";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";
import { altImageType, buttonType, localeType } from "@/sanity/lib/interface";
import ConditionalLink from "./ConditionalLink";
import { useShoppingCart } from "use-shopping-cart";
import { Product } from "use-shopping-cart/core";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
export default function AddToCartButton({
  product,
  locale,
  className,
  children,
}: { product: Product; locale: localeType } & ButtonProps & React.HTMLAttributes<HTMLButtonElement>) {
  // let Cmp: React.ElementType = type === "title" || type === "shopTitle" ? "div" : "link";
  const { addItem } = useShoppingCart();

  function handleClick(product: Product) {
    // console.log(product);
    addItem(product);
    toast.success(product.name + " added to cart.");
  }

  return (
    <Button className={className} onClick={() => handleClick(product)}>
      {/* group-hover:opacity-100  transition-all duration-300 opacity-20 */}
      {/* <Link className="" href={`/shop/${slug.current}`}> */}
      {/* <span className="group-hover/button2:w-fit w-0 group-hover/button2:transition-all inline-block duration-300 overflow-hidden"> */}
      {children}
      {/* </span>{" "} */}
      {/* <ShoppingCart /> */}
      {/* </Link> */}
    </Button>
  );
}

// product:{slug, title,description},
