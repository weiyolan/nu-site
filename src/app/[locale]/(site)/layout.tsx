import "../../globals.css";
import type { Metadata } from "next";
import { Corben, Mulish } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import TrpcProvider from "@/lib/trpc/Provider";
import { cookies } from "next/headers";
import Navbar from "@/components/Navbar";
import NuLogoBackground from "@/components/NuLogoBackground";

import { getBannerInfo, getFooterInfo, getFooterLists, getNavbarInfo, localeType } from "@/sanity/lib/interface";
import Footer from "@/components/Footer";
import ShoppingCard from "@/components/navShoppingCard";
import { TooltipProvider } from "@/components/ui/tooltip";
// const inter = Inter({ subsets: ["latin"] });

const corben = Corben({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-corben" });
const mulish = Mulish({ subsets: ["latin"], variable: "--font-mulish" });

export const metadata: Metadata = {
  title: "Nu Soins | Pour corps et nature",
  description: "Shampoings solides à base de levure de bière",
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
  const { enabled, messages } = await getBannerInfo();
  const navbarInfo = await getNavbarInfo();
  const footerInfo = await getFooterInfo();
  const footerLists = await getFooterLists();

  return (
    <html lang={locale}>
      <body className={`${corben.variable} ${mulish.variable} font-mulish relative`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>
            {/* disableTransitionOnChange */}
            <TrpcProvider cookies={cookies().toString()}>
              <div style={{}} className={`w-full relative `}>
                <NuLogoBackground />
                <Navbar locale={locale} navbarInfo={navbarInfo} enabled={enabled} messages={messages} />
                {/* <pre>{JSON.stringify(footerLists, null, 2)}</pre> */}
                {children}
                <Footer footerInfo={footerInfo} footerLists={footerLists.footerLists} locale={locale} className="" />
                {/* <svg className="w-full hidden">
                  <filter id="noiseFilter">
                    <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch" />
                    <feColorMatrix in="colorNoise" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0" />
                    <feComposite operator="in" in2="SourceGraphic" result="monoNoise" />
                    <feBlend in="SourceGraphic" in2="monoNoise" mode="screen" />
                  </filter>
                </svg> */}
              </div>
            </TrpcProvider>
            <Toaster />
            <SonnerToaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
