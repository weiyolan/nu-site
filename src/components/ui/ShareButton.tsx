"use client";

import { cn } from "@/lib/utils";
import { localeType } from "@/sanity/lib/interface";
import { Check, Share } from "lucide-react";
import { useCopyToClipboard } from "usehooks-ts";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";

export interface ShareButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  shareValue: string;
  locale: localeType;
}

export default function ShareButton({ shareValue, locale, children, className, ...props }: ShareButtonProps) {
  const [copiedText, copy] = useCopyToClipboard();

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        toast(locale === "en" ? "URL copied successfully" : "Lien bien copié", {
          description: locale === "en" ? "Paste anywhere to share 🤭" : "Colle où tu veux pour partager 🤭",
          // closeButton: true,
          dismissible: true,
          // icon: <Check className="w-4" />,
          // action: {
          //   label: "Undo",
          //   onClick: () => console.log("Undo"),
          // },
        });
      })
      .catch((error) => {
        console.error("Failed to copy!", error);
      });
  };

  return (
    <Tooltip>
      <TooltipTrigger onClick={handleCopy(shareValue)} className={cn("my-auto", className)} {...props}>
        {/* <button> */}
        <Share className={cn("size-4 mt-auto")} />
        {/* </button> */}
      </TooltipTrigger>
      <TooltipContent>
        <p>{locale === "en" ? "Copy url" : "Copier lien"}</p>
      </TooltipContent>
    </Tooltip>
  );
}
