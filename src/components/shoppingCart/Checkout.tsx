"use client";

// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { Loader2 } from "lucide-react";
import React, { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { env } from "@/lib/env.mjs";
import { localeType } from "@/sanity/lib/interface";
import { Product } from "use-shopping-cart/core";
import { CartDetails } from "use-shopping-cart/core";
import { AuthSession } from "@/lib/auth/utils";

interface CheckoutProps {
  userId?: string;
  email?: string;
  isCurrentPlan?: boolean;
  isSubscribed?: boolean;
  stripeCustomerId?: string | null;
  stripePriceId?: string;
  locale: localeType;
  // products: { [id: string]: Product };
  cartDetails: CartDetails;
  session: AuthSession["session"];
}
const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export function Checkout({ userId, email, isCurrentPlan, session, isSubscribed, stripeCustomerId, stripePriceId, locale, cartDetails }: CheckoutProps) {
  console.log(session);
  const fetchClientSecret = useCallback(() => {
    return fetch("/api/billing/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: session?.user?.email,
        userId: session?.user?.id,
        // isSubscribed,
        // isCurrentPlan,
        // stripeCustomerId,
        // stripePriceId,
        locale,
        cartDetails,
      }),
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const options = { fetchClientSecret };

  return (
    <div id="checkout" className="max-w-[1000px]  w-full mx-auto">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
