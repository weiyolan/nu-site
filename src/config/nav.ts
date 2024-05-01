import { SidebarLink } from "@/components/SidebarItems";
import { Cog, Globe, HomeIcon, Navigation, PlaneIcon } from "lucide-react";

type AdditionalLinks = {
  title: string;
  links: SidebarLink[];
};

export const defaultLinks: SidebarLink[] = [
  { href: "/account", title: "Home", icon: HomeIcon },
  { href: "/account/details", title: "Details", icon: Cog },
  { href: "/account/settings", title: "Settings", icon: Cog },
  { href: "/account/resend", title: "Resend", icon: PlaneIcon },
];

export const additionalLinks: AdditionalLinks[] = [];
