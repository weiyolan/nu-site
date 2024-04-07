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
    function onScroll() {
      if (window.scrollY > window.innerHeight * 0.3 && !scrolled) {
        setScrolled(true);
      } else if (window.scrollY < window.innerHeight * 0.3 && scrolled) {
        setScrolled(false);
      }
    }
    onScroll();
    document.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, [scrolled]);

  return (
    <div className={`w-full  fixed top-0 z-10 transition-all duration-300 ${scrolled ? "bg-nu-beige shadow-lg" : "bg-transparent"} `}>
      {/* <TransitionBackground className="absolute top-0 left-0 bottom-0 right-0" /> */}
      {enabled && (
        <div className={cn(`w-full bg-nu-black text-nu-white text-sm transition-all duration-300 `, false && `${scrolled ? "opacity-0 h-0 " : "opacity-100 h-6"} `)}>
          <Section className={cn(`mt-0 md:mt-0 h-full`, false && `${scrolled ? " delay-300 invisible" : " visible"}`)}>
            <ul
              style={{ "--values-amount": messages.length, "--values-width": `${200 + 256}px` }} //width of space-x css
              className="animate-slide md:animate-slideSlow flex justify-between items-center space-x-8 md:space-x-64">
              {[...messages, ...messages].map((message, i) => {
                return (
                  <li key={`${i}-${message.text?.[locale]}`} className="align-middle flex-none w-[200px]">
                    <LucideIcon name={message.icon.name} className="size-4 inline-block mb-0.5" /> {message.text?.[locale]}
                  </li>
                );
              })}
            </ul>
            {/* <Icon name={message.icon.name.split(':')[1]}/> */}
          </Section>
        </div>
      )}

      <NavigationMenu className="mx-auto hidden md:flex">
        <NavigationMenuList className="">
          {links.slice(0, 2).map((link, i) => {
            return link._type === "navigationButtonTrigger" ? (
              <NavigationMenuItem key={`item-${i}`}>
                <Link href={link.url} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      `transition-all duration-300 font-mulish uppercase bg-transparent ${scrolled ? "font-semibold" : "font-bold"} min-w-36 text-center`
                    )}>
                    {link.title?.[locale]}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem key={`item-${i}`} className="">
                <NavigationMenuTrigger
                  className={`transition-all duration-300 font-mulish uppercase bg-transparent ${scrolled ? "font-semibold" : "font-bold"} min-w-36 text-center`}>
                  {link.title?.[locale]}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="">
                  <ul className="grid  gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
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
                      <ListItem key={`subItem-${i}`} title={linkSimple.title?.[locale]} href={linkSimple.url}>
                        {linkSimple.description?.[locale]}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          })}
          {/* <NavigationMenuTrigger className={`transition-all duration-300 font-mulish uppercase bg-transparent ${scrolled ? "font-semibold" : "font-bold"} min-w-36 text-center`}>
              Accueil
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {components.map((component) => (
                  <ListItem key={component.title} title={component.title} href={component.href}>
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent> */}
          <NavigationMenuItem className={``}>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent h-fit p-1 px-4")}>
                <NuLogo className={`transition-all duration-300 ${scrolled ? "size-6" : "size-8"} `}></NuLogo>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          {links.slice(2).map((link, i) => {
            return link._type === "navigationButtonTrigger" ? (
              <NavigationMenuItem key={`item-${i + 2}`}>
                <Link href={link.url} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      `transition-all duration-300 font-mulish uppercase bg-transparent ${scrolled ? "font-semibold" : "font-bold"} min-w-36 text-center`
                    )}>
                    {link.title?.[locale]}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem key={`item-${i + 2}`}>
                <NavigationMenuTrigger
                  className={`transition-all duration-300 font-mulish uppercase bg-transparent ${scrolled ? "font-semibold" : "font-bold"} min-w-36 text-center`}>
                  {link.title?.[locale]}
                </NavigationMenuTrigger>
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
                    <Link href={"/shop"}>
                      <Typography variant={"h3"} className="p-1 hover:bg-nu-blue/20">
                        {link.title?.[locale]}
                      </Typography>
                    </Link>
                  </SheetClose>

                  {/* <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]"> */}
                  {/* <li className="row-span-3"> */}
                  {/* <NavigationMenuLink asChild>
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
                              className="object-cover"
                              src={link.altImage.image.url}
                            />
                            <div className="absolute z-0 top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent to-white/50 "></div>
                            <NuLogo className="h-6 w-6 relative" />
                            <div className="mb-2 mt-4 text-lg font-corben relative">{link.links[0].title?.[locale]}</div>
                            <p className="text-sm leading-tight text-muted-foreground font-mulish relative">{link.links[0].description?.[locale]}</p>
                          </Link>
                        </NavigationMenuLink> */}
                  {/* </li> */}
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
                  {/* </ul> */}
                </div>
              );
            })}
          </ol>
          {/* <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" value="@peduarte" className="col-span-3" />
            </div>
          </div> */}
          {/* FOOTER */}
          {/* <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter> */}
        </SheetContent>
      </Sheet>
    </div>
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
