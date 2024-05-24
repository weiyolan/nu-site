"use client";
import {
  AccountCard,
  AccountCardBody,
  AccountCardFooter,
} from "./AccountCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AuthSession } from "@/lib/auth/utils";
import Typography from "@/components/Typography";

interface PlanSettingsProps {
  stripeSubscriptionId: string | null;
  stripeCurrentPeriodEnd: Date | null;
  stripeCustomerId: string | null;
  isSubscribed: boolean | "" | null;
  isCanceled: boolean;
  id?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  stripePriceId?: string | undefined;
  price?: number | undefined;
}
export default function PlanSettings({ subscriptionPlan, session }: { subscriptionPlan: PlanSettingsProps; session: AuthSession["session"] }) {
  return (
    <AccountCard
      params={{
        header: "Your Plan",
        description: subscriptionPlan.isSubscribed
          ? `You are currently on the ${subscriptionPlan.name} plan.`
          : `You are not subscribed to any plan.`.concat(!session?.user?.email || session?.user?.email.length < 5 ? " Please add your email to upgrade your account." : ""),
      }}>
      <AccountCardBody>
        {subscriptionPlan.isSubscribed ? (
          <Typography variant="h3" className="text-xl">
            ${subscriptionPlan.price ? subscriptionPlan.price / 100 : 0} / month
          </Typography>
        ) : null}
        {subscriptionPlan.stripeCurrentPeriodEnd ? (
          <p className="text-sm mb-4 text-muted-foreground ">
            Your plan will {!subscriptionPlan.isSubscribed ? null : subscriptionPlan.isCanceled ? "cancel" : "renew"}
            {" on "}
            <span className="font-semibold">{subscriptionPlan.stripeCurrentPeriodEnd.toLocaleDateString("en-us")}</span>
          </p>
        ) : null}
      </AccountCardBody>
      <AccountCardFooter description="Manage your subscription on Stripe.">
        <Link href="/account/manage/billing">
          <Button variant="outline">Go to billing</Button>
        </Link>
      </AccountCardFooter>
    </AccountCard>
  );
}
