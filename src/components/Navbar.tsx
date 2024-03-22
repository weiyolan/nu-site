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
} from "@/components/ui/navigation-menu";
import NuLogo from "./NuLogo";
import { useEffect, useState } from "react";
// import Image from "next/image";
import Section from "./Section";
import LucideIcon from "./LucideIcon";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Best Sellers",
    href: "/docs/primitives/alert-dialog",
    description: "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Shampoings Solides",
    href: "/docs/primitives/hover-card",
    description: "For sighted users to preview content available behind a link.",
  },
  {
    title: "Accessoires",
    href: "/docs/primitives/progress",
    description: "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Packs",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
];

const components2: { title: string; href: string; description: string }[] = [
  { title: "Shampoings Solides", href: "/docs", description: "Re-usable components built using Radix UI and Tailwind CSS." },
  { title: "Accessoires", href: "/docs/installation", description: "How to install dependencies and structure your app." },
  { title: "Les Packs", href: "/docs/primitives/typography", description: "Styles for headings, paragraphs, lists...etc" },
];

export default function Navbar({ enabled, messages }: { enabled:'boolean', messages: [] }) {
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
    <div className={`w-full fixed top-0 z-10 transition-all duration-300 ${scrolled ? "bg-nu-beige shadow-lg" : "bg-transparent"} `}>
      {/* <TransitionBackground className="absolute top-0 left-0 bottom-0 right-0" /> */}
      {enabled && <div className={cn(`w-full bg-nu-black text-nu-white text-sm transition-all duration-300 mx-a`, false && `${scrolled ? "opacity-0 h-0 " : "opacity-100 h-6"} `)}>
        <Section className={cn(`flex justify-between items-center space-x-8 mt-0 h-full`, false && `${scrolled ? " delay-300 invisible" : " visible"}`)}>
          {messages.map((message, i) => {
            return (<p key={i} className="align-middle"><LucideIcon name={message.icon.name} className="size-4 inline-block mb-0.5"/> {message.text.fr}</p>);
          })}
          {/* <Icon name={message.icon.name.split(':')[1]}/> */}
        </Section>
      </div>}
      <NavigationMenu className="mx-auto  ">
        <NavigationMenuList className="">
          <NavigationMenuItem>
            <NavigationMenuTrigger className={`transition-all duration-300 font-mulish uppercase bg-transparent ${scrolled ? "font-semibold" : "font-bold"} min-w-36 text-center`}>
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
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className={`transition-all duration-300 font-mulish uppercase bg-transparent ${scrolled ? "font-semibold" : "font-bold"} min-w-36 text-center`}>
              Shop
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link className="flex relative h-full w-full select-none flex-col justify-end rounded-md  bg-nu-yellow p-6 no-underline outline-none focus:shadow-md" href="/">
                      {/* <Image src="/about_transparent.jpg" className="object-cover relative " fill alt="" /> */}
                      <NuLogo className="h-6 w-6 relative" />
                      <div className="mb-2 mt-4 text-lg font-corben relative">Best Sellers</div>
                      <p className="text-sm leading-tight text-muted-foreground font-mulish relative">Beautifully designed components built with Radix UI and Tailwind CSS.</p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                {components2.map((component) => (
                  <ListItem key={component.title} title={component.title} href={component.href}>
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className={``}>
            <Link href="/aide" legacyBehavior passHref>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent h-fit p-1 px-4")}>
                <NuLogo className={`transition-all duration-300 ${scrolled ? "size-6" : "size-8"} `}></NuLogo>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/apropos" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  `transition-all duration-300 font-mulish uppercase bg-transparent ${scrolled ? "font-semibold" : "font-bold"} min-w-36 text-center`
                )}>
                À Propos
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/aide" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  `transition-all duration-300 font-mulish uppercase bg-transparent ${scrolled ? "font-semibold" : "font-bold"} min-w-36 text-center`
                )}>
                Aide
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
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
