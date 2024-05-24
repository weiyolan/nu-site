import { checkAuth } from "@/lib/auth/utils";
import { Toaster } from "@/components/ui/sonner";
import "../../globals.css";
// import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import TrpcProvider from "@/lib/trpc/Provider";
import { cookies } from "next/headers";
import { localeType } from "@/sanity/lib/interface";
export default async function AppLayout({ children, params: { locale } }: { children: React.ReactNode; params: { locale: localeType } }) {
  await checkAuth();
  return (
    <main>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 md:p-8 pt-2 p-8 overflow-y-auto">
          {/* <Navbar /> */}
          {children}
        </main>
      </div>

      {/* <Toaster richColors /> */}
    </main>
  );
}
