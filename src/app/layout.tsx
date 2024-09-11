import "./globals.css";
import type { Metadata } from "next";
import { Corben, Mulish } from "next/font/google";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import TrpcProvider from "@/lib/trpc/Provider";
import { cookies } from "next/headers";

import { localeType } from "@/sanity/lib/interface";
import { TooltipProvider } from "@/components/ui/tooltip";

import CartProvider from "@/components/shoppingCart/CartProvider";
const corben = Corben({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-corben" });
const mulish = Mulish({ subsets: ["latin"], variable: "--font-mulish" });

export const metadata: Metadata = {
  metadataBase: new URL("https://nu-soins.com"),
};

export async function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }];
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: localeType };
}>) {
  return (
    <html lang={locale}>
      <body className={`${corben.variable} ${mulish.variable} font-mulish relative`}>
        {/* <CartProvider> */}
        {/* <TrpcProvider cookies={cookies().toString()}> */}
        <TooltipProvider>{children}</TooltipProvider>
        {/* <SonnerToaster /> */}
        {/* </TrpcProvider> */}
        {/* </CartProvider> */}
      </body>
    </html>
  );
  2;
}
