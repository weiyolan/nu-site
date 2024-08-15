import { relations } from "drizzle-orm/relations";
import { auth_user, user_key, user_session, pages, page_links } from "./schema";

export const user_keyRelations = relations(user_key, ({one}) => ({
	auth_user: one(auth_user, {
		fields: [user_key.user_id],
		references: [auth_user.id]
	}),
}));

export const auth_userRelations = relations(auth_user, ({many}) => ({
	user_keys: many(user_key),
	user_sessions: many(user_session),
}));

export const user_sessionRelations = relations(user_session, ({one}) => ({
	auth_user: one(auth_user, {
		fields: [user_session.user_id],
		references: [auth_user.id]
	}),
}));

export const page_linksRelations = relations(page_links, ({one}) => ({
	page: one(pages, {
		fields: [page_links.page_id],
		references: [pages.id]
	}),
}));

export const pagesRelations = relations(pages, ({many}) => ({
	page_links: many(page_links),
}));