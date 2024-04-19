import type { Metadata } from "next";
// import { Corben, Inter, Mulish } from "next/font/google";
import "../globals.css";
// import { ThemeProvider } from "@/components/ThemeProvider";
// import { Toaster } from "@/components/ui/toaster";
// import TrpcProvider from "@/lib/trpc/Provider";
// import { cookies } from "next/headers";
// import Navbar from "@/components/Navbar";
// import NuLogoBackground from "@/components/NuLogoBackground";

// const inter = Inter({ subsets: ["latin"] });

// const corben = Corben({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-corben" });
// const mulish = Mulish({ subsets: ["latin"], variable: "--font-mulish" });

export const metadata: Metadata = {
  title: "Nu Studio | Pour corps et nature",
  description: "Shampoings solides à base de levure de bière",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={``}>
        {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange> */}
        {/* <TrpcProvider cookies={cookies().toString()}> */}
        <div className="w-full min-h-screen relative">
          {/* <NuLogoBackground /> */}
          {/* <Navbar /> */}
          {children}
        </div>
        {/* </TrpcProvider> */}
        {/* <Toaster /> */}
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
