"use client";
// import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

import { localeType } from "@/sanity/lib/interface";
import { User2Icon } from "lucide-react";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { SelectGroup, SelectLabel } from "@radix-ui/react-select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
export interface UserButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  locale: localeType;
  scrolled: boolean;
}
import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

// import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import Typography from "./Typography";
import Link from "next/link";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export default function UserButton({ children, className, locale, scrolled, ...props }: UserButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button asChild className="bg-transparent border-transparent p-3" variant="outline">
          <Link href="/account">
            <User2Icon className={`size-6 sm:size-5 transition-all ${scrolled ? "stroke-[1.5]" : "stroke-2"}`} />
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent className="mr-1.5">
        <p>{locale === "en" ? "Go to account" : "Voir mon compte"}</p>
      </TooltipContent>
    </Tooltip>

    // <Popover>
    //   <PopoverTrigger asChild>
    //     <Button className=" bg-transparent border-transparent" variant="outline">
    //       <LanguagesIcon className="w-6 h-6" />
    //     </Button>
    //   </PopoverTrigger>
    //   <PopoverContent className="mr-2 w-80">
    //     <Card>
    //       <CardHeader>
    //         <CardTitle className="text-xl">Choissisez votre langue:</CardTitle>
    //         <CardDescription>Actuellement: Français</CardDescription>
    //       </CardHeader>
    //       <CardContent>
    //         <p>Card Content</p>
    //       </CardContent>
    //       <CardFooter>
    //         <p>Card Footer</p>
    //       </CardFooter>
    //     </Card>
    //   </PopoverContent>
    // </Popover>
  );
}
