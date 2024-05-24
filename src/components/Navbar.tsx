"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import NuLogo from "./NuLogo";
import { useEffect, useState } from "react";
import Section from "./Section";
import LucideIcon from "./LucideIcon";
import { altImageType, colorSanityType, getColor, localeStringType, localeType } from "@/sanity/lib/interface";
import Image from "next/image";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import Typography from "./Typography";
import ShoppingCart from "./shoppingCart/ShoppingCart";
import LanguageToggle from "./navLanguageToggle";
import UserButton from "./navUserButton";

// import { Button } from "@/registry/new-york/ui/button"
// import { Input } from "@/registry/new-york/ui/input"
// import { Label } from "@/registry/new-york/ui/label"
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetDescription,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/registry/new-york/ui/sheet"

export interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  locale: localeType;
  navbarInfo: {
    logoToggle: boolean;
    links: (
      | { _type: "navigationButtonTrigger"; title: localeStringType; url: string }
      | {
          _type: "navigationButtonComplex";
          url: string;
          title: localeStringType;
          color: colorSanityType;
          altImage: altImageType;
          links: { title: localeStringType; description: localeStringType; url: string }[];
        }
    )[];
  };
  enabled: boolean;
  messages: { icon: { name: string }; text: localeStringType }[];
}
export default function Navbar({ navbarInfo: { logoToggle, links }, locale, enabled, messages }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let scrollLimit = 10;
    // let scrollLimit = window.innerHeight * 0.3;
    function onScroll() {
      if (window.scrollY > scrollLimit && !scrolled) {
        setScrolled(true);
      } else if (window.scrollY < scrollLimit && scrolled) {
        setScrolled(false);
      }
    }
    onScroll();
    document.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, [scrolled]);

  return (
    <nav className={`w-screen lg:pr-[12px] fixed top-0 z-10 transition-all duration-300 ${scrolled ? "bg-nu-beige shadow-lg" : "bg-transparent"} `}>
      {enabled && (
        <div className={cn(`w-full bg-nu-black text-nu-white text-sm transition-all duration-300 `, false && `${scrolled ? "opacity-0 h-0 " : "opacity-100 h-6"} `)}>
          <Section className={cn(`mt-0 md:mt-0 h-full `, false && `${scrolled ? " delay-300 invisible" : " visible"}`)}>
            <ul
              style={{ "--values-amount": messages.length, "--values-width": `calc(${200 + 0}px + ${25}vw)` }} //width of space-x css
              className="animate-slide md:animate-slideSlow flex justify-between items-center space-x-8 md:space-x-[25vw]">
              {[...messages, ...messages].map((message, i) => {
                return (
                  <li key={`${i}-${message.text?.[locale]}`} className="align-middle flex-none w-[200px]">
                    <LucideIcon name={message.icon.name} className="size-4 inline-block mb-0.5" /> {message.text?.[locale]}
                  </li>
                );
              })}
            </ul>
          </Section>
        </div>
      )}
      <div className="max-w-7xl mx-auto relative">
        <NavigationMenu className="mx-auto hidden md:flex ">
          <NavigationMenuList className="">
            {links.slice(0, 2).map((link, i) => {
              return link._type === "navigationButtonTrigger" ? (
                <NavigationMenuItem key={`item-${i}`}>
                  <Link href={link.url} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        `transition-all duration-300 font-mulish uppercase bg-transparent ${scrolled ? "font-semibold" : "font-bold"} min-w-24 lg:min-w-36 text-center`
                      )}>
                      {link.title?.[locale]}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={`item-${i}`} className="">
                  <Link href={link.url} legacyBehavior passHref className="">
                    <NavigationMenuLink>
                      <NavigationMenuTrigger
                        className={`transition-all duration-300 font-mulish uppercase bg-transparent ${scrolled ? "font-semibold" : "font-bold"} min-w-24 lg:min-w-36 text-center`}>
                        {link.title?.[locale]}
                      </NavigationMenuTrigger>
                    </NavigationMenuLink>
                  </Link>
                  <NavigationMenuContent className="">
                    <ul className="grid  gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild className="">
                          <Link
                            className={cn(
                              "flex relative h-full w-full select-none flex-col justify-end rounded-md bg-nu-yellow p-6 no-underline outline-none focus:shadow-md",
                              getColor(link.color)
                            )}
                            href={link.links[0].url}>
                            <Image
                              alt={link.altImage.alt?.[locale]}
                              fill
                              blurDataURL={link.altImage.image.metadata.lqip}
                              placeholder="blur"
                              className="object-cover "
                              src={link.altImage.image.url}
                            />
                            <div className="absolute z-0 top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent to-nu-white/60 "></div>
                            <NuLogo className="h-6 w-6 relative" />
                            <div className="mb-2 mt-4 text-lg font-corben relative">{link.links[0].title?.[locale]}</div>
                            <p className="text-sm leading-tight text-muted-foreground font-mulish relative">{link.links[0].description?.[locale]}</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      {link.links.slice(1).map((linkSimple, i) => (
                        <ListItem key={`subItem-${i}`} title={linkSimple.title?.[locale]} href={linkSimple.url} className="">
                          {linkSimple.description?.[locale]}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            })}

            {logoToggle && (
              <NavigationMenuItem className={``}>
                <Link href="/" title={locale === "en" ? "Go to main page" : "Aller à l'accueil"} legacyBehavior passHref>
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent h-fit p-1 px-4")}>
                    <NuLogo className={`transition-all duration-300 ${scrolled ? "size-6" : "size-8"} `}></NuLogo>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )}

            {links.slice(2).map((link, i) => {
              return link._type === "navigationButtonTrigger" ? (
                <NavigationMenuItem key={`item-${i + 2}`}>
                  <Link href={link.url} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        `transition-all duration-300 font-mulish uppercase bg-transparent ${scrolled ? "font-semibold" : "font-bold"} min-w-24 lg:min-w-36 text-center`
                      )}>
                      {link.title?.[locale]}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={`item-${i + 2}`}>
                  <Link href={link.url} legacyBehavior passHref>
                    <NavigationMenuLink>
                      <NavigationMenuTrigger
                        className={`transition-all duration-300 font-mulish uppercase bg-transparent ${scrolled ? "font-semibold" : "font-bold"} min-w-24 lg:min-w-36 text-center`}>
                        {link.title?.[locale]}
                      </NavigationMenuTrigger>
                    </NavigationMenuLink>
                  </Link>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className={cn(
                              "flex relative h-full w-full select-none flex-col justify-end rounded-md bg-nu-yellow p-6 no-underline outline-none focus:shadow-md",
                              getColor(link.color)
                            )}
                            href={link.links[0].url}>
                            {/* <Image src="/about_transparent.jpg" className="object-cover relative " fill alt="" /> */}
                            <Image
                              alt={link.altImage.alt?.[locale]}
                              fill
                              blurDataURL={link.altImage.image.metadata.lqip}
                              placeholder="blur"
                              className="object-cover"
                              src={link.altImage.image.url}
                            />
                            <div className="absolute z-0 top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent to-white/50 "></div>
                            <NuLogo className="h-6 w-6 relative" />
                            <div className="mb-2 mt-4 text-lg font-corben relative">{link.links[0].title?.[locale]}</div>
                            <p className="text-sm leading-tight text-muted-foreground font-mulish relative">{link.links[0].description?.[locale]}</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      {link.links.slice(1).map((linkSimple, i) => (
                        <ListItem key={`subItem-${i}`} title={linkSimple.title?.[locale]} href={linkSimple.url}>
                          {linkSimple.description?.[locale]}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <Sheet key={"left"}>
          <SheetTrigger className="ml-auto" asChild>
            <Button className="ml-auto md:hidden bg-transparent border-transparent" variant="outline">
              <LucideIcon className=" w-6 h-6" name="lucide:menu" />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle>
                <SheetClose asChild>
                  <Link href="/" title="">
                    <NuLogo className="mx-auto " />
                  </Link>
                </SheetClose>
              </SheetTitle>
              <SheetDescription>{locale === "fr" ? "Bienvenue chez Nu." : "Welcome at Nu."}</SheetDescription>
            </SheetHeader>
            <ol className="space-y-2 mt-12 text-left">
              {links.map((link, i) => {
                return link._type === "navigationButtonTrigger" ? (
                  <li key={`item-${i}`}>
                    <SheetClose asChild>
                      <Link href={link.url}>
                        <Typography variant={"h3"} className="p-1 hover:bg-nu-blue/20">
                          {link.title?.[locale]}
                        </Typography>
                      </Link>
                    </SheetClose>
                  </li>
                ) : (
                  <div key={`item-${i}`}>
                    <SheetClose asChild>
                      <Link href={link.url}>
                        <Typography variant={"h3"} className="p-1 hover:bg-nu-blue/20">
                          {link.title?.[locale]}
                        </Typography>
                      </Link>
                    </SheetClose>
                    {link.links.map((linkSimple, i) => (
                      <li key={`subItem-${i}`}>
                        {" "}
                        <SheetClose asChild>
                          <Button variant={"outline"} asChild>
                            <Link title={linkSimple.title?.[locale]} href={linkSimple.url}>
                              {linkSimple.title?.[locale]}
                            </Link>
                          </Button>
                        </SheetClose>
                      </li>
                    ))}
                  </div>
                );
              })}
            </ol>
          </SheetContent>
        </Sheet>

        <div className="top-0 ml-auto absolute right-0 md:right-[17px] flex ">
          {/* top-[20.5px] */}
          <UserButton scrolled={scrolled} locale={locale} />
          <LanguageToggle scrolled={scrolled} locale={locale} />
          <ShoppingCart scrolled={scrolled} locale={locale} />
        </div>
      </div>
    </nav>
  );
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}>
          <div className="text-base font-medium leading-none font-corben">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground font-mulish">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
