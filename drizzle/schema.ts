import { pgTable, foreignKey, text, uuid, timestamp, json, unique, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const appUserPermission = pgEnum("app_user_permission", ['read', 'write', 'admin'])


export const appUsers = pgTable("app_users", {
	userId: text("user_id").notNull(),
	appId: uuid("app_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	permissions: appUserPermission(),
	freestyleIdentity: text("freestyle_identity").notNull(),
	freestyleAccessToken: text("freestyle_access_token").notNull(),
	freestyleAccessTokenId: text("freestyle_access_token_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.appId],
			foreignColumns: [apps.id],
			name: "app_users_app_id_apps_id_fk"
		}).onDelete("cascade"),
]);

export const messages = pgTable("messages", {
	id: text().primaryKey().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	appId: uuid("app_id").notNull(),
	message: json().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.appId],
			foreignColumns: [apps.id],
			name: "messages_app_id_apps_id_fk"
		}),
]);

export const apps = pgTable("apps", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text().default('Unnamed App').notNull(),
	description: text().default('No description').notNull(),
	gitRepo: text("git_repo").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	baseId: text("base_id").default('nextjs-dkjfgdf').notNull(),
	previewDomain: text("preview_domain"),
}, (table) => [
	unique("apps_preview_domain_unique").on(table.previewDomain),
]);

export const appDeployments = pgTable("app_deployments", {
	appId: uuid("app_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	deploymentId: text("deployment_id").notNull(),
	commit: text().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.appId],
			foreignColumns: [apps.id],
			name: "app_deployments_app_id_apps_id_fk"
		}).onDelete("cascade"),
]);
