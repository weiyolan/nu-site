import { pgTable, pgEnum, varchar, integer, timestamp, unique, text, boolean, foreignKey, bigint, primaryKey } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const aal_level = pgEnum("aal_level", ['aal1', 'aal2', 'aal3'])
export const code_challenge_method = pgEnum("code_challenge_method", ['s256', 'plain'])
export const factor_status = pgEnum("factor_status", ['unverified', 'verified'])
export const factor_type = pgEnum("factor_type", ['totp', 'webauthn', 'phone'])
export const one_time_token_type = pgEnum("one_time_token_type", ['confirmation_token', 'reauthentication_token', 'recovery_token', 'email_change_token_new', 'email_change_token_current', 'phone_change_token'])
export const key_status = pgEnum("key_status", ['default', 'valid', 'invalid', 'expired'])
export const key_type = pgEnum("key_type", ['aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20'])
export const action = pgEnum("action", ['INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'ERROR'])
export const equality_op = pgEnum("equality_op", ['eq', 'neq', 'lt', 'lte', 'gt', 'gte', 'in'])


export const orders = pgTable("orders", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	user_id: varchar("user_id", { length: 256 }).notNull(),
	hosted_invoice_url: varchar("hosted_invoice_url", { length: 256 }).notNull(),
	number: varchar("number", { length: 256 }).notNull(),
	stripe_invoice_id: varchar("stripe_invoice_id", { length: 256 }).notNull(),
	stripe_payment_intent_id: varchar("stripe_payment_intent_id", { length: 256 }).notNull(),
	stripe_checkout_session_id: varchar("stripe_checkout_session_id", { length: 256 }).notNull(),
	stripe_customer_id: varchar("stripe_customer_id", { length: 256 }).notNull(),
	status: varchar("status", { length: 256 }).notNull(),
	amount_total: integer("amount_total").notNull(),
	amount_subtotal: integer("amount_subtotal").notNull(),
	amount_discount: integer("amount_discount").notNull(),
	amount_shipping: integer("amount_shipping").notNull(),
	amount_tax: integer("amount_tax").notNull(),
	invoice_pdf: varchar("invoice_pdf", { length: 256 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	customer_email: varchar("customer_email").notNull(),
	customer_name: varchar("customer_name").notNull(),
	customer_phone: varchar("customer_phone"),
	shipping_address_line_1: varchar("shipping_address_line_1", { length: 256 }).notNull(),
	shipping_address_city: varchar("shipping_address_city", { length: 256 }).notNull(),
	shipping_address_country: varchar("shipping_address_country", { length: 256 }).notNull(),
	shipping_address_postal_code: varchar("shipping_address_postal_code", { length: 256 }).notNull(),
	billing_address_line_1: varchar("billing_address_line_1", { length: 256 }).notNull(),
	billing_address_city: varchar("billing_address_city", { length: 256 }).notNull(),
	billing_address_country: varchar("billing_address_country", { length: 256 }).notNull(),
	billing_address_postal_code: varchar("billing_address_postal_code", { length: 256 }).notNull(),
	billing_name: varchar("billing_name", { length: 256 }).notNull(),
	billing_last_4: varchar("billing_last_4", { length: 256 }).notNull(),
	billing_type: varchar("billing_type", { length: 256 }).notNull(),
	shipping_name: varchar("shipping_name", { length: 256 }).notNull(),
});

export const pages = pgTable("pages", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	name: text("name").notNull(),
	description: text("description").notNull(),
	public: boolean("public").default(false).notNull(),
	slug: text("slug").notNull(),
	background_color: text("background_color").default('#688663').notNull(),
	user_id: varchar("user_id", { length: 256 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		pages_slug_unique: unique("pages_slug_unique").on(table.slug),
	}
});

export const user_key = pgTable("user_key", {
	id: varchar("id", { length: 255 }).primaryKey().notNull(),
	user_id: varchar("user_id", { length: 15 }).notNull().references(() => auth_user.id),
	hashed_password: varchar("hashed_password", { length: 255 }),
});

export const user_session = pgTable("user_session", {
	id: varchar("id", { length: 128 }).primaryKey().notNull(),
	user_id: varchar("user_id", { length: 15 }).notNull().references(() => auth_user.id),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	active_expires: bigint("active_expires", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	idle_expires: bigint("idle_expires", { mode: "number" }).notNull(),
});

export const page_links = pgTable("page_links", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	title: text("title").notNull(),
	url: text("url").notNull(),
	page_id: varchar("page_id", { length: 256 }).notNull().references(() => pages.id, { onDelete: "cascade" } ),
	user_id: varchar("user_id", { length: 256 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const auth_user = pgTable("auth_user", {
	id: varchar("id", { length: 15 }).primaryKey().notNull(),
	name: varchar("name", { length: 255 }),
	email: varchar("email", { length: 255 }),
	username: varchar("username", { length: 255 }),
});

export const subscriptions = pgTable("subscriptions", {
	user_id: varchar("user_id", { length: 255 }).notNull(),
	stripe_customer_id: varchar("stripe_customer_id", { length: 255 }).notNull(),
	stripe_subscription_id: varchar("stripe_subscription_id", { length: 255 }),
	stripe_price_id: varchar("stripe_price_id", { length: 255 }),
	stripe_current_period_end: timestamp("stripe_current_period_end", { mode: 'string' }),
},
(table) => {
	return {
		subscriptions_user_id_stripe_customer_id_pk: primaryKey({ columns: [table.user_id, table.stripe_customer_id], name: "subscriptions_user_id_stripe_customer_id_pk"}),
		subscriptions_user_id_unique: unique("subscriptions_user_id_unique").on(table.user_id),
		subscriptions_stripe_customer_id_unique: unique("subscriptions_stripe_customer_id_unique").on(table.stripe_customer_id),
		subscriptions_stripe_subscription_id_unique: unique("subscriptions_stripe_subscription_id_unique").on(table.stripe_subscription_id),
	}
});