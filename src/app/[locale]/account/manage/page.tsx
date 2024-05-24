import UserSettings from "./UserSettings";
import PlanSettings from "./PlanSettings";
import { checkAuth, getUserAuth } from "@/lib/auth/utils";
import { getUserSubscriptionPlan } from "@/lib/stripe/subscription";
import Typography from "@/components/Typography";

export default async function Account() {
  await checkAuth();
  const { session } = await getUserAuth();
  const subscriptionPlan = await getUserSubscriptionPlan();
  
  return (
    <main>
      <Typography variant="h1">Account</Typography>
      <div className="space-y-4">
        <PlanSettings subscriptionPlan={subscriptionPlan} session={session} />
        <UserSettings session={session} />
      </div>
    </main>
  );
}
