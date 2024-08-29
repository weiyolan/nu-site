"use client";
import React, { ReactNode } from "react";
import { DebugCart, CartProvider as ShoppingCartProvider } from "use-shopping-cart";
// import * as config from "../../config";
import { env } from "@/lib/env.mjs";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CartProvider = ({ children }: { children: ReactNode }) => (
  <ShoppingCartProvider cartMode="checkout-session" stripe={env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY} currency={"eur"} shouldPersist={true} persistKey="nu-soins-cart">
    {children}
    {/* <DebugCart /> */}
  </ShoppingCartProvider>
);

export default CartProvider;
