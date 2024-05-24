"use client";
import { localeType } from "@/sanity/lib/interface";
import { Checkout } from "./Checkout";
import { useShoppingCart } from "use-shopping-cart";

export default function Page({ params: { locale } }: { params: { locale: localeType } }) {
  const { cartDetails } = useShoppingCart();
  return (
    <div className=" mt-32 h-fit  mx-auto -mb-24">
      <Checkout locale={locale} cartDetails={cartDetails} />
    </div>
  );
}
