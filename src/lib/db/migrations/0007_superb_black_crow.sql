ALTER TABLE "orders" ALTER COLUMN "billing_address_line_1" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "billing_address_city" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "billing_address_country" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "billing_address_postal_code" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "billing_name" DROP NOT NULL;