import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";

export type ConditionalLinkProps =
  | ({
      href?: never;
      title: never;
      children?: React.ReactNode;
      openNewTab?: boolean;
      className?: string;
    } & React.ComponentPropsWithoutRef<"div">)
  | ({
      href: string;
      children?: React.ReactNode;
      title: string;
      openNewTab?: boolean;
      className?: string;
    } & React.ComponentPropsWithoutRef<"a"> &
      LinkProps);

export default function ConditionalLink({ children, title, href, openNewTab, className, ...props }: ConditionalLinkProps) {
  const isNewTab = openNewTab !== undefined ? openNewTab : href && !href.startsWith("/") && !href.startsWith("#");

  if (href === undefined) {
    return (
      <div className={cn("", className)} {...props}>
        {children}
      </div>
    );
  } else if (!isNewTab) {
    return (
      <Link title={title} href={href} className={cn("", className)} {...props}>
        {children}
      </Link>
    );
  } else {
    return (
      <Link title={title} target="_blank" rel="noopener noreferrer" href={href} {...props} className={cn("", className)}>
        {children}
      </Link>
    );
  }
}
