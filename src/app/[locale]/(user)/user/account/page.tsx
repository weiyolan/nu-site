import UserSettings from "./UserSettings";
import PlanSettings from "./PlanSettings";
import { checkAuth, getUserAuth } from "@/lib/auth/utils";
import { getUserSubscriptionPlan } from "@/lib/stripe/subscription";
import { redirect } from "next/navigation";

export default async function Account() {
  await checkAuth();
  const { session } = await getUserAuth();
  const subscriptionPlan = await getUserSubscriptionPlan();
  if (!session) redirect("/sign-up");
  return (
    <main>
      <h1 className="text-2xl font-semibold my-4">Account</h1>
      <h2 className="font-bold ">Session</h2>
      <pre className="bg-secondary p-4 rounded-lg my-2">{JSON.stringify(session, null, 2)}</pre>

      <div className="space-y-4">
        <PlanSettings subscriptionPlan={subscriptionPlan} session={session} />
        <UserSettings session={session} />
      </div>
    </main>
  );
}
