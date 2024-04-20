import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const variants = {
  variant: {
    h1: "scroll-m-20 leading-normal text-3xl font-corben tracking-wide mb-6 whitespace-pre-wrap text-balance",
    // h1: "scroll-m-20 text-4xl font-extrabold leading-snug tracking-tight lg: text-5xl",
    h2: "scroll-m-20 font-corben text-3xl first:mt-0 whitespace-pre-wrap text-balance ",
    // h2: "scroll-m-20 border-b font-corben pb-2 text-3xl font-semibold tracking-tight first:mt-0",
    h3: "scroll-m-20 font-corben text-2xl tracking-tight text-balance whitespace-pre-wrap",
    // h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
    h4: "scroll-m-20 text-xl font-semibold tracking-tight",
    p: "font-medium text-base leading-7 [&:not(:first-child)]:mt-0",
    // blockquote: "mt-6 border-l-2 pl-6 italic",
    // list: "my-6 ml-6 list-disc [&>li]:mt-2",
  },
  affects: {
    default: "",
    lead: "text-xl text-muted-foreground",
    large: "text-lg font-semibold",
    small: "text-sm font-semibold leading-none",
    muted: "text-sm text-muted-foreground",
    subTitle: "text-lg text-muted-foreground [&:not(:first-child)]:mt-6 ",
    withPMargin: "[&:not(:first-child)]:mt-6",
    removeBorder: "border-b pb-2",
  },
};

export const typographyVariants = cva("text-xl", {
  variants,
  defaultVariants: {
    variant: "h1",
    affects: "default",
  },
});

export interface TypographyProps extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof typographyVariants> {}

const Typography = React.forwardRef<HTMLHeadingElement, TypographyProps>(({ className, variant, affects, ...props }, ref) => {
  const Comp = variant || "p";
  return <Comp className={cn(typographyVariants({ variant, affects }), className)} ref={ref} {...props} />;
});
Typography.displayName = "H1";

export default Typography;
