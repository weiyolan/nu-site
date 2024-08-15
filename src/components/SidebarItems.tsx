"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { defaultLinks, additionalLinks } from "@/config/nav";
import Typography from "./Typography";
import { SheetClose } from "./ui/sheet";

export interface SidebarLink {
  title: string;
  href: string;
  icon: LucideIcon;
}

const SidebarItems = () => {
  return (
    <>
      <SidebarLinkGroup links={defaultLinks} />
      {additionalLinks.length > 0 ? additionalLinks.map((l) => <SidebarLinkGroup links={l.links} title={l.title} border key={l.title} />) : null}
    </>
  );
};
export default SidebarItems;

const SidebarLinkGroup = ({ links, title, border }: { links: SidebarLink[]; title?: string; border?: boolean }) => {
  const fullPathname = usePathname();
  // const pathname = "/" + fullPathname.split("/")[1] + "/" + fullPathname.split("/")[2];
  // console.log(fullPathname);

  return (
    <div className={border ? "border-border border-t my-8 pt-4" : ""}>
      {title ? (
        <Typography variant="h4" className="px-2 mb-2 text-xs uppercase text-muted-foreground tracking-wider">
          {title}
        </Typography>
      ) : null}
      <ul>
        {links.map((link) => (
          <li key={link.title}>
            <SidebarLink link={link} active={fullPathname === link.href} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const SidebarLink = ({ link, active }: { link: SidebarLink; active: boolean }) => {
  return (
    <Link
      href={link.href}
      className={`group transition-colors p-2 inline-block hover:bg-popover hover:text-primary text-muted-foreground text-xs hover:shadow rounded-md w-full${
        active ? " text-primary font-semibold" : ""
      }`}>
      <div className="flex items-center">
        <div className={cn("opacity-0 left-0 h-6 w-[4px] absolute rounded-r-lg bg-primary", active ? "opacity-100" : "")} />
        <link.icon className="h-3.5 mr-1" />
        <span>
          <Typography variant="h3" className="text-base tracking-wide">
            {link.title}
          </Typography>
        </span>
      </div>
    </Link>
  );
};

export const SidebarItemsMobile = () => {
  return (
    <>
      <SidebarLinkGroupMobile links={defaultLinks} />
      {additionalLinks.length > 0 ? additionalLinks.map((l) => <SidebarLinkGroupMobile links={l.links} title={l.title} border key={l.title} />) : null}
    </>
  );
};

const SidebarLinkGroupMobile = ({ links, title, border }: { links: SidebarLink[]; title?: string; border?: boolean }) => {
  const fullPathname = usePathname();
  // const pathname = "/" + fullPathname.split("/")[1] + "/" + fullPathname.split("/")[2];
  // console.log(fullPathname);

  return (
    <div className={border ? "border-border border-t my-8 pt-4" : ""}>
      {title ? (
        <SheetClose>
          <Typography variant="h4" className="px-2 mb-2 text-xs uppercase text-muted-foreground tracking-wider">
            {title}
          </Typography>
        </SheetClose>
      ) : null}
      <ul>
        {links.map((link) => (
          <li key={link.title}>
            <SidebarLinkMobile link={link} active={fullPathname === link.href} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const SidebarLinkMobile = ({ link, active }: { link: SidebarLink; active: boolean }) => {
  return (
    <Link
      href={link.href}
      className={`group transition-colors p-2 inline-block hover:bg-popover hover:text-primary text-muted-foreground text-xs hover:shadow rounded-md w-full${
        active ? " text-primary font-semibold" : ""
      }`}>
      <SheetClose>
        <div className="flex items-center vertical-align gap-2">
          <div className={cn("opacity-0 left-0 h-6 w-[4px] absolute rounded-r-lg bg-primary", active ? "opacity-100" : "")} />
          <link.icon className="size-6 mt-1" />
          <span>
            <Typography variant="h3" className=" tracking-wide ">
              {link.title}
            </Typography>
          </span>
        </div>
      </SheetClose>
    </Link>
  );
};