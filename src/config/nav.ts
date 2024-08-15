import { SidebarLink } from "@/components/SidebarItems";
import { Cog, Globe, HomeIcon, Navigation, PlaneIcon, ShoppingCart } from "lucide-react";

type AdditionalLinks = {
  title: string;
  links: SidebarLink[];
};

export const defaultLinks: SidebarLink[] = [
  { href: "/shop", title: "Nu Shop", icon: ShoppingCart },
  { href: "/account/orders", title: "Commandes ", icon: HomeIcon },
  { href: "/account/manage", title: "Informations", icon: Cog },
  // { href: "/account/orders", title: "Commandes ", icon: HomeIcon },
  // { href: "/account/settings", title: "Settings", icon: Cog },
  { href: "/account/resend", title: "Resend", icon: PlaneIcon },
];

export const additionalLinks: AdditionalLinks[] = [
  // {
  //   title: "Entities",
  //   links: [
  //     {
  //       href: "/account/pages",
  //       title: "Pages",
  //       icon: Globe,
  //     },
  //   ],
  // },
];
