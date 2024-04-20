import { cn } from "@/lib/utils";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import LucideIcon from "./LucideIcon";
import Link from "next/link";
import NuLogo from "./NuLogo";
import Typography from "./Typography";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { localeType } from "@/sanity/lib/interface";
import { Globe2Icon, GlobeIcon, Languages, LanguagesIcon, ShoppingBagIcon, ShoppingBasketIcon, ShoppingCartIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
export interface LanguageToggleProps extends React.HTMLAttributes<HTMLDivElement> {
  locale: localeType;
  scrolled: boolean;
}

export default function LanguageToggle({ children, className, locale, scrolled, ...props }: LanguageToggleProps) {
  return (
    <Select>
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
        <SelectGroup>
          {/* <SelectLabel className=""> */}
          {/* <Typography variant={"h3"} className="text-lg pb-1">
              {" "}
              Langues
            </Typography> */}
          {/* </SelectLabel> */}
          <SelectItem className="" value="francais">
            Français
          </SelectItem>
          <SelectItem className="" value="english">
            English
          </SelectItem>
          {/* <SelectItem value="system">System</SelectItem> */}
        </SelectGroup>
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
