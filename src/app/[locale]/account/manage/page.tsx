import UserSettings from "./UserSettings";
import { checkAuth, getUserAuth } from "@/lib/auth/utils";
import { getUserSubscriptionPlan } from "@/lib/stripe/subscription";
import Typography from "@/components/Typography";
import { localeType } from "@/sanity/lib/interface";

export default async function Account({ params: { locale } }: { params: { locale: localeType } }) {
  await checkAuth();
  const { session } = await getUserAuth();

  return (
    <main>
      <Typography variant="h1">Account</Typography>
      <div className="space-y-4">
        {/* <PlanSettings subscriptionPlan={subscriptionPlan} session={session} /> */}
        <UserSettings session={session} />
      </div>
    </main>
  );
}
