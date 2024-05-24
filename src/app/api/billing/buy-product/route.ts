import { stripe } from "@/lib/stripe/index";
import { absoluteUrl } from "@/lib/utils";

interface BuyStripeProductActionProps {
  isSubscribed: boolean;
  stripeCustomerId?: string | null;
  isCurrentPlan: boolean;
  stripePriceId: string;
  email: string;
  userId: string;
}

export async function POST(req: Request) {
  const body: BuyStripeProductActionProps = await req.json();
  const { isSubscribed, stripeCustomerId, userId, stripePriceId, email } = body;
  console.log(body);
  const billingUrl = absoluteUrl("/account/manage/billing");

  // if (isSubscribed && stripeCustomerId) {
  //   const stripeSession = await stripe.billingPortal.sessions.create({
  //     // ui_mode: "embedded",
  //     customer: stripeCustomerId,
  //     return_url: billingUrl,
  //   });

  //   return new Response(JSON.stringify({ url: stripeSession.url }), {
  //     status: 200,
  //   });
  // }
  const stripeSession = await stripe.checkout.sessions.create({
    // ui_mode: "embedded",
    success_url: billingUrl.concat("?success=true"),
    cancel_url: billingUrl,
    // payment_method_types: ["card"],
    mode: "payment",
    billing_address_collection: "auto",
    customer_email: email,
    line_items: [
      {
        price: stripePriceId,
        quantity: 1,
      },
    ],
    metadata: {
      userId,
    },
    // return_url: `${billingUrl}/return?session_id={CHECKOUT_SESSION_ID}`,
  });

  return new Response(JSON.stringify({ url: stripeSession.url }), {
    status: 200,
  });
}
