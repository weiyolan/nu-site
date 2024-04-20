import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb";
import { ChevronDownIcon, Share } from "lucide-react";
import slugify from "slugify";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import ShareButton from "./ui/ShareButton";
import { localeType } from "@/sanity/lib/interface";
// import { useMediaQuery } from "@/hooks/use-media-query"

export default async function BreadcrumbWithCustomSeparator({ category, title, locale }: { category: string; title: string; locale: localeType }) {
  // const categories = await getCategories();
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/shop">Shop</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/shop#${slugify(category, { lower: true })}`}>{category}</Link>
          </BreadcrumbLink>
          {/* <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1">
              <ChevronDownIcon className="w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Documentation</DropdownMenuItem>
              <DropdownMenuItem>Themes</DropdownMenuItem>
              <DropdownMenuItem>GitHub</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{title}</BreadcrumbPage> <ShareButton locale={locale} shareValue={`https://nu-cosmétique.com/shop/${title}`} />
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
