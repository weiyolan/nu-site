import "./globals.css";
import type { Metadata } from "next";
import { Corben, Mulish } from "next/font/google";
// import { ThemeProvider } from "@/components/ThemeProvider";
// import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import TrpcProvider from "@/lib/trpc/Provider";
import { cookies } from "next/headers";
// import Navbar from "@/components/Navbar";
// import NuLogoBackground from "@/components/NuLogoBackground";

import { localeType } from "@/sanity/lib/interface";
// import Footer from "@/components/Footer";
// import ShoppingCard from "@/components/navShoppingCard";
import { TooltipProvider } from "@/components/ui/tooltip";

// import { DebugCart } from "use-shopping-cart";
import CartProvider from "@/components/shoppingCart/CartProvider";
// import { getUserAuth } from "@/lib/auth/utils";
const corben = Corben({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-corben" });
const mulish = Mulish({ subsets: ["latin"], variable: "--font-mulish" });
// import { env } from "@/lib/env.mjs";

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
        <CartProvider>
          <TrpcProvider cookies={cookies().toString()}>
            <TooltipProvider>
              {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
              {children}
              {/* </ThemeProvider> */}
            </TooltipProvider>
            {/* <Toaster /> */}
            <SonnerToaster
            // richColors
            />
            {/* <DebugCart /> */}
          </TrpcProvider>
        </CartProvider>
      </body>
    </html>
  );
  2;
}
