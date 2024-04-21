"use client";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

import { localeType } from "@/sanity/lib/interface";
import { CircleUser, CircleUserIcon, CircleUserRoundIcon, LanguagesIcon, User2Icon, UserIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
export interface UserButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  locale: localeType;
  scrolled: boolean;
}
import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Typography from "./Typography";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export default function UserButton({ children, className, locale, scrolled, ...props }: UserButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button className="bg-transparent border-transparent p-3" variant="outline">
          <User2Icon className={`size-5 transition-all ${scrolled ? "stroke-[1.5]" : "stroke-2"}`} />
        </Button>
      </TooltipTrigger>
      <TooltipContent className="mr-1.5">
        <p>{locale === "en" ? "Change language" : "Changer votre langue"}</p>
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
