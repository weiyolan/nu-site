"use client";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { useShoppingCart } from "use-shopping-cart";
import { toast } from "sonner";

export default function Return() {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const searchParams = useSearchParams();
  // const success = searchParams.get("success") as Boolean | null;
  const sessionId = searchParams.get("session_id") as string | null;
  const { clearCart } = useShoppingCart();
  useEffect(() => {
    // fetch(`/api/checkout_sessions?session_id=${sessionId}`, {
    fetch(`/api/billing/checkout?session_id=${sessionId}`, {
      method: "GET",
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
      });
  }, [sessionId]);

  useEffect(() => {
    if (status === "complete") {
      clearCart();
      toast.success(`We appreciate your business! A confirmation email will be sent to ${customerEmail}.`);
    }
  }, [status]);

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    return (
      <section id="success" className="mt-24">
        <p className="top-20">
          We appreciate your business! A confirmation email will be sent to {customerEmail}. If you have any questions, please email{" "}
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    );
  }

  return (
    <div className="w-full h-screen pt-[50vh]">
      <Loader2Icon className="size-6 animate-spin mx-auto " />
    </div>
  );
}
