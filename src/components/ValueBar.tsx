import { cn } from "@/lib/utils";
import Typography from "./Typography";
import "react";
import { client } from "@/sanity/lib/client";
import LucideIcon from "./LucideIcon";

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

export interface ValueBarProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface ValueProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  text: string;
}

export async function getValues(): Promise<
  {
    title: { en: string; fr: string };
    icon: { name: string };
  }[]
> {
  const values = await client.fetch(`*[_type=='values'][]`);
  // console.log('values', values)
  return values;
}

export default async function ValueBar({ className, ...props }: ValueBarProps) {
  const values = await getValues();

  return (
    <div style={{ "--values-amount": values.length, "--values-width": 112 + 128 + "px" }} className={cn("flex animate-slide space-x-28 hover:paused ", className)} {...props}>
      {values.map((value, i) => (
        <Value name={value.icon.name} title={value.title?.["fr"]} key={i} />
      ))}
    </div>
  );
}

function Value({ name, title }: ValueProps) {
  return (
    <div className="shrink-0 w-32 cursor-pointer space-y-2">
      {/* <BabyIcon className="mx-auto" /> */}
      <LucideIcon className="mx-auto" name={name} />
      <Typography variant={"p"} className="text-center font-semibold text-sm ">
        {title}
      </Typography>
    </div>
  );
}
