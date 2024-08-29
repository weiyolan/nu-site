import "../../globals.css";

import Navbar from "@/components/Navbar";
import NuLogoBackground from "@/components/NuLogoBackground";

import { getBannerInfo, getFooterInfo, getFooterLists, getNavbarInfo, localeType } from "@/sanity/lib/interface";
import Footer from "@/components/Footer";
// import { getUserAuth } from "@/lib/auth/utils";


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
  // const session = await getUserAuth();
  return (
    <div>
      <NuLogoBackground />
      <header>
        {/* <Navbar locale={locale} session={session} navbarInfo={navbarInfo} enabled={enabled} messages={messages} /> */}
      </header>
      <main className="relative">{children}</main>
      <Footer footerInfo={footerInfo} footerLists={footerLists.footerLists} locale={locale} className="" />
    </div>

  );
}
