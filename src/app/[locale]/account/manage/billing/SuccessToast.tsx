"use client";

import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SuccessToast() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success") as Boolean | null;
  console.log(success);
  useEffect(() => {
    if (success) {
      toast.success("Successfully updated subscription.");
      // toast("Successfully updated subscription.");
      // console.log("use-effect fired within the if");
    }
  }, [success]);

  return null;
}
