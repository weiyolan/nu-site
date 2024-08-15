import { db } from "@/lib/db/index";
import { stripe } from "@/lib/stripe/index";
import { headers } from "next/headers";
import type Stripe from "stripe";
import { subscriptions } from "@/lib/db/schema/subscriptions";
import { Order, UpdateOrderParams, orders, insertOrderSchema } from "@/lib/db/schema/orders";
import { eq } from "drizzle-orm";
import { getChargeData, getFetchedSessionData, getInvoice, getInvoiceData } from "@/lib/stripe/orders";
import { updateOrder } from "@/lib/api/orders/mutations";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get("Stripe-Signature") ?? "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET || "");

    // console.log(event.type, " $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
  } catch (err) {
    return new Response(`Webhook Error: ${err instanceof Error ? err.message : "Unknown Error"}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  // console.log("this is the session metadata -> ", session);

  if (!session?.metadata?.userId && session.customer == null) {
    console.error("session customer", session.customer);
    console.error("no metadata for userid");
    return new Response(null, {
      status: 200,
    });
  }

  // const invoice = await getInvoice(session.invoice);
  // ORDER STATUS: En attente de paiement > Payé > En cours de préparation > Envoyé > Livré
  // ORDER STATUS: En attente > Payé > Envoyé > Livré

  if (event.type === "checkout.session.completed") {
    console.log("this is the session metadata -> ", session);

    // Save an order in database, marked as 'awaiting payment'
    await createOrder(session);

    if (session.payment_status == "paid") {
      // send email to userId for succesfull paiement.
      await fulfillOrder(session);
    }
  }

  if (event.type === "checkout.session.async_payment_succeeded") {
    await fulfillOrder(session);
  }

  if (event.type === "checkout.session.async_payment_failed") {
    // # Send an email to the customer asking them to retry their order
    // email_customer_about_failed_payment(checkout_session)
    await cancelOrder(session);
  }

  return new Response(null, { status: 200 });
}

async function createOrder(session: Stripe.Checkout.Session) {
  const { charge, ...invoiceData } = await getInvoiceData(session.invoice as string);
  const sessionData = getFetchedSessionData(session);
  const chargeData = getChargeData(charge as string);
  const updatedData = {
    ...sessionData,
    ...invoiceData,
    ...chargeData,
    ...{ status: "unpaid" },
    // },
  };

  console.log("From the stripe webhook, create order. Here the updated data:");
  console.log({ ...updatedData });

  if (session?.metadata?.userId != null) {
    await db.insert(orders).values({ ...updatedData, userId: session.metadata.userId });
  } else {
    await db.insert(orders).values({ ...updatedData, userId: "z6rpard7x3taf07" }); //Add order to admin account: z6rpard7x3taf07
  }

  // send email to userId for receiving order. Send confirmation when payment was successful.
}

async function fulfillOrder(session: Stripe.Checkout.Session) {
  // const invoiceData = await getInvoiceData(session.invoice as string);
  // const sessionData = getFetchedSessionData(session);
  const updatedData = {
    // ...sessionData,
    // ...invoiceData,
    status: "paid",
    // },
  };
  console.log("From the stripe webhook, fulfill order. Here the updated data:");
  console.log(updatedData);

  if (session?.metadata?.userId != null) {
    const [order] = await db.select().from(orders).where(eq(orders.userId, session.metadata.userId));
    if (order != undefined) {
      // await updateOrder(updatedData, order.userId);
      await db.update(orders).set(updatedData).where(eq(orders.userId, order.userId!));
    }
  } else if (typeof session.customer === "string" && session.customer != null) {
    await db.update(orders).set(updatedData).where(eq(orders.stripeCustomerId, session.customer));
  }
}

async function cancelOrder(session: Stripe.Checkout.Session) {
  // const invoiceData = await getInvoiceData(session.invoice as string);
  // const sessionData = getFetchedSessionData(session);
  const updatedData = {
    // ...sessionData,
    // ...invoiceData,
    status: "canceled",
    // },
  };
  console.log("From the stripe webhook, cancel order. Here the updated data:");
  console.log(updatedData);

  if (session?.metadata?.userId != null) {
    const [order] = await db.select().from(orders).where(eq(orders.userId, session.metadata.userId));
    if (order != undefined) {
      await db.update(orders).set(updatedData).where(eq(orders.userId, order.userId!));
    }
  } else if (typeof session.customer === "string" && session.customer != null) {
    await db.update(orders).set(updatedData).where(eq(orders.stripeCustomerId, session.customer));
  }

  //Send email
}

