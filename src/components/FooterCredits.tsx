import { cn } from "@/lib/utils";
import Image from "next/image";
import Typography from "./Typography";
import Link from "next/link";

export interface CreditsProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Credits({ className, ...props }: CreditsProps) {
  return (
    <div className={cn("div w-full", className)} {...props}>
      <div className="flex gap-2 justify-center pb-1 ">
        <Image className="w-6 h-auto rounded-[2px]" alt="Visa card logo" src="/payment_visa.png" width={50 / 2} height={31.45 / 2} />
        <Image className="w-6 h-auto rounded-[2px]" alt="Mastercard logo" src="/payment_mastercard.png" width={50 / 2} height={31.45 / 2} />
        <Image className="w-6 h-auto rounded-[2px]" alt="America Express logo" src="/payment_amex.png" width={50 / 2} height={31.45 / 2} />
        <Image className="w-6 h-auto rounded-[2px]" alt="Discover logo" src="/payment_discover.png" width={50 / 2} height={31.45 / 2} />
        <Image className="w-6 h-auto rounded-[2px]" alt="Google Pay logo" src="/payment_googlepay.png" width={50 / 2} height={31.45 / 2} />
        <Image className="w-6 h-auto rounded-[2px]" alt="Apple Pay logo" src="/payment_applepay.png" width={50 / 2} height={31.45 / 2} />
      </div>
      <Typography variant={"p"} className="text-xs text-center whitespace-pre-wrap md:whitespace-nowrap">
        {"©2024 NU. Tous droits réservés.\nPowered by "}
        <span className="underline-offset-4 hover:underline">
          <Link href="https://ywdesign.co">ywdesign.co</Link>
        </span>
      </Typography>
    </div>
  );
}
