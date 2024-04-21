import Navbar from "@/components/ProfileNavbar";
import Sidebar from "@/components/Sidebar";

import "../../globals.css";
import type { Metadata } from "next";
import { Corben, Mulish } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import TrpcProvider from "@/lib/trpc/Provider";
import { cookies } from "next/headers";
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
              <div className="flex h-screen">
                <Sidebar />
                <main className="flex-1 md:p-8 pt-2 p-8 overflow-y-auto">
                  <Navbar />
                  {children}
                </main>
                {/* <Footer footerInfo={footerInfo} footerLists={footerLists.footerLists} locale={locale} className="" /> */}
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
