"use client";
import React, { useEffect, useState } from "react";
import { redirect} from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { useShoppingCart } from "use-shopping-cart";
import { toast } from "sonner";
import Typography from "@/components/Typography";
import { localeType } from "@/sanity/lib/interface";
import Section from "@/components/Section";
import ConditionalLink from "@/components/ConditionalLink";
import NuLogo from "@/components/NuLogo";
import { Button } from "@/components/ui/button";
// import Link from "next/link";


export default function Return({ params: { locale } }: { params: { locale: localeType } }) {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const [data, setData] = useState();
  const searchParams = useSearchParams();
  // const success = searchParams.get("success") as Boolean | null;
  const sessionId = searchParams.get("session_id") as string | null;
  const { clearCart } = useShoppingCart();

  useEffect(() => {
    // fetch(`/api/checkout_sessions?session_id=${sessionId}`, {
    fetch(`/api/billing/checkout?session_id=${sessionId}`, {
      method: "GET",
    })
      .then((res) => {
        // console.log(res);
        return res.json();
      })
      .then((data) => {
        // console.log("=====The Returned Checkout Data=======");
        // console.log(data);
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
        setData(data);
      });
  }, [sessionId]);

  useEffect(() => {
    if (status === "complete") {
      clearCart();
      // toast.success(`We appreciate your business! A confirmation email will be sent to ${customerEmail}.`);
    }
  }, [status]);

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    return (
      <Section id="success" className="mt-24 text-center max-w-xl space-y-8">
        <Typography variant={"h2"} className="mx-auto w-fit ">
          {locale === "en" ? "Thanks!" : "Merci!"}
        </Typography>
        <Typography variant="p" className="">
          {locale === "en"
            ? `Thank you for your order! A confirmation email will be sent to ${customerEmail}. We'll inform you once your package is on the way.`
            : `Merci pour votre commande! Un mail de confirmation vous est envoyé sur ${customerEmail}. Nous vous tiendrons au courant dés que votre coli est sur chemin.`}
        </Typography>
        <NuLogo className="mx-auto size-8" />

        <pre className="text-black">{JSON.stringify(data, null, 2)}</pre>

        <div className="flex flex-col sm:flex-row gap-4 mx-auto w-fit">
          <Button asChild>
            <ConditionalLink href="/shop" className="min-w-fit max-w-4/5">
              {locale === "en" ? "Continue shopping" : "Continuez vos achats"}
            </ConditionalLink>
          </Button>

          <Button asChild>
            <ConditionalLink href="/account/orders" className="min-w-fit max-w-4/5">
              {locale === "en" ? "Visit your account" : "Visitez votre compte"}
            </ConditionalLink>
          </Button>
        </div>
      </Section>
    );
  }

  return (
    <div className="w-full h-screen pt-[50vh]">
      <Loader2Icon className="size-6 animate-spin mx-auto " />
    </div>
  );
}
