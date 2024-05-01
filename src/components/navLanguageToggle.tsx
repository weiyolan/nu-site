"use client";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

import { localeType } from "@/sanity/lib/interface";
import { LanguagesIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
export interface LanguageToggleProps extends React.HTMLAttributes<HTMLDivElement> {
  locale: localeType;
  scrolled: boolean;
}
import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Typography from "./Typography";
import { supportedLanguages } from "@/i18n/supportedLanguages";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
// import Link from "next/link";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export default function LanguageToggle({ children, className, locale, scrolled, ...props }: LanguageToggleProps) {
  // const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
  // const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
  // const [showPanel, setShowPanel] = React.useState<Checked>(false);
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();

  // return (
  //   <DropdownMenu>
  //     <DropdownMenuTrigger asChild>
  //       <Button className="bg-transparent border-transparent p-3" variant="outline">
  //         <LanguagesIcon className={`size-5 transition-all ${scrolled ? "stroke-[1.5]" : "stroke-2"}`} />
  //       </Button>
  //       {/* <Button variant="outline">Open</Button> */}
  //     </DropdownMenuTrigger>
  //     <DropdownMenuContent className="w-56">
  //       <DropdownMenuLabel>{locale === "en" ? "Langue" : "Language"}</DropdownMenuLabel>
  //       <DropdownMenuSeparator />
  //       <DropdownMenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
  //         Status Bar
  //       </DropdownMenuCheckboxItem>
  //       <DropdownMenuCheckboxItem checked={showActivityBar} onCheckedChange={setShowActivityBar} disabled>
  //         Activity Bar
  //       </DropdownMenuCheckboxItem>
  //       <DropdownMenuCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
  //         Panel
  //       </DropdownMenuCheckboxItem>
  //     </DropdownMenuContent>
  //   </DropdownMenu>
  // );
  return (
    <Select value={locale} onValueChange={(val) => router.replace({ pathname, params }, { locale: val, scroll: false })}>
      <Tooltip>
        <SelectTrigger asChild>
          <TooltipTrigger asChild>
            <Button className="bg-transparent border-transparent p-3" variant="outline">
              <LanguagesIcon className={`size-5 transition-all ${scrolled ? "stroke-[1.5]" : "stroke-2"}`} />
            </Button>
          </TooltipTrigger>
        </SelectTrigger>
        <TooltipContent className="mr-1.5">
          <p>{locale === "en" ? "Change language" : "Changer votre langue"}</p>
        </TooltipContent>
      </Tooltip>

      {/* <SelectValue placeholder="Theme" className="hidden" /> */}
      <SelectContent className="mr-3 text-left  ">
        {/* <SelectGroup> */}
        {/* <SelectLabel className="">
            <Typography variant={"h3"} className="text-lg pb-1">
              {" "}
              Langues
            </Typography>
          </SelectLabel> */}
        {supportedLanguages.map((lang) => (
          <SelectItem key={lang.id} className="cursor-pointer" value={lang.id}>
            {/* <Link href={pathname} locale={lang.id}> */}
            {lang.title}
            {/* </Link> */}
          </SelectItem>
        ))}
        {/* </SelectGroup> */}
      </SelectContent>
    </Select>

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
