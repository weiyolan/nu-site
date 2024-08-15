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

  //Charges of sripe based on customer ID
  // https://stackoverflow.com/questions/71751963/way-to-fetch-list-of-orders-based-on-customer-email-stripejs
  //Another way is to store each order in Supabase Database and manage the information independently of stripe

  return (
    <main className="">
      <Typography variant="h1" className="">
        {locale === "en" ? "Welcome in your account, " : "Bienvenue dans votre compte,"} {`${session?.user?.name}!`}
      </Typography>

      <div className="gap-12 flex "></div>

      <Typography variant="h2">Session</Typography>
      <pre className="bg-secondary p-4 rounded-lg my-2">{JSON.stringify(session, null, 2)}</pre>
      {/* <AuthForm action="/api/sign-out" /> */}
    </main>
  );
}
