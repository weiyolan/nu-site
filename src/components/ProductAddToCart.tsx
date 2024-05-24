"use client";
import { Button } from "./ui/button";
import Link from "next/link";
import { ChevronRight, PlusIcon, ShoppingCart } from "lucide-react";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";
import { altImageType, buttonType, localeType } from "@/sanity/lib/interface";
import ConditionalLink from "./ConditionalLink";
import { useShoppingCart } from "use-shopping-cart";
import { Product } from "use-shopping-cart/core";
import { toast } from "sonner";

export default function AddToCartButton({ product, locale }: { product: Product; locale: localeType }) {
  // let Cmp: React.ElementType = type === "title" || type === "shopTitle" ? "div" : "link";
  const { addItem } = useShoppingCart();

  function handleClick(product: Product) {
    console.log(product);
    addItem(product);
    toast.success(product.name + " added to cart.");
  }

  return (
    <Button className="group/button2 flex-1 w-0 min-w-fit" onClick={() => handleClick(product)}>
      {/* group-hover:opacity-100  transition-all duration-300 opacity-20 */}
      {/* <Link className="" href={`/shop/${slug.current}`}> */}
      {/* <span className="group-hover/button2:w-fit w-0 group-hover/button2:transition-all inline-block duration-300 overflow-hidden"> */}
      {locale === "fr" ? "Ajouter" : "Add"}
      {/* </span>{" "} */}
      {/* <ShoppingCart /> */}
      {/* </Link> */}
    </Button>
  );
}

// product:{slug, title,description},
