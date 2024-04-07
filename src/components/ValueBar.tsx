import "react";
import { cn } from "@/lib/utils";
import Typography from "./Typography";
import { client } from "@/sanity/lib/client";
import Icon from "./LucideIcon";
import { localeType } from "@/sanity/lib/interface";

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

export interface ValueBarProps extends React.HTMLAttributes<HTMLDivElement> {
  locale: localeType;
}
export interface ValueProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  title: string;
}

export async function getValues(): Promise<
  {
    title: { en: string; fr: string };
    icon: { name: string };
  }[]
> {
  const values = await client.fetch(`*[_type=='values'][]`);
  // console.log('values', values)
  return [...values, ...values];
}

export default async function ValueBar({ locale, className, ...props }: ValueBarProps) {
  const values = await getValues();

  return (
    <div
      style={{ "--values-amount": values.length / 2, "--values-width": `${112 + 128}px` }}
      className={cn("flex animate-slide hover:paused space-x-14 md:space-x-28  ", className)}
      {...props}>
      {values.map((value, i) => (
        <Value name={value.icon.name} title={value.title?.[locale]} key={i} />
      ))}
    </div>
  );
}

function Value({ name, title }: ValueProps) {
  return (
    <div className="shrink-0 w-32 group cursor-pointer space-y-2">
      {/* <BabyIcon className="mx-auto" /> */}
      <Icon className="mx-auto group-hover:scale-110 transition-transform  " name={name} />
      {/* <Icon icon={name}></Icon> */}
      {/* {console.log(name)} */}
      <Typography variant={"p"} className="text-center font-semibold text-sm group-hover:underline underline-offset-4   ">
        {title}
      </Typography>
    </div>
  );
}
