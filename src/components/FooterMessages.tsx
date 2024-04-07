"use client";
// import { cn } from "@/lib/utils";
import Section from "./Section";
import { Separator } from "./ui/separator";
import { useMediaQuery } from "usehooks-ts";
import { localeStringType, localeType } from "@/sanity/lib/interface";
import LucideIcon from "./LucideIcon";
import Typography from "./Typography";
import React from "react";

export interface FooterMessagesProps extends React.HTMLAttributes<HTMLDivElement> {
  messages: { text: localeStringType; icon: { name: string } }[];
  locale: localeType;
}

export default function FooterMessages({ locale, messages, className, ...props }: FooterMessagesProps) {
  const mdScreen = useMediaQuery("(min-width: 1024px)");

  return (
    <Section className="w-full gap-2 lg:gap-4 p-6 lg:px-24 flex flex-wrap items-center justify-center relative mb-0 ">
      {messages.slice(0, 2).map((message, i) => (
        <React.Fragment key={`item-${i}`}>
          {i !== 0 && <Separator orientation={"vertical"} className="bg-nu-black my-2 h-32 lg:h-16 w-0.5" />}
          <Message name={message.icon.name} text={message.text?.[locale]} />
        </React.Fragment>
      ))}
      {<Separator key={"middle seperator"} orientation={mdScreen ? "vertical" : "horizontal"} className="bg-nu-black h-0.5 lg:h-16 lg:w-0.5 " />}
      {messages.slice(2).map((message, i) => (
        <React.Fragment key={`item-${i}b`}>
          {i !== 0 && <Separator orientation={"vertical"} className="bg-nu-black my-2 h-32 lg:h-16 w-0.5" />}
          <Message name={message.icon.name} text={message.text?.[locale]} />
        </React.Fragment>
      ))}
    </Section>
  );
}

export interface MessageProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  name: string;
}

function Message({ text, name, ...props }: MessageProps) {
  // const Comp = icon || "BaggageClaim";
  return (
    <div
      className=" flex flex-col lg:flex-row items-center lg:items-start justify-start lg:justify-center gap-3 text-center mx-auto lg:text-left text-balance w-[44%] lg:w-[20%] h-32 lg:h-auto"
      {...props}>
      <LucideIcon name={name} className="w-8 h-8 shrink-0" />
      <Typography variant={"p"} className="inline-flex text-balance ">
        {text}
      </Typography>
    </div>
  );
}
