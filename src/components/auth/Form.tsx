"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "@/lib/utils";

type Action = "/api/sign-in" | "/api/sign-up" | "/api/sign-out";

const AuthForm = ({ children, action, className }: { children?: React.ReactNode; action: Action; className: ClassNameValue }) => {
  const router = useRouter();
  const [errors, setErrors] = useState<{ error: string } | null>(null);
  const [loading, setLoading] = useState(false);
  return (
    <form
      action={action}
      method="post"
      className={cn("mt-4", className)}
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors(null);
        const formData = new FormData(e.currentTarget);
        const response = await fetch(action, {
          method: "POST",
          body: formData,
          redirect: "manual",
        });

        if (response.status === 0) {
          // redirected
          // when using `redirect: "manual"`, response status 0 is returned
          return router.refresh();
        }
        setErrors(await response.json());
        setLoading(false);
      }}>
      {errors ? (
        <div className="bg-red-100 p-3 my-4">
          <h3 className="font-bold text-md">Error!</h3>
          <p className="text-sm">{errors.error}</p>
        </div>
      ) : null}
      {children}
      <SubmitButton action={action} loading={loading} />
    </form>
  );
};

export default AuthForm;

const SubmitButton = ({ action, loading }: { action: Action; loading: boolean }) => {
  let buttonSuffix = "";
  switch (action) {
    case "/api/sign-in":
      buttonSuffix = "Connexion";
      break;
    case "/api/sign-out":
      buttonSuffix = "Déconnexion";
      break;
    case "/api/sign-up":
      buttonSuffix = "Enregistrer";
      break;
  }
  return (
    <Button type="submit" className={action === "/api/sign-out" ? "" : "w-full"} disabled={loading} variant={action === "/api/sign-out" ? "default" : "default"}>
      {buttonSuffix}
      {loading ? "..." : ""}
    </Button>
  );
};
