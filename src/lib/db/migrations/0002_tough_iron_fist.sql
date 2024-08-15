CREATE TABLE IF NOT EXISTS "orders" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"hosted_invoice_url" varchar(256) NOT NULL,
	"number" varchar(256) NOT NULL,
	"stripe_invoice_id" varchar(256) NOT NULL,
	"stripe_payment_intent_id" varchar(256) NOT NULL,
	"stripe_checkout_session_id" varchar(256) NOT NULL,
	"stripe_customer_id" varchar(256) NOT NULL,
	"status" varchar(256) NOT NULL,
	"amount_total" integer NOT NULL,
	"amount_subtotal" integer NOT NULL,
	"amount_discount" integer NOT NULL,
	"amount_shipping" integer NOT NULL,
	"amount_tax" integer NOT NULL,
	"invoice_pdf" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
