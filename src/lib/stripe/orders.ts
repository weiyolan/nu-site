import { stripe } from "@/lib/stripe/index";
import { NextResponse } from "next/server";
import type Stripe from "stripe";

export async function getCustomerList() {
  // const { session } = await getUserAuth();

  //   if (!session || !session.user) {
  //     throw new Error("User not found.");
  //   }

  //   const [subscription] = await db.select().from(subscriptions).where(eq(subscriptions.userId, session.user.id));

  // let customers = await fetch(`/api/account/orders`, {
  //   method: "GET",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     email: "yolan.weiler@gmail.com",
  //   }),
  // })
  //   .then((res) => {
  //     // console.log(res);
  //     return res.json();
  //   })
  //   .then((data) => {
  //     console.log("=======Customers=======");
  //     console.log(data);
  //   });

  // const body: GetStripeCustomerProps = await request.json();
  // const { name, email } = emailSchema.parse(body);
  // try {
  const { data } = await stripe.customers.list({
    email: "yolan.weiler@gmail.com",
  });
  // console.log("$$$$$$$$$$ Customers $$$$$$$$$$");
  // console.log(data);
  return data;
  // } catch (error) {
  // return NextResponse.json({ error });
}

interface SessionData {
  stripePaymentIntentId: string | undefined;
  stripeInvoiceId: string | undefined;
  stripeCheckoutSessionId: string | undefined;
  stripeCustomerId: string | undefined;
  amountTotal: number | undefined;
  amountSubtotal: number | undefined;
  amountDiscount: number | undefined;
  amountShipping: number | undefined;
  amountTax: number | undefined;
  customerEmail: string | undefined;
  // customerPhone: string | undefined;
  // customerName: string | undefined;
}

export function getFetchedSessionData(session: Stripe.Checkout.Session): SessionData {
  return {
    stripePaymentIntentId: session.payment_intent as string,
    stripeInvoiceId: session.invoice as string,
    stripeCheckoutSessionId: session.id as string,
    stripeCustomerId: session.customer as string,
    //customerDetails: session.customer_details,
    //shippingDetails: session.shipping_details,
    amountTotal: session.amount_total as number,
    amountSubtotal: session.amount_subtotal as number,
    amountDiscount: session.total_details?.amount_discount as number,
    amountShipping: session.total_details?.amount_shipping as number,
    amountTax: session.total_details?.amount_tax as number,
    customerEmail: session.customer_email as string,
    // customerName: session.customer_details?.name as string,
    // customerPhone: session.customer_details?.phone as string,
  };
}

interface InvoiceData {
  number: string | undefined;
  hostedInvoiceUrl: string | undefined;
  invoicePdf: string | undefined;

  // lines: { object: string[] };
  // paymentType: string | undefined;
  shippingName: string | undefined;
  // shippingPhone: string | undefined;
  shippingAddressLine1: string | undefined;
  shippingAddressCity: string | undefined;
  shippingAddressCountry: string | undefined;
  shippingAddressPostalCode: string | undefined;
  charge: string | undefined;
}
export async function getInvoiceData(id: string): Promise<InvoiceData> {
  const invoice = await stripe.invoices.retrieve(id);

  // console.log("$$$$$$$$$$ Charges $$$$$$$$$$");
  // console.log(data);
  return {
    number: invoice?.number as string,
    hostedInvoiceUrl: invoice?.hosted_invoice_url as string,
    invoicePdf: invoice?.invoice_pdf as string,
    // paymentType: invoice?.payment_settings?.payment_method_types as string,
    // lines: { object: string[] };
    shippingAddressLine1: invoice?.shipping_details?.address?.line1 as string,
    shippingAddressCity: invoice?.shipping_details?.address?.city as string,
    shippingAddressCountry: invoice?.shipping_details?.address?.country as string,
    shippingAddressPostalCode: invoice?.shipping_details?.address?.postal_code as string,
    shippingName: invoice?.shipping_details?.name as string,
    // shippingPhone: invoice?.shipping_details?.phone as string,
    charge: invoice?.charge as string,
  };
}

export async function getInvoice(id: string): Promise<Stripe.Invoice> {
  const invoice = await stripe.invoices.retrieve(id);
  // console.log("$$$$$$$$$$ Charges $$$$$$$$$$");
  // console.log(data);
  return invoice;
}

interface ChargeData {
  billingName: string | undefined;
  billingAddressLine1: string | undefined;
  billingAddressCity: string | undefined;
  billingAddressCountry: string | undefined;
  billingAddressPostalCode: string | undefined;
  billingLast4: string | undefined;
  billingType: string | undefined;
}
export async function getChargeData(id: string): Promise<ChargeData> {
  const charge = await stripe.charges.retrieve(id);
  let last4;
  switch (charge?.payment_method_details?.type) {
    case "bancontact":
      last4 = charge.payment_method_details?.bancontact?.iban_last4;
    case "ideal":
      last4 = charge.payment_method_details?.ideal?.iban_last4;
    case "sofort":
      last4 = charge.payment_method_details?.sofort?.iban_last4;
    case "sepa_debit":
      last4 = charge.payment_method_details?.sepa_debit?.last4;
    default:
      last4 = charge.payment_method_details?.card?.last4;
  }

  return {
    billingAddressLine1: charge?.billing_details?.address?.line1 as string,
    billingAddressCity: charge?.billing_details?.address?.city as string,
    billingAddressCountry: charge?.billing_details?.address?.country as string,
    billingAddressPostalCode: charge?.billing_details?.address?.postal_code as string,
    billingName: charge?.billing_details?.name as string,
    billingLast4: last4 as string,
    billingType: charge.payment_method_details?.type as string,
  };
}
export async function getInvoices(customer_id: string): Promise<Stripe.Invoice[]> {
  // { id: string; invoice_pdf: string; customer: string; number: string; paid: boolean; payment_intent_id: string; status: string; receipt_number: string }
  const { data } = await stripe.invoices.list({ customer: "cus_Q4R143QItVkAag" });
  // console.log("$$$$$$$$$$ Charges $$$$$$$$$$");
  // console.log(data);
  // const invoices = data.map((invoice) => ({
  //   id: invoice.id,
  //   invoice_pdf: invoice.hosted_invoice_url,
  //   customer: invoice.customer,
  //   number: invoice.number,
  //   paid: invoice.paid,
  //   payment_intent_id: invoice.payment_intent,
  //   status: invoice.status,
  //   receipt_number: invoice.receipt_number,
  //   total: invoice.total,
  //   lines
  // }));
  return data;
}

export async function getCharges() {
  // try {
  const { data } = await stripe.charges.list({
    customer: "cus_QCuACuZQm1lxHv",
  });
  // console.log("$$$$$$$$$$ Charges $$$$$$$$$$");
  // console.log(data);
  return data;
  // return NextResponse.json(data);
  // } catch (error) {
  // return NextResponse.json({ error });
  // }
}

export async function getPaymentIntents(id: string) {
  // try {
  const { data } = await stripe.paymentIntents.list({
    customer: id || "cus_QCuACuZQm1lxHv",
  });
  // console.log("$$$$$$$$$$ PaymentIntents $$$$$$$$$$");
  // console.log(data);
  return data;
  // return NextResponse.json(data);
  // } catch (error) {
  // return NextResponse.json({ error });
  // }
}
