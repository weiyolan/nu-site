import { checkAuth } from "@/lib/auth/utils";
import "../../globals.css";
// import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { localeType } from "@/sanity/lib/interface";
export default async function AppLayout({ children, params: { locale } }: { children: React.ReactNode; params: { locale: localeType } }) {
  await checkAuth();
  return (
    <main>
      <div className="flex h-screen">
        <Sidebar locale={locale} />
        <main className="flex-1 lg:p-10 lg:pt-8 p-8 pt-6 overflow-y-auto">
          {/* <Navbar /> */}
          {children}
        </main>
      </div>

      {/* <Toaster richColors /> */}
    </main>
  );
}
