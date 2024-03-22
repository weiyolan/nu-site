"use client";

import { cn } from "@/lib/utils";
import Typography from "./Typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

const formSchema = z.object({
  email: z.string().email(),

  // .min(2, {
  //   message: "Username must be at least 2 characters.",
  // }),
});

export interface NewsletterProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Newsletter({ children, className, ...props }: NewsletterProps) {
  return (
    <div className={cn("mr-auto w-96 space-y-2", className)} {...props}>
      <Typography variant={"h3"} className="text-3xl mb-4">
        Newsletter
      </Typography>

      <Typography variant={"p"} className="text-sm whitespace-pre-wrap">
        {`Abonnez-vous au newsletter\net recevez un bon de 10€`}
      </Typography>

      <NewsletterForm />

      <Typography variant={"p"} className="text-sm text-muted-foreground whitespace-pre-wrap">
        {`En continuant, vous acceptez nos conditions\ngénérales et notre politique de confidentialité.`}
      </Typography>
    </div>
  );
}

export function NewsletterForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-8 ">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Email</FormLabel> */}
              <FormControl>
                <Input placeholder="hello@nu-cosmetics.com" className="w-56" {...field} />
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{`Je m'abbonne!`}</Button>
      </form>
    </Form>
  );
}
