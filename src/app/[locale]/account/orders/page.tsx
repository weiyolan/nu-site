import Typography from "@/components/Typography";

import { checkAuth, getUserAuth } from "@/lib/auth/utils";

import { absoluteUrl } from "@/lib/utils";
import { localeType } from "@/sanity/lib/interface";

import { Order } from "./Order";
import { Order as OrderType } from "@/lib/db/schema/orders";

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

      <div className="space-y-8 ">
        {orders.length > 0
          ? orders.map((order: OrderType, i: number) => {
              return (
                // <pre key={i} className="bg-secondary p-4 rounded-lg my-2 inline-flex flex-col text-xs m-2 max-w-[25%]  overflow-hidden">
                // <Typography variant="h2">Invoice</Typography>
                //   {JSON.stringify(invoice, null, 2)}
                // </pre>
                <Order locale={locale} key={i} order={order} />
              );
            })
          : `${locale == "en" ? "You don't have any orders yet." : "Vous n'avez pas encore de commandes."}`}
      </div>
    </main>
  );
}
