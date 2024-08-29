"use client";
// import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { localeType } from "@/sanity/lib/interface";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  // navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
// import { Avatar, AvatarFallback } from "./ui/avatar";
import { AuthSession } from "@/lib/auth/utils";
import { User2Icon } from "lucide-react";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { SelectGroup, SelectLabel } from "@radix-ui/react-select";
// import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
export interface UserButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  locale: localeType;
  scrolled: boolean;
  session: AuthSession;
}
import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

// import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import Typography from "./Typography";
import Link from "next/link";
import AuthForm from "./auth/Form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
// import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

// type Checked = DropdownMenuCheckboxItemProps["checked"];

export default function UserButton({ children, className, locale, session, scrolled, ...props }: UserButtonProps) {
  // if (session.session === null) return null;
  // console.log(session);

  return (
    // <Tooltip>
    //   <TooltipTrigger asChild>
    //     <Button asChild className="bg-transparent border-transparent p-3" variant="outline">
    //       <Link href="/account">
    //         <User2Icon className={`size-6 sm:size-5 transition-all ${scrolled ? "stroke-[1.5]" : "stroke-2"}`} />
    //       </Link>
    //     </Button>
    //   </TooltipTrigger>
    //   <TooltipContent className="mr-1.5">
    //     <UserDetails session={session} locale={locale} />
    //     {/* <p>{locale === "en" ? "Go to account" : "Vers votre compte"}</p> */}
    //   </TooltipContent>
    // </Tooltip>

    // <Popover>
    //   <PopoverTrigger asChild>
    //     <Button className="bg-transparent border-transparent p-3" variant="outline">
    //       <User2Icon className={`size-6 sm:size-5 transition-all ${scrolled ? "stroke-[1.5]" : "stroke-2"}`} />
    //     </Button>
    //   </PopoverTrigger>
    //   <PopoverContent className="mr-2 w-80">
    //     <UserDetails locale={locale} session={session} />
    //   </PopoverContent>
    // </Popover>
    <NavigationMenu className="mx-auto flex ">
      <NavigationMenuList className="">
        <NavigationMenuItem className="">
          <Link href={"/account"} legacyBehavior passHref className="">
            <NavigationMenuLink>
              <NavigationMenuTrigger
                className={`transition-all duration-300 font-mulish uppercase bg-transparent ${scrolled ? "font-semibold" : "font-bold"} p-3 text-center [&>svg:nth-child(2)]:hidden`}>
                <User2Icon className={`size-6 sm:size-5 transition-all ${scrolled ? "stroke-[1.5]" : "stroke-2"}`} />
              </NavigationMenuTrigger>
            </NavigationMenuLink>
          </Link>
          <NavigationMenuContent className="">
            <UserDetails locale={locale} session={session} />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const UserDetails = ({ session, locale }: { session: AuthSession; locale: localeType }) => {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl ">{`${locale == "en" ? "Welcome" : "Bienvenue"} ${session?.user?.name ? `${session?.user?.name}!` : ``}`}</CardTitle>
        <CardDescription className="whitespace-nowrap ">{locale == "en" ? "Ready for a beautiful day?" : `Prêt(e) pour une belle journée?`}</CardDescription>
      </CardHeader>
      <CardContent>
        {session && (
          <Button asChild>
            <Link href="/account">
              <div className="">{locale == "en" ? "Go to your account" : "Vers votre compte"}</div>
            </Link>
          </Button>
        )}
        {session ? (
          <AuthForm className="" action={"/api/sign-out"} />
        ) : (
          <Button asChild>
            <Link href="/account">
              <div className="">{locale == "en" ? "Sign in" : "Connéxion"}</div>
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
