import { sql } from "drizzle-orm";
import { varchar, integer, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getOrders } from "@/lib/api/orders/queries";

import { nanoid, timestamps } from "@/lib/utils";

export const orders = pgTable("orders", {
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  userId: varchar("user_id", { length: 256 }).notNull(),
  hostedInvoiceUrl: varchar("hosted_invoice_url", { length: 256 }).notNull(),
  number: varchar("number", { length: 256 }).notNull(),
  stripeInvoiceId: varchar("stripe_invoice_id", { length: 256 }).notNull(),
  stripePaymentIntentId: varchar("stripe_payment_intent_id", { length: 256 }).notNull(),
  stripeCheckoutSessionId: varchar("stripe_checkout_session_id", { length: 256 }).notNull(),
  stripeCustomerId: varchar("stripe_customer_id", { length: 256 }).notNull(),
  status: varchar("status", { length: 256 }).notNull(),
  amountTotal: integer("amount_total").notNull(),
  amountSubtotal: integer("amount_subtotal").notNull(),
  amountDiscount: integer("amount_discount").notNull(),
  amountShipping: integer("amount_shipping").notNull(),
  amountTax: integer("amount_tax").notNull(),
  customerEmail: varchar("customer_email"),
  customerName: varchar("customer_name"),
  customerPhone: varchar("customer_phone"),
  invoicePdf: varchar("invoice_pdf", { length: 256 }).notNull(),
  shippingAddressLine1: varchar("shipping_address_line_1", { length: 256 }).notNull(),
  shippingAddressCity: varchar("shipping_address_city", { length: 256 }).notNull(),
  shippingAddressCountry: varchar("shipping_address_country", { length: 256 }).notNull(),
  shippingAddressPostalCode: varchar("shipping_address_postal_code", { length: 256 }).notNull(),
  billingAddressLine1: varchar("billing_address_line_1", { length: 256 }),
  billingAddressCity: varchar("billing_address_city", { length: 256 }),
  billingAddressCountry: varchar("billing_address_country", { length: 256 }),
  billingAddressPostalCode: varchar("billing_address_postal_code", { length: 256 }),
  billingName: varchar("billing_name", { length: 256 }),
  billingLast4: varchar("billing_last_4", { length: 256 }),
  billingType: varchar("billing_type", { length: 256 }),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for orders - used to validate API requests
const baseSchema = createSelectSchema(orders).omit(timestamps);

export const insertOrderSchema = createInsertSchema(orders).omit(timestamps);
export const insertOrderParams = baseSchema
  .extend({
    amountTotal: z.coerce.number(),
    amountSubtotal: z.coerce.number(),
    amountDiscount: z.coerce.number(),
    amountShipping: z.coerce.number(),
    amountTax: z.coerce.number(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateOrderSchema = baseSchema;
export const updateOrderParams = baseSchema
  .extend({
    amountTotal: z.coerce.number(),
    amountSubtotal: z.coerce.number(),
    amountDiscount: z.coerce.number(),
    amountShipping: z.coerce.number(),
    amountTax: z.coerce.number(),
  })
  .omit({
    userId: true,
  });
export const orderIdSchema = baseSchema.pick({ id: true });

// Types for orders - used to type API request params and within Components
export type Order = typeof orders.$inferSelect;
export type NewOrder = z.infer<typeof insertOrderSchema>;
export type NewOrderParams = z.infer<typeof insertOrderParams>;
export type UpdateOrderParams = z.infer<typeof updateOrderParams>;
export type OrderId = z.infer<typeof orderIdSchema>["id"];

// this type infers the return from getOrders() - meaning it will include any joins
export type CompleteOrder = Awaited<ReturnType<typeof getOrders>>["orders"][number];
