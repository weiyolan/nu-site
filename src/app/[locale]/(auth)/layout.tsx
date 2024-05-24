import { getUserAuth } from "@/lib/auth/utils";
import { redirect } from "next/navigation";
import "../../globals.css";
import { localeType } from "@/sanity/lib/interface";

export default async function AuthLayout({ children, params: { locale } }: { children: React.ReactNode; params: { locale: localeType } }) {
  const session = await getUserAuth();
  if (session?.session) redirect("/account");

  return <div className="bg-muted h-screen pt-8">{children}</div>;
}
