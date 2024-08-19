ALTER TABLE "orders" ALTER COLUMN "customer_email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "customer_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "customer_phone" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "billing_address_line_1" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "billing_address_city" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "billing_address_country" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "billing_address_postal_code" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "billing_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "billing_last_4" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "billing_type" SET NOT NULL;