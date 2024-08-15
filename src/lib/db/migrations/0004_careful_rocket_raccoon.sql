ALTER TABLE "orders" ADD COLUMN "shipping_address_line_1" varchar;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "shipping_address_city" varchar;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "shipping_address_country" varchar;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "shipping_address_postal_code" varchar;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "billing_address_line_1" varchar;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "billing_address_city" varchar;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "billing_address_country" varchar;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "billing_address_postal_code" varchar;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "billing_name" varchar;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "last_4" varchar;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "type" varchar;