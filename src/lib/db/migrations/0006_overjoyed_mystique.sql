ALTER TABLE "orders" ALTER COLUMN "shipping_address_line_1" SET DATA TYPE varchar(256);--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "shipping_address_line_1" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "shipping_address_city" SET DATA TYPE varchar(256);--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "shipping_address_city" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "shipping_address_country" SET DATA TYPE varchar(256);--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "shipping_address_country" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "shipping_address_postal_code" SET DATA TYPE varchar(256);--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "shipping_address_postal_code" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "billing_address_line_1" SET DATA TYPE varchar(256);--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "billing_address_line_1" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "billing_address_city" SET DATA TYPE varchar(256);--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "billing_address_city" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "billing_address_country" SET DATA TYPE varchar(256);--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "billing_address_country" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "billing_address_postal_code" SET DATA TYPE varchar(256);--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "billing_address_postal_code" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "billing_name" SET DATA TYPE varchar(256);--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "billing_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "billing_last_4" SET DATA TYPE varchar(256);--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "billing_last_4" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "billing_type" SET DATA TYPE varchar(256);--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "billing_type" SET NOT NULL;