import "../../globals.css";
// import { Corben, Mulish } from "next/font/google";
// import { ThemeProvider } from "@/components/ThemeProvider";
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as SonnerToaster } from "@/components/ui/sonner";
// import TrpcProvider from "@/lib/trpc/Provider";
// import { cookies } from "next/headers";
import Navbar from "@/components/Navbar";
import NuLogoBackground from "@/components/NuLogoBackground";

import { getBannerInfo, getFooterInfo, getFooterLists, getNavbarInfo, localeType } from "@/sanity/lib/interface";
import Footer from "@/components/Footer";
import { AuthSession, getUserAuth } from "@/lib/auth/utils";
// import ShoppingCard from "@/components/ShoppingCard";
// import { TooltipProvider } from "@/components/ui/tooltip";
// const inter = Inter({ subsets: ["latin"] });

export default async function Site({
  children,
  // locale,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: localeType };
}>) {
  const { enabled, messages } = await getBannerInfo();
  const navbarInfo = await getNavbarInfo();
  const footerInfo = await getFooterInfo();
  const footerLists = await getFooterLists();
  const session = await getUserAuth();
  return (
    // <html lang={locale}>
    // <body className={`${corben.variable} ${mulish.variable} font-mulish relative`}>
    // {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange> */}
    // <TooltipProvider>
    // {/* <TrpcProvider cookies={cookies().toString()}> */}
    <div>
      <NuLogoBackground />
      <header>
        <Navbar locale={locale} session={session} navbarInfo={navbarInfo} enabled={enabled} messages={messages} />
      </header>

      <main className="relative">{children}</main>
      <Footer footerInfo={footerInfo} footerLists={footerLists.footerLists} locale={locale} className="" />

      {/* <pre>{JSON.stringify(footerLists, null, 2)}</pre> */}
      {/* <svg className="w-full hidden">
                  <filter id="noiseFilter">
                    <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch" />
                    <feColorMatrix in="colorNoise" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0" />
                    <feComposite operator="in" in2="SourceGraphic" result="monoNoise" />
                    <feBlend in="SourceGraphic" in2="monoNoise" mode="screen" />
                  </filter>
                </svg> */}
      {/* </TrpcProvider> */}
    </div>
    // </TooltipProvider>
    // {/* </ThemeProvider> */}
    // </body>
    // </html>
  );
}
