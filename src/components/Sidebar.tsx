import Link from "next/link";

import SidebarItems, { SidebarItemsMobile } from "./SidebarItems";
import { Avatar, AvatarFallback } from "./ui/avatar";

import { AuthSession, getUserAuth } from "@/lib/auth/utils";
import NuLogo from "./NuLogo";
import { localeType } from "@/sanity/lib/interface";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import LucideIcon from "./LucideIcon";
import Typography from "./Typography";
import AuthForm from "./auth/Form";

const Sidebar = async ({ locale }: { locale: localeType }) => {
  const session = await getUserAuth();
  if (session.session === null) return null;

  return (
    <aside className="h-screen w-0 md:min-w-60 bg-muted md:block md:p-4 pt-8 border-r border-border shadow-inner">
      <div className="hidden md:flex flex-col justify-between h-full">
        <div className="space-y-4">
          <Link href="/" title={locale === "en" ? "Go to homepage" : "Naviger vers la page acceuil"}>
            <NuLogo className="ml-2" />
          </Link>
          <SidebarItems />
        </div>
        <AuthForm action="/api/sign-out" className="mt-auto mb-4" />
        <UserDetails session={session} />
      </div>

      <Sheet key={"left"}>
        <SheetTrigger className="mr-auto" asChild>
          <Button className="mr-auto md:hidden  border-transparent absolute top-2" variant="outline">
            <LucideIcon className=" w-6 h-6" name="lucide:menu" />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"} className="flex flex-col justify-start">
          <SheetHeader className="mb-2">
            <SheetTitle>
              <SheetClose asChild>
                <Link href="/" title={locale === "en" ? "Go to homepage" : "Naviger vers la page acceuil"}>
                  <NuLogo className="mx-auto " />
                </Link>
              </SheetClose>
            </SheetTitle>
            <SheetDescription>{locale === "fr" ? "Bienvenue dans votre compte." : "Welcome in your account."}</SheetDescription>
          </SheetHeader>
          <SidebarItemsMobile />
          <SheetFooter className="flex-col mt-auto flex">
            <AuthForm action="/api/sign-out" className=" mb-4" />
            <UserDetails session={session} />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </aside>
  );
};

export default Sidebar;

const UserDetails = ({ session }: { session: AuthSession }) => {
  if (session.session === null) return null;
  const { user } = session.session;

  if (!user?.name || user.name.length == 0) return null;

  return (
    <Link href="/account">
      <div className="flex items-center justify-between w-full border-t border-border pt-4 px-2">
        <div className="text-muted-foreground">
          <p className="text-xs">{user.name ?? "John Doe"}</p>
          <p className="text-xs font-light pr-4">{user.email ?? "john@doe.com"}</p>
        </div>
        {/* <Avatar className="h-10 w-10">
          <AvatarFallback className="border-border border-2 text-muted-foreground">
            {user.name
              ? user.name
                  ?.split(" ")
                  .map((word) => word[0].toUpperCase())
                  .join("")
              : "~"}
          </AvatarFallback>
        </Avatar> */}
      </div>
    </Link>
  );
};
