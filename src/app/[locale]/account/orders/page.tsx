import ConditionalLink from "@/components/ConditionalLink";
import Typography from "@/components/Typography";
import AuthForm from "@/components/auth/Form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { checkAuth, getUserAuth } from "@/lib/auth/utils";
import { Order } from "@/lib/db/schema/orders";
import { getCharges, getCustomerList, getInvoice, getInvoices, getPaymentIntents } from "@/lib/stripe/orders";
import { absoluteUrl } from "@/lib/utils";
import { localeType } from "@/sanity/lib/interface";
import { Bike, ChevronLeft, ChevronRight, Copy, CreditCard, MoreVerticalIcon, Truck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default async function Home({ params: { locale } }: { params: { locale: localeType } }) {
  checkAuth();
  const { session } = await getUserAuth();
  // const customers = await getCustomerList();
  // const charges = await getCharges();
  // const payments = await getPaymentIntents();
  // const invoices = await getInvoices("in_1PMUMdLUFiXiOuXAsJGrVp6c");

  let orders = await fetch(absoluteUrl(`/api/orders?id=${session?.user.id}`), {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    // console.log(orders);
    .then((res) => res.json())
    .then((data) => data);
  //Charges of stripe based on customer ID
  // https://stackoverflow.com/questions/71751963/way-to-fetch-list-of-orders-based-on-customer-email-stripejs
  //Another way is to store each order in Supabase Database and manage the information independently of stripe

  return (
    <main className="">
      <Typography variant="h1" className="">
        {locale === "en" ? "Your Orders" : "Vos Commandes"}
      </Typography>

      <div className="gap-12 flex ">
        {orders.map((order, i) => {
          return (
            // <pre key={i} className="bg-secondary p-4 rounded-lg my-2 inline-flex flex-col text-xs m-2 max-w-[25%]  overflow-hidden">
            // <Typography variant="h2">Invoice</Typography>
            //   {JSON.stringify(invoice, null, 2)}
            // </pre>
            <OrderExample locale={locale} key={i} order={order} />
          );
        })}
      </div>
    </main>
  );
}

function OrderExample({ locale, order }: { locale: localeType; order: Order }) {
  return (
    <Card className="">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            {locale == "fr" ? "Commande " : "Order "} {order.number}
            <Button size="icon" variant="outline" className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100">
              <Copy className="h-3 w-3" />
              <span className="sr-only">{locale == "en" ? "Copy order ID" : "Copier ID de la commande"}</span>
            </Button>
          </CardTitle>
          <CardDescription>
            Date:{" "}
            <time dateTime={new Date(order.createdAt).toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" })}>
              {new Date(order.createdAt).toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" })}
            </time>
          </CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          {/* <Button size="sm" variant="outline" className="h-8 gap-1">
            <Truck className="h-3.5 w-3.5" />
            <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">Track Order</span>
          </Button> */}
          <DropDown locale={locale} invoicePdf={order.invoicePdf} hostedInvoiceUrl={order.hostedInvoiceUrl} />
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">{locale === "en" ? "Order Details" : "Détails"}</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Glimmer Lamps x <span>2</span>
              </span>
              <span>$250.00</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Aqua Filters x <span>1</span>
              </span>
              <span>$49.00</span>
            </li>
          </ul>
          <Separator className="my-2" />
          <Totals
            locale={locale}
            amountSubtotal={order.amountSubtotal}
            amountDiscount={order.amountDiscount}
            amountShipping={order.amountShipping}
            amountTax={order.amountTax}
            amountTotal={order.amountTotal}
          />
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-3">
            <div className="font-semibold">{locale == "en" ? "Shipping Address" : "Livraison"}</div>
            <address className="grid gap-0.5 not-italic text-muted-foreground">
              <span>{order.shippingAddressLine1}</span>
              <span>{`${order.shippingAddressPostalCode} ${order.shippingAddressCity}`}</span>
              <span>{`${order.shippingAddressCountry}`}</span>
            </address>
          </div>
          <div className="grid auto-rows-max gap-3">
            <div className="font-semibold">{locale == "en" ? "Billing Address" : "Facturation"}</div>
            {order?.billingAddressLine1 ? (
              <address className="grid gap-0.5 not-italic text-muted-foreground">
                <span>{order.billingAddressLine1}</span>
                <span>{`${order.billingAddressPostalCode} ${order.billingAddressCity}`}</span>
                <span>{`${order.billingAddressCountry}`}</span>
              </address>
            ) : (
              <div className="text-muted-foreground">{locale == "en" ? "Same as shipping address" : "Identique à l'addresse de livraison"}</div>
            )}
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">{locale == "en" ? "Customer Information" : "Client"}</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">{locale == "en" ? "Name" : "Nom"}</dt>
              <dd>{order.customerName}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">{locale == "en" ? "Email" : "Courriel"}</dt>
              <dd>
                <a href="mailto:">{order.customerEmail}</a>
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">{locale == "en" ? "Phone" : "Tel"}</dt>
              <dd>
                <a href="tel:">{order.customerPhone}</a>
              </dd>
            </div>
          </dl>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">{locale == "en" ? "Payment Information" : "Paiement"}</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-1 text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                {order.billingType}
              </dt>
              <dd>**** **** **** {order.billingLast4}</dd>
            </div>
          </dl>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          {locale == "fr" ? "Mis à jour le " : "Updated "}
          <time dateTime={new Date(order.updatedAt).toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" })}>
            {new Date(order.updatedAt).toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" })}
          </time>
        </div>
      </CardFooter>
    </Card>
  );
}

function DropDown({ locale, hostedInvoiceUrl, invoicePdf }: { locale: localeType; hostedInvoiceUrl: string; invoicePdf: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline" className="h-8 w-8">
          <MoreVerticalIcon className="h-3.5 w-3.5" />
          <span className="sr-only">{locale == "en" ? "More" : "Plus"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* <DropdownMenuItem>Edit</DropdownMenuItem> */}
        {/* <DropdownMenuItem>
                <ConditionalLink href={order.hostedInvoiceUrl}>{locale == "en" ? "Order again" : "Commender à nouveau"}</ConditionalLink>
              </DropdownMenuItem> */}
        <DropdownMenuItem asChild className="cursor-pointer">
          <ConditionalLink href={hostedInvoiceUrl}>{locale == "en" ? "See receipt" : "Voir le ticket"}</ConditionalLink>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <ConditionalLink href={invoicePdf}>{locale == "en" ? "Download " : "Télécharger "}pdf</ConditionalLink>
        </DropdownMenuItem>
        {/* <DropdownMenuSeparator /> */}
        {/* <DropdownMenuItem>Trash</DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Totals({
  locale,
  amountSubtotal,
  amountDiscount,
  amountShipping,
  amountTax,
  amountTotal,
}: {
  locale: localeType;
  amountSubtotal: number;
  amountDiscount: number;
  amountShipping: number;
  amountTax: number;
  amountTotal: number;
}) {
  return (
    <ul className="grid gap-3">
      <li className="flex items-center justify-between">
        <span className="text-muted-foreground">{locale == "en" ? "Subtotal" : "Sous-total"}</span>
        <span>€{(amountSubtotal / 100).toFixed(2)}</span>
      </li>
      <li className="flex items-center justify-between">
        <span className="text-muted-foreground">{locale == "en" ? "Discount" : "Livraison"}</span>
        <span>€{(amountShipping / 100).toFixed(2)}</span>
      </li>
      <li className="flex items-center justify-between">
        <span className="text-muted-foreground">Tax</span>
        <span>€{(amountTax / 100).toFixed(2)}</span>
      </li>
      {amountDiscount > 0 && (
        <li className="flex items-center justify-between">
          <span className="text-muted-foreground">{locale == "en" ? "Discount" : "Rabais"}</span>
          <span>€{(amountDiscount / 100).toFixed(2)}</span>
        </li>
      )}
      <li className="flex items-center justify-between font-semibold">
        <span className="text-muted-foreground">Total</span>
        <span>€{(amountTotal / 100).toFixed(2)}</span>
      </li>
    </ul>
  );
}
